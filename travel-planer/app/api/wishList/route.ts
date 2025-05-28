
// app/api/wishlists/route.ts
// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/lib/mongoose';
// import { WishListModel } from '@/lib/model/WishList';

// export async function GET() {
//   try {
//     await connectToDB();
//     // const wishLists = await WishListModel.find(userId ? { user: userId } : {}) 
//     const wishLists = await WishListModel.find()
//       .populate({
//         path: 'destinations',
//         select: 'title images', // зөвхөн title, images-г авна
//       })
//       .populate('user') // Хэрэгтэй бол user info-г авна
//       .lean();

//     return NextResponse.json(wishLists);
//   } catch (error) {
//     console.error('Failed to fetch wishlists:', error);
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { title } from 'process';


let dest1 = {id: 1, title: 'Altai', images: ['/images/image1.jpg',]},
    dest2 = {id: 2, title: 'Bulgan', images: ['/images/image2.jpg',]},
    dest3 = {id: 3, title: 'Orhon', images: ['/images/image3.jpg',]},
    dest4 = {id: 4, title: 'Govi', images: ['/images/image4.jpg',]}

let wishLists = [
    { 
        id: 1, 
        name: "Wishlist 3 item",
        destinations: [dest1, dest2, dest3],
        user: 1, 
    },
    { 
        id: 2, 
        name: "Wishlist 2 item",
        destinations: [dest3, dest4],
        user: 1, 
    },
    { 
        id: 3, 
        name: "Wishlist 2 item",
        destinations: [dest1, dest4],
        user: 1, 
    },
]

export async function GET(){
    return NextResponse.json(wishLists);
}
