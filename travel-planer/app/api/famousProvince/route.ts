import { NextResponse } from 'next/server';

let provinces = [
  { id: 1, name: "Govi", image: "/images/provinces/govi.jpg" },
  { id: 2, name: "Zavkhan", image: "/images/provinces/zavkhan.jpg" },
  { id: 3, name: "Khovsgol", image: "/images/provinces/khovsgol.jpg" },
  { id: 4, name: "Bayan Olgii", image: "/images/provinces/bayanOlgii.jpg" },
  { id: 5, name: "Arkhangai", image: "/images/provinces/arkhangai.jpg" },
  { id: 6, name: "Uvs", image: "/images/provinces/uvs.jpg" },
  { id: 7, name: "Dornod", image: "/images/provinces/dornod.jpg" },
  { id: 8, name: "Uvurkhangai", image: "/images/provinces/uvurkhangai.jpg" }
];

// GET method
export async function GET() {
  return NextResponse.json(provinces);
}

// POST method
export async function POST(req: Request) {
  const body = await req.json();
  const { name, image } = body;

  if (!name || !image) {
    return NextResponse.json({ error: 'name and image required' }, { status: 400 });
  }

  const newProvince = {
    id: provinces.length + 1,
    name,
    image
  };

  provinces.push(newProvince);

  return NextResponse.json(newProvince, { status: 201 });
}
