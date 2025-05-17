import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const { isWishlisted } = await req.json();


  // Энэ хэсэгт та өөрийн өгөгдлийн санг шинэчилнэ
  // Жишээ: mock дата ашиглаж байгаа бол массив дээр шууд засвар хийнэ

  // Жишээ хариу буцаах:
  return NextResponse.json({ message: `Destination ${id} updated`, isWishlisted });
}
