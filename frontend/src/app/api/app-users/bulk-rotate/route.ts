import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { updateSecret, generateStrongPassword, getSecretName, isAwsEnabled } from '@/lib/aws-secrets';
import { notifyPasswordRotated } from '@/lib/aws-ses';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin();
    const body = await request.json();
    const { userIds } = body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: 'User IDs array is required' },
        { status: 400 }
      );
    }

    const users = await prisma.applicationUser.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        username: true,
        ownerEmail: true,
      }
    });

    const results = {
      rotated: [] as { id: string; username: string; newPassword: string }[],
      failed: [] as { id: string; error: string }[],
    };

    for (const user of users) {
      try {
        const newPassword = generateStrongPassword();
        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        // Update secret in AWS if enabled
        if (isAwsEnabled()) {
          try {
            const secretName = getSecretName(user.username);
            await updateSecret(secretName, newPassword);
            console.log(`✅ AWS Secret atualizado para o usuário ${user.username}`);
          } catch (awsError) {
            console.error(`⚠️ Falha ao atualizar AWS secret para ${user.username}:`, awsError);
            // Continue with local password rotation even if AWS fails
          }
        }

        // Update user in database
        const passwordExpiresAt = new Date(Date.now() + 50 * 24 * 60 * 60 * 1000);
        await prisma.applicationUser.update({
          where: { id: user.id },
          data: {
            passwordHash: newPasswordHash,
            passwordPlainText: isAwsEnabled() ? null : newPassword, // Only store locally if AWS disabled
            lastRotation: new Date(),
            passwordExpiresAt,
          },
        });

        // Send rotation notification email
        try {
          await notifyPasswordRotated(
            user.ownerEmail,
            user.username,
            passwordExpiresAt,
            session.username
          );
          console.log(`✉️ Email de rotação enviado para ${user.ownerEmail}`);
        } catch (emailError) {
          console.error(`⚠️ Falha ao enviar email de rotação para ${user.ownerEmail}:`, emailError);
          // Continue operation even if email fails
        }

        results.rotated.push({
          id: user.id,
          username: user.username,
          newPassword,
        });

        // Create audit log
        await prisma.auditLog.create({
          data: {
            action: 'PASSWORD_CHANGE',
            entity: 'APP_USER',
            entityId: user.id,
            performedBy: session.username,
            details: { username: user.username, bulkOperation: true },
            ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
            userAgent: request.headers.get('user-agent') || 'unknown',
          },
        });
      } catch (error: any) {
        console.error(`Erro ao rotacionar senha para o usuário ${user.id}:`, error);
        results.failed.push({
          id: user.id,
          error: error.message || 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error: any) {
    console.error('Erro ao rotacionar senhas em lote:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
