import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === 'john.doe@example.com' && password === 'password123') {
    return NextResponse.json({ token: 'mock-token-123' });
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
} 