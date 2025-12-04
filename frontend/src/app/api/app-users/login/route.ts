import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';
import { notifyPasswordExpired } from '@/lib/aws-ses';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const appUser = await prisma.applicationUser.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        description: true,
        role: true,
        status: true,
        passwordHash: true,
        passwordPlainText: true,
        passwordExpiresAt: true,
        ownerEmail: true,
      }
    });

    if (!appUser) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if user is inactive
    if (appUser.status === 'INACTIVE') {
      return NextResponse.json(
        { error: 'User account is inactive. Please contact administrator.' },
        { status: 403 }
      );
    }

    // Check if password expired and update status to INACTIVE
    if (appUser.passwordExpiresAt < new Date()) {
      await prisma.applicationUser.update({
        where: { id: appUser.id },
        data: { status: 'INACTIVE' },
      });

      await prisma.auditLog.create({
        data: {
          action: 'UPDATE',
          entity: 'APP_USER',
          entityId: appUser.id,
          performedBy: 'SYSTEM',
          details: { reason: 'Password expired - status changed to INACTIVE' },
          ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
          userAgent: request.headers.get('user-agent') || 'unknown',
        },
      });

      // Send expiration notification email
      try {
        await notifyPasswordExpired(
          appUser.ownerEmail,
          appUser.username,
          appUser.passwordExpiresAt
        );
        console.log(`✉️ Email de expiração enviado para ${appUser.ownerEmail}`);
      } catch (emailError) {
        console.error(`⚠️ Falha ao enviar email de expiração para ${appUser.ownerEmail}:`, emailError);
        // Continue operation even if email fails
      }

      return NextResponse.json(
        { error: 'Password expired. Your account has been deactivated. Please contact administrator.' },
        { status: 403 }
      );
    }

    // Validate password - try plain text first, then bcrypt hash
    let isValidPassword = false;
    
    if (appUser.passwordPlainText) {
      // Direct comparison with plain text password
      isValidPassword = appUser.passwordPlainText === password;
    } else if (appUser.passwordHash) {
      // Fallback to bcrypt comparison
      isValidPassword = await bcrypt.compare(password, appUser.passwordHash);
    }

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'LOGIN',
        entity: 'APP_USER',
        entityId: appUser.id,
        performedBy: appUser.username,
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    });

    await createSession({
      userId: appUser.id,
      username: appUser.username,
      type: 'application',
      role: appUser.role,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: appUser.id,
        username: appUser.username,
        description: appUser.description,
        role: appUser.role,
      },
    });
  } catch (error) {
    console.error('Erro de login do usuário de aplicação:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
