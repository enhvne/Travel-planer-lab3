import { NextResponse } from 'next/server';

let topVisions = [
    { id: 1, title: "Алтай Таван Богд", images: ["/images/visions/tavanBogd.jpg"] },
    { id: 2, title: "Ховд гол", images: ["/images/visions/hovdgol.jpg"] },
    { id: 3, title: "Цаст Цамбагарав", images: ["/images/visions/tsambagarav.jpg"] },
    { id: 4, title: "Хорьдол Сарьдагийн нуруу", images: ["/images/visions/horidol.jpg"] },
    { id: 5, title: "Цагаан нуур", images: ["/images/visions/tsagaan.jpg"] },
    { id: 6, title: "Хөвсгөл нуур", images: ["/images/visions/khuvsgul.jpg"] },
    { id: 7, title: "Увс нуур", images: ["/images/visions/uvs.jpg"] },
    { id: 8, title: "Хэцүү хад", images: ["/images/visions/khetsuu.jpg"] }
];

export async function GET(){
    return NextResponse.json(topVisions);
}