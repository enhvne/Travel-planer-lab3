import { NextResponse } from "next/server";

const Dest = [
    {
        id: 1,
        images: ['/images/image1.jpg'],
        province: 'Архангай',
        title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
        category: [1,2],
        rating: '3.0',
        isWishListed:  false,
    },
    {
        id: 2,
        images: ['/images/image2.jpg',],
        province: 'Архангай',
        title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
        category: [2,1],
        rating: '5.0',
        isWishListed:  false,
    },
    {
        id: 3,
        images: ['/images/image3.jpg',],
        province: 'Архангай',
        title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
        category: [3],
        rating: '5.0',
        isWishListed:  false,
    },
    {
        id: 4,
        images: ['/images/image1.jpg',],
        province: 'Орхон',
        title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
        category: [3,4],
        rating: '5.0',
        isWishListed:  false,
    },
    {
        id: 5,
        images: ['/images/image2.jpg',],
        province: 'Орхон',
        title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
        category: [4],
        rating: '5.0',
        isWishListed:  false,
    },
    {
        id: 6,
        images: ['/images/image3.jpg',],
        province: 'Орхон',
        title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
        category: [4],
        rating: '5.0',
        isWishListed:  false,
    },
    {
        id: 7,
        images: ['/images/image1.jpg',],
        province: 'Булган',
        title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
        category: [5],
        rating: '5.0',
        isWishListed: false,
    },
    {
        id: 8,
        images: ['/images/image1.jpg',],
        province: 'Булган',
        title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
        category: [5],
        rating: '5.0',
        isWishListed:  false,
    },
    {
        id: 9,
        images: ['/images/image2.jpg',],
        province: 'Булган',
        title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
        category: [6,7],
        rating: '5.0',
        isWishListed:  false,
    },
    {
        id: 10,
        images: ['/images/image3.jpg',],
        province: 'Архангай',
        title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
        category: [7],
        rating: '5.0',
        isWishListed:  false,
    }
];

export async function GET(
    request: Request,
    { params }: { params: { province: string } }
  ) {
    const provinceParam = decodeURIComponent(params.province || '');
  
    let filtered = Dest;
    if (provinceParam.trim() !== '') {
        filtered = Dest.filter(item => item.province === provinceParam);
      }
  
    return NextResponse.json(filtered);
}
  