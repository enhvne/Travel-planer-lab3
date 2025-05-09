import { NextResponse } from 'next/server';

let topVisions = [
    { id: 1, name: "Altai Tavan Bogd", image: "/images/visions/tavanBogd.jpg" },
    { id: 2, name: "Hovd River", image: "/images/visions/hovdgol.jpg" },
    { id: 3, name: "Tsambagarav", image: "/images/visions/tsambagarav.jpg" },
    { id: 4, name: "Horidol saridag", image: "/images/visions/horidol.jpg" },
    { id: 5, name: "Tsagaan lake", image: "/images/visions/tsagaan.jpg" },
    { id: 6, name: "Khuvsgul lake", image: "/images/visions/khuvsgul.jpg" },
    { id: 7, name: "Uvs lake", image: "/images/visions/uvs.jpg" },
    { id: 8, name: "Khetsuu rock", image: "/images/visions/khetsuu.jpg" }
];

export async function GET(){
    return NextResponse.json(topVisions);
}