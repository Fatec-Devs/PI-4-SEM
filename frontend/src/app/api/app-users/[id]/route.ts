import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { updateSecret, generateStrongPassword, getSecretName } from '@/lib/aws-secrets';

// PUT - Update application user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const { username, description, status, role } = body;

    const user = await prisma.applicationUser.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // If username is being changed, check if new username already exists
    if (username && username !== user.username) {
      const usernameExists = await prisma.applicationUser.findUnique({
        where: { username },
      });

      if (usernameExists) {
        return NextResponse.json(
          { error: 'Username already exists' },
          { status: 409 }
        );
      }
    }

    const updated = await prisma.applicationUser.update({
      where: { id },
      data: {
        ...(username && { username }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
        ...(role && { role }),
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'UPDATE',
        entity: 'APP_USER',
        entityId: id,
        performedBy: session.username,
        details: { username, description, status, role },
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete application user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdmin();
    const { id } = await params;

    const user = await prisma.applicationUser.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete secret from AWS
    const secretName = getSecretName(id);
    try {
      const { deleteSecret } = await import('@/lib/aws-secrets');
      await deleteSecret(secretName);
    } catch (awsError) {
      console.error('Error deleting AWS secret:', awsError);
      // Continue with user deletion even if AWS deletion fails
    }

    // Delete user
    await prisma.applicationUser.delete({
      where: { id },
    });

    await prisma.auditLog.create({
      data: {
        action: 'DELETE',
        entity: 'APP_USER',
        entityId: id,
        performedBy: session.username,
        details: { username: user.username },
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
