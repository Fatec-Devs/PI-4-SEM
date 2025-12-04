import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { getSecret, getSecretName, isAwsEnabled } from '@/lib/aws-secrets';

// GET - Retrieve application user password
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await params;

    // Find user
    const user = await prisma.applicationUser.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        passwordPlainText: true,
        awsSecretArn: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    let password: string | null = null;
    let source = 'local';

    // Try to get password from AWS Secrets Manager if enabled
    if (isAwsEnabled() && user.awsSecretArn && user.awsSecretArn !== 'local-storage' && user.awsSecretArn !== 'local-fallback') {
      try {
        const secretName = getSecretName(user.username);
        password = await getSecret(secretName);
        source = 'aws';
        console.log(`✅ Senha recuperada do AWS para o usuário ${user.username}`);
      } catch (awsError) {
        console.error('⚠️ Falha ao buscar AWS secret, usando fallback local:', awsError);
      }
    }

    // Fallback to local storage if AWS not available or failed
    if (!password) {
      password = user.passwordPlainText;
      source = 'local';
    }

    if (!password) {
      return NextResponse.json(
        { error: 'Senha não disponível - execute rotação para gerar nova senha' },
        { status: 404 }
      );
    }

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'VIEW_PASSWORD',
        entity: 'APP_USER',
        entityId: user.id,
        performedBy: session.username,
        details: { 
          username: user.username, 
          viewedBy: session.username,
          source: source.toUpperCase(),
        },
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    });

    return NextResponse.json({
      success: true,
      password,
      username: user.username,
      source, // Informar de onde veio a senha (debug)
    });
  } catch (error: any) {
    console.error('Erro ao recuperar senha:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}
