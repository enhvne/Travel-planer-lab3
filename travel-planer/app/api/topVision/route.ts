import { NextResponse } from 'next/server';
import { destinations } from '@/lib/mock-data';


export async function GET(){
    // rating-ээр буурахаар эрэмбэлнэ
    const sortedDestinations = destinations
        .slice() // original массивыг эвдэлдэггүй copy хийх
        .sort((a, b) => b.rating - a.rating);

    // эхний 8-ыг авна
    const top8 = sortedDestinations.slice(0, 8);

    return NextResponse.json(top8);
}

// app/api/destinations/top/route.ts
// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/lib/mongoose';
// import { DestinationModel } from '@/lib/model/Destination';

// export async function GET() {
//   try {
//     await connectToDB();

//     const top8 = await DestinationModel.find()
//       .sort({ rating: -1 })           // rating-ээр буурахаар эрэмбэлэх
//       .limit(8)                        // эхний 8-ыг авах
//       .populate("category")
//       .populate("province")
//       .populate("comments")
//       .populate("hotels")
//       .lean();

//     return NextResponse.json(top8);
//   } catch (error) {
//     console.error('Failed to fetch top destinations:', error);
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
// }
