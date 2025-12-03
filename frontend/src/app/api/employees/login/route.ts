import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { createSession } from '@/lib/auth';

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

    const employee = await prisma.employee.findUnique({
      where: { username, status: 'ACTIVE' },
    });

    if (!employee) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, employee.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if password expired
    if (employee.passwordExpiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Password expired. Please contact administrator.' },
        { status: 403 }
      );
    }

    // Update last login
    await prisma.employee.update({
      where: { id: employee.id },
      data: { lastLogin: new Date() },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'LOGIN',
        entity: 'EMPLOYEE',
        entityId: employee.id,
        performedBy: employee.username,
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    });

    await createSession({
      userId: employee.id,
      username: employee.username,
      type: 'employee',
      role: employee.role,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: employee.id,
        username: employee.username,
        email: employee.email,
        role: employee.role,
        nome: employee.nome,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
