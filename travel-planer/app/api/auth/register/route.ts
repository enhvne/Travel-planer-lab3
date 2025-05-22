import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Mock: already registered user
  if (email === 'john.doe@example.com') {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  // Mock: register success
  return NextResponse.json({ token: 'mock-token-registered' });
} 