import { NextResponse } from 'next/server';

// Түр хэрэглэгчийн мэдээлэл
let user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  image: '/default-avatar.png',
  comments: [
    { desc: 'Nice trip!', date: '2024-05-01', author: 'john.doe@example.com' },
    { desc: 'Other user comment', date: '2024-05-02', author: 'someone@example.com' }
  ]
};

export async function GET(req: Request) {
  // Токен шалгах (mock)
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(user);
}

export async function POST(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    user = { ...user, ...body };
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}