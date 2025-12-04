import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { createSecret, generateStrongPassword, getSecretName, isAwsEnabled } from '@/lib/aws-secrets';
import { notifyUserCreated, verifyEmailIdentity } from '@/lib/aws-ses';
import bcrypt from 'bcrypt';

// GET - List application users
export async function GET(request: NextRequest) {
  try {
    const session = await requireAdmin();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { username: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.applicationUser.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          username: true,
          description: true,
          role: true,
          status: true,
          lastRotation: true,
          passwordExpiresAt: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.applicationUser.count({ where }),
    ]);

    return NextResponse.json({
      users,
      userRole: session.role,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Erro ao listar usuários:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

// POST - Create new application user
export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin();
    const body = await request.json();
    const { username, description, ownerEmail, role } = body;

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    if (!ownerEmail || !ownerEmail.includes('@')) {
      return NextResponse.json(
        { error: 'Owner email is required and must be valid' },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existing = await prisma.applicationUser.findUnique({
      where: { username },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 409 }
      );
    }

    // Generate strong password
    const password = generateStrongPassword();
    const passwordHash = await bcrypt.hash(password, 10);
    const expiresAt = new Date(Date.now() + 50 * 24 * 60 * 60 * 1000); // 50 days

    // Create user first to get ID
    const user = await prisma.applicationUser.create({
      data: {
        username,
        description,
        ownerEmail,
        role: role || 'ROLE_1',
        passwordHash, // Always store bcrypt hash as backup
        passwordPlainText: isAwsEnabled() ? null : password, // Only store plain text if not using AWS
        awsSecretArn: 'pending', // Will be updated after AWS creation
        lastRotation: new Date(),
        passwordExpiresAt: expiresAt,
        status: 'ACTIVE',
      },
    });

    // Store password in AWS Secrets Manager if enabled
    if (isAwsEnabled()) {
      try {
        const secretName = getSecretName(user.username);
        const arn = await createSecret(secretName, password);
        
        // Update user with ARN
        await prisma.applicationUser.update({
          where: { id: user.id },
          data: { awsSecretArn: arn },
        });

        console.log(`✅ AWS Secret criado para o usuário ${username}: ${secretName}`);
      } catch (awsError) {
        console.error('⚠️ Falha ao criar AWS secret, usando armazenamento local:', awsError);
        // Fallback: store password locally if AWS fails
        await prisma.applicationUser.update({
          where: { id: user.id },
          data: { 
            awsSecretArn: 'local-fallback',
            passwordPlainText: password,
          },
        });
      }
    } else {
      // Not using AWS - mark as local storage
      await prisma.applicationUser.update({
        where: { id: user.id },
        data: { awsSecretArn: 'local-storage' },
      });
      console.log(`📝 Senha armazenada localmente para o usuário ${username} (AWS desabilitado)`);
    }

    // Add owner email to SES verified identities (Sandbox mode)
    // AWS will send verification email automatically
    try {
      await verifyEmailIdentity(ownerEmail);
    } catch (emailError) {
      console.error('Erro ao solicitar verificação do email no SES:', emailError);
      // Don't fail user creation if email verification request fails
    }

    // Send email notification
    try {
      await notifyUserCreated(ownerEmail, username, expiresAt);
    } catch (emailError) {
      console.error('Erro ao enviar notificação de email:', emailError);
      // Don't fail user creation if email fails
    }

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'CREATE',
        entity: 'APP_USER',
        entityId: user.id,
        performedBy: session.username,
        details: { username, description, ownerEmail },
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        password, // Return password only on creation
      },
    });
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Forbidden: Admin access required' ? 403 : 500 }
    );
  }
}
