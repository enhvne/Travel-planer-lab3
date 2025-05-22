// app/api/me/route.ts
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { getUserById } from '@/lib/userService'; // өгөгдлийн сангаас хэрэглэгч татах

export async function GET() {
  const token = cookies().get('token')?.value;
  if (!token) return NextResponse.json({ user: null });

  try {
    const payload: any = verify(token, process.env.JWT_SECRET!);
    const user = getUserById(payload.id); // DB-с fetch хийж байна
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
