import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { verifyJwt } from './app/lib/jwt';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  // 1. Get the JWT from the Cookie
  const token = request.cookies.get('session')?.value;

  console.log(`middleware token:${token}`);

  // 2. Define protected routes (example: all pages except the login page)
  const isProtectedRoute = !request.nextUrl.pathname.startsWith('/login');

  if (isProtectedRoute) {
    // 3. No token provided: Redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 4. Verify the JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const payload = await jwtVerify(token, secret);

    if (!payload) {
      // The token is invalid or expired, clear the invalid Cookie (optional)
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.set('session', '', { expires: new Date(0) });
      return response;
    }

    // 5. Verification passed: Attach user information to the request context (optional, needs to be used with route parameters)
    // Or obtain it through the getToken function in subsequent processing
  } else {
    // 6. Login page: If authenticated, redirect to the dashboard
    if (!token) {
      return;
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const payload = await jwtVerify(token, secret);

    if (token && payload) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // 7. Allow the request to continue
  return NextResponse.next();
}

// 8. Configure the scope of the middleware (match all pages except API routes and static resources)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};