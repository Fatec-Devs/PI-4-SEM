import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { updateSecret, generateStrongPassword, getSecretName } from '@/lib/aws-secrets';
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
    });

    const results = {
      rotated: [] as { id: string; username: string; newPassword: string }[],
      failed: [] as { id: string; error: string }[],
    };

    for (const user of users) {
      try {
        const newPassword = generateStrongPassword();
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        const secretName = getSecretName(user.id);

        // Update secret in AWS (skip if AWS not configured)
        try {
          await updateSecret(secretName, newPassword);
        } catch (awsError) {
          console.error(`Error updating AWS secret for ${user.id}:`, awsError);
          // Continue with password rotation even if AWS fails
        }

        // Update user with new password hash and plain text
        await prisma.applicationUser.update({
          where: { id: user.id },
          data: {
            passwordHash: newPasswordHash,
            passwordPlainText: newPassword, // Save plain text for retrieval
            lastRotation: new Date(),
            passwordExpiresAt: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
          },
        });

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
        console.error(`Error rotating password for user ${user.id}:`, error);
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
    console.error('Error bulk rotating passwords:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
