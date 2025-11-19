import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

export async function getSession() {
  const cookie = await cookies();
  const session = cookie.get('session')?.value;

  if (!session) return null;

  const result = await jwt.verify(session, `${process.env.JWT_SECRET}`);
  return result;
}