import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // This will refresh session if expired - required for Server Components
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected routes that require authentication
  const protectedPaths = [
    '/account',
    '/api/create-dev-user',
    '/api/create-test-user',
    '/api/toggle-email-confirm',
  ];

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // Block access to debug endpoints in production
  const debugEndpoints = [
    '/api/create-dev-user',
    '/api/create-test-user',
    '/api/toggle-email-confirm',
  ];

  const isDebugEndpoint = debugEndpoints.some(endpoint =>
    request.nextUrl.pathname === endpoint
  );

  // Block debug endpoints in production
  if (isDebugEndpoint && process.env.NODE_ENV === 'production') {
    return new NextResponse('Not Found', { status: 404 });
  }

  // Redirect to sign-in if accessing protected route without user
  if (isProtectedPath && !user) {
    const redirectUrl = new URL('/sign-in', request.url);
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Add security headers
  const headers = new Headers(response.headers);
  
  // Prevent clickjacking
  headers.set('X-Frame-Options', 'DENY');
  
  // Enable XSS protection
  headers.set('X-XSS-Protection', '1; mode=block');
  
  // Prevent MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff');
  
  // Referrer policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Basic Content Security Policy
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.supabase.co; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: blob: *.supabase.co; " +
    "font-src 'self'; " +
    "connect-src 'self' *.supabase.co wss://*.supabase.co; " +
    "frame-ancestors 'none';"
  );

  // HSTS (HTTP Strict Transport Security)
  if (process.env.NODE_ENV === 'production') {
    headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    );
  }

  return NextResponse.next({
    headers,
    request: {
      headers: request.headers,
    },
  });
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