import { NextResponse } from 'next/server';

import { provinces } from '@/lib/mock-data';
// GET method
export async function GET() {
  return NextResponse.json(provinces);
}


// app/api/provinces/route.ts
// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/lib/mongoose';
// import { ProvinceModel } from '@/lib/model/Province';

// export async function GET() {
//   try {
//     await connectToDB();

//     const provinces = await ProvinceModel.find().lean();
//     return NextResponse.json(provinces);
//   } catch (error) {
//     console.error('Failed to fetch provinces:', error);
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
// }
