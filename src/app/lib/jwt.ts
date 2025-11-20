import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';

export type JwtPayload = {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
};

// export function parseAuthCookie(cookieHeader: string | undefined): string | null {
//   if (!cookieHeader) return null;
//   const cookies = cookieStore.parse(cookieHeader);
//   return cookies.authToken || null;
// }

export async function verifyJwt(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    return await jwtVerify(token, secret);
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}