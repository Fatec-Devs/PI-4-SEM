import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireAdmin } from '@/lib/auth';
import { createSecret, generateStrongPassword, getSecretName } from '@/lib/aws-secrets';
import bcrypt from 'bcrypt';

// GET - List application users
export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();

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
    console.error('Error listing users:', error);
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
    const { username, description, role } = body;

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
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

    // Create user first to get ID
    const user = await prisma.applicationUser.create({
      data: {
        username,
        description,
        role: role || 'ROLE_1', // Default to ROLE_1 if not provided
        passwordHash, // Store bcrypt hash in database
        passwordPlainText: password, // Store plain text for retrieval
        awsSecretArn: 'local-storage', // Not using AWS
        lastRotation: new Date(),
        passwordExpiresAt: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000), // 50 days
        status: 'ACTIVE',
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'CREATE',
        entity: 'APP_USER',
        entityId: user.id,
        performedBy: session.username,
        details: { username, description },
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
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Forbidden: Admin access required' ? 403 : 500 }
    );
  }
}
