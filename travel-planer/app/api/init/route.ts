// app/api/init/route.ts
import { NextResponse } from 'next/server';
import connectToDB from '@/lib/mongoose';

export async function GET() {
  const db = await connectToDB();

  // "comments" гэдэг collection үүсгэх ба анхны document нэмэх
  const comment = {
    rating: 5,
    date: new Date(),
    desc: 'Гайхалтай аялал байлаа!',
    authorId: 1
  };

  await db.collection('comments').insertOne(comment);

  return NextResponse.json({ message: 'Initial data inserted!' });
}
