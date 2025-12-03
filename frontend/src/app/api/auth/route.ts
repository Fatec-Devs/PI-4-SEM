import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { decrypt } from '../../../lib/crypto';
import { signToken, verifyToken } from '../../../lib/auth';

function makeSetCookieHeader(token: string, maxAge = 3600) {
	const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
	return `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

export async function POST(req: Request) {
	// Login: expect { username, senha }
	try {
		const data = await req.json();
		const { username, senha } = data ?? {};
		if (!username || !senha) return NextResponse.json({ message: 'username and senha required' }, { status: 400 });

		// Try funcionario first
		const funcionario = await prisma.funcionario.findUnique({ where: { username } });
		if (funcionario) {
			try {
				const senhaObj = JSON.parse(funcionario.senha);
				const senhaDb = decrypt(senhaObj);
				if (senhaDb === senha) {
					const token = signToken({ sub: funcionario.matricula, type: 'funcionario', username });
					return NextResponse.json({ message: 'ok' }, { status: 200, headers: { 'Set-Cookie': makeSetCookieHeader(token) } });
				}
			} catch {
				// fallthrough
			}
		}

		// Try user_app
		const userApp = await prisma.user_app.findFirst({ where: { username } });
		if (userApp) {
			// user_app.senha may be plain or encrypted depending on your app; try direct compare then encrypted
			if (userApp.senha === senha) {
				const token = signToken({ sub: userApp.id_user_app, type: 'user_app', username });
				return NextResponse.json({ message: 'ok' }, { status: 200, headers: { 'Set-Cookie': makeSetCookieHeader(token) } });
			}
			try {
				const parsed = JSON.parse(userApp.senha);
				const senhaDb = decrypt(parsed);
				if (senhaDb === senha) {
					const token = signToken({ sub: userApp.id_user_app, type: 'user_app', username });
					return NextResponse.json({ message: 'ok' }, { status: 200, headers: { 'Set-Cookie': makeSetCookieHeader(token) } });
				}
			} catch {
				// ignore
			}
		}

		return NextResponse.json({ message: 'invalid credentials' }, { status: 401 });
	} catch (err) {
		return NextResponse.json({ error: 'Erro no login' }, { status: 500 });
	}
}

export async function GET(req: NextRequest) {
	// Validate token cookie and return payload
	try {
		const token = req.cookies.get('token')?.value;
		if (!token) return NextResponse.json({ valid: false }, { status: 401 });

		const payload = verifyToken(token);
		if (!payload) return NextResponse.json({ valid: false }, { status: 401 });

		return NextResponse.json({ valid: true, payload }, { status: 200 });
	} catch {
		return NextResponse.json({ valid: false }, { status: 500 });
	}
}

export async function DELETE() {
	// Logout: clear cookie
	const expired = 'token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0';
	return NextResponse.json({ message: 'logged out' }, { status: 200, headers: { 'Set-Cookie': expired } });
}
