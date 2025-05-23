import { connectToDB } from "@/lib/mongoose";

export async function POST(req: Request) {
  const db = await connectToDB();
  const comments = db.collection('comments'); // анх удаа ашиглагдаж байгаа бол автоматаар үүснэ

  const body = await req.json();
  const result = await comments.insertOne(body);

  return new Response(JSON.stringify(result), { status: 201 });
}
