import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login/employee', '/login/application'];
  
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Protected routes require valid session
  if (pathname.startsWith('/dashboard')) {
    if (!sessionCookie || !sessionCookie.value) {
      // No session cookie - redirect to login
      if (pathname.startsWith('/dashboard/employee')) {
        return NextResponse.redirect(new URL('/login/employee', request.url));
      } else if (pathname.startsWith('/dashboard/application')) {
        return NextResponse.redirect(new URL('/login/application', request.url));
      }
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Basic validation: check if session cookie has expected structure (iv:encrypted)
    const parts = sessionCookie.value.split(':');
    if (parts.length !== 2 || parts[0].length !== 32 || parts[1].length === 0) {
      // Invalid session format - clear cookie and redirect to login
      const response = pathname.startsWith('/dashboard/employee')
        ? NextResponse.redirect(new URL('/login/employee', request.url))
        : pathname.startsWith('/dashboard/application')
        ? NextResponse.redirect(new URL('/login/application', request.url))
        : NextResponse.redirect(new URL('/', request.url));
      
      response.cookies.delete('session');
      return response;
    }

    // Note: Full session validation (decryption) happens in API routes
    // Middleware only does basic format validation for performance
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
