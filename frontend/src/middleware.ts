import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware protects routes and ensures a `token` cookie exists.
// Deep validation of the token happens in the API (`/api/auth`) on the server.

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow next internals, api playground, static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname === '/favicon.ico' ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Only protect specific app sections
  const protectedPrefixes = ['/admin', '/UserAPP'];
  const shouldProtect = protectedPrefixes.some((p) => pathname.startsWith(p));
  if (!shouldProtect) return NextResponse.next();

  const token = req.cookies.get('token')?.value;
  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If token exists, allow the request to proceed. Full verification
  // will be performed server-side in API routes (edge runtime has limits).
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/UserAPP/:path*']
};
