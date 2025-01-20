import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If accessing root path
    if (req.nextUrl.pathname === '/') {
      if (session) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // If accessing auth pages while logged in
    if (session && req.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // If accessing protected pages while logged out
    if (!session && !req.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return res;
  } catch (error) {
    // If there's an error, redirect to login
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 