import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.set('session', '', { expires: new Date(0) });
  return response;
}