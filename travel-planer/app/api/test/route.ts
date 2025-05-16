import connectToDB from "@/lib/mongoose";

export async function GET() {
  const db = await connectToDB();
  const users = await db.collection("users").find().toArray();
  return new Response(JSON.stringify(users), {
    headers: { "Content-Type": "application/json" },
  });
}
