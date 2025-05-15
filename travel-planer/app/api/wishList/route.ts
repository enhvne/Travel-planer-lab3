import {NextResponse} from 'next/server';

let wishLists = [
    { id: 1, name: "Wishlist 1" },
    { id: 2, name: "Wishlist 2" },
    { id: 3, name: "Wishlist 3" },
]

export async function GET(){
    return NextResponse.json(wishLists);
}