import { NextResponse } from "next/server";

const Categories = [
    { id: 1, name: 'Tours'},
    { id: 2, name: 'Cultural Tours'},
    { id: 3, name: 'Sightseeing Tours' },
    { id: 4, name: 'Private and Luxury'},
    { id: 5, name: 'Night Tours' },
    { id: 6, name: 'Walking Tours'},
    { id: 7, name: 'Photography Tours' },
    { id: 8, name: 'Adventure Tours'},
    { id: 9, name: 'Food and Drink Tours'},
    { id: 10, name: 'Family and Kids Tours'},
    { id: 11, name: 'Art and History Tours'},
    { id: 12, name: 'Beaches and Sunsets'},
    { id: 13, name: 'Nature and Wildlife Tours'},
];

export async function GET(){
    return NextResponse.json(Categories);
}
