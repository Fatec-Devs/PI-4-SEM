import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { deleteSecret, getSecretName } from '@/lib/aws-secrets';

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
      deleted: [] as string[],
      failed: [] as { id: string; error: string }[],
    };

    for (const user of users) {
      try {
        // Delete secret from AWS (ignore errors)
        const secretName = getSecretName(user.id);
        try {
          await deleteSecret(secretName);
        } catch (awsError) {
          console.error(`Error deleting AWS secret for ${user.id}:`, awsError);
          // Continue with user deletion even if AWS deletion fails
        }

        // Delete user
        await prisma.applicationUser.delete({
          where: { id: user.id },
        });

        results.deleted.push(user.id);

        // Create audit log
        await prisma.auditLog.create({
          data: {
            action: 'DELETE',
            entity: 'APP_USER',
            entityId: user.id,
            performedBy: session.username,
            details: { username: user.username, bulkOperation: true },
            ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
            userAgent: request.headers.get('user-agent') || 'unknown',
          },
        });
      } catch (error: any) {
        console.error(`Error deleting user ${user.id}:`, error);
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
    console.error('Error bulk deleting users:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
