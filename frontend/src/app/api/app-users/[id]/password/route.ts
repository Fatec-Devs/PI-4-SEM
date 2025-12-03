import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

// GET - Retrieve application user password from database
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await params;

    // Find user with password in plain text
    const user = await prisma.applicationUser.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        passwordPlainText: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return password from database (plain text)
    const password = user.passwordPlainText || '[Senha não disponível - rotacione para gerar nova]';

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'VIEW_PASSWORD',
        entity: 'APP_USER',
        entityId: user.id,
        performedBy: session.username,
        details: { username: user.username, viewedBy: session.username },
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    });

    return NextResponse.json({
      success: true,
      password,
      username: user.username,
    });
  } catch (error: any) {
    console.error('Error retrieving password:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}
