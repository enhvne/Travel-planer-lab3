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