import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('session')?.value;

  const isProtectedRoute = !request.nextUrl.pathname.startsWith('/login');

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const payload = await jwtVerify(token, secret);

    if (!payload) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.set('session', '', { expires: new Date(0) });
      return response;
    }
  } else {
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