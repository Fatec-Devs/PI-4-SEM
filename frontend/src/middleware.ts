import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login/employee', '/login/application'];
  
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Protected routes require session
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      // Redirect to appropriate login page
      if (pathname.startsWith('/dashboard/employee')) {
        return NextResponse.redirect(new URL('/login/employee', request.url));
      } else if (pathname.startsWith('/dashboard/application')) {
        return NextResponse.redirect(new URL('/login/application', request.url));
      }
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
