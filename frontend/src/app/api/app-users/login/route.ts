import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';
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
      where: { username, status: 'ACTIVE' },
      select: {
        id: true,
        username: true,
        description: true,
        role: true,
        passwordHash: true,
        passwordPlainText: true,
        passwordExpiresAt: true,
      }
    });

    if (!appUser) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if password expired
    if (appUser.passwordExpiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Password expired. Please contact administrator.' },
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
    console.error('App user login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
