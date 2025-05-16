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
  
// POST - add new recently viewed item
export async function POST(req: Request) {
  try {
    const { image, title, rating } = await req.json();

    if (!image || !title || !rating) {
      return NextResponse.json({ error: 'Image, title, and rating are required' }, { status: 400 });
    }

    const newItem = {
      id: recentlyViewed.length + 1,
      image,
      title,
      rating,
      viewedAt: new Date().toISOString()
    };

    recentlyViewed.unshift(newItem);
    if (recentlyViewed.length > 10) {
      recentlyViewed = recentlyViewed.slice(0, 10);
    }

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error adding recently viewed item:', error);
    return NextResponse.json({ error: 'Failed to add recently viewed item' }, { status: 500 });
  }
}

// DELETE - remove item by id
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    recentlyViewed = recentlyViewed.filter(item => item.id !== parseInt(id));

    return NextResponse.json({ message: 'Item removed successfully' });
  } catch (error) {
    console.error('Error removing recently viewed item:', error);
    return NextResponse.json({ error: 'Failed to remove recently viewed item' }, { status: 500 });
  }
}