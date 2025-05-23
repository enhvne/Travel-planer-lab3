import { NextResponse } from 'next/server'

let recentlyViewed = [
    {
        id: 1,
        image: "/images/visions/horgiin togoo.jpg",
        title: "Хоргын тогоо, Архангай аймгийн Тариат сум",
        rating: "5.0",
        viewedAt: "2024-03-19T15:30:00Z"
    },
    {
        id: 2,
        image: "/images/visions/Чингис хааны морьт хөшөө.jpg",
        title: "Чингис хааны морьт хөшөө, Төв аймаг",
        rating: "5.0",
        viewedAt: "2024-03-18T09:15:00Z"
    },
    {
        id: 3,
        image: "/images/visions/Хөвсгөл нуур.jpg",
        title: "Хөвсгөл нуур , Хөвсгөл аймаг",
        rating: "5.0",
        viewedAt: "2024-03-17T14:45:00Z"
    },
    {
        id: 4,
        image: "/images/visions/Амарбаясгалант хийд.jpg",
        title: "Амарбаясгалант хийд, Сэлэнгэ аймаг",
        rating: "5.0",
        viewedAt: "2024-03-17T14:45:00Z"
    },
    {
        id: 5,
        image: "/images/image1.jpg",
        title: "Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум",
        rating: "5.0",
        viewedAt: "2024-03-20T10:00:00Z"
    }
];

// GET - get all recently viewed
export async function GET() {
  const sortedItems = [...recentlyViewed].sort(
    (a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime()
  );
  return NextResponse.json(sortedItems);
}