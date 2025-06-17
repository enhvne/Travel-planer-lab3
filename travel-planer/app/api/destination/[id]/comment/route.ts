import { NextResponse } from 'next/server';

// Mock comments storage
let comments: { [key: string]: any[] } = {};

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { rating, desc } = body;
    const destinationId = params.id;

    // Create new comment
    const newComment = {
      id: Date.now(),
      rating,
      desc,
      date: new Date().toISOString(),
      author: 'John Doe', // In a real app, get this from the user data
    };

    // Add to comments storage
    if (!comments[destinationId]) {
      comments[destinationId] = [];
    }
    comments[destinationId].push(newComment);

    return NextResponse.json(newComment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
} 