import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, signToken } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ message: 'no token' }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ message: 'invalid token' }, { status: 401 });

    // Remove exp if present and issue new token with fresh expiry
    // payload is a plain object; copy excluding exp
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exp, ...rest } = payload as Record<string, unknown>;

    const newToken = signToken(rest, 3600);

    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    const header = `token=${newToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600${secure}`;

    return NextResponse.json({ message: 'token refreshed' }, { status: 200, headers: { 'Set-Cookie': header } });
  } catch {
    return NextResponse.json({ error: 'Erro ao renovar token' }, { status: 500 });
  }
}
