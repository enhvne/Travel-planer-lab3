import { NextResponse } from 'next/server';

let provinces = [
  { id: 1, name: "Өмнөговь", image: "/images/provinces/govi.jpg" },
  { id: 2, name: "Завхан", image: "/images/provinces/zavkhan.jpg" },
  { id: 3, name: "Хөвсгөл", image: "/images/provinces/khovsgol.jpg" },
  { id: 4, name: "Баян-Өлгий", image: "/images/provinces/bayanOlgii.jpg" },
  { id: 5, name: "Архангай", image: "/images/provinces/arkhangai.jpg" },
  { id: 6, name: "Увс", image: "/images/provinces/uvs.jpg" },
  { id: 7, name: "Дорнод", image: "/images/provinces/dornod.jpg" },
  { id: 8, name: "Өвөрхангай", image: "/images/provinces/uvurkhangai.jpg" },
  { id: 9, name: "Улаанбаатар", image: "/images/provinces/ulaanbaatar.jpg" },
  { id: 10, name: "Дорноговь", image: "/images/provinces/dornogovi.jpg" },
  { id: 11, name: "Булган", image: "/images/provinces/bulgan.jpg" },
  { id: 12, name: "Хэнтий", image: "/images/provinces/khentii.jpg" },
  { id: 13, name: "Төв", image: "/images/provinces/tuv.jpg" },
  { id: 14, name: "Ховд", image: "/images/provinces/hovd.jpg" },
];

// GET method
export async function GET() {
  return NextResponse.json(provinces);
}

// // POST method
// export async function POST(req: Request) {
//   const body = await req.json();
//   const { name, image } = body;

//   if (!name || !image) {
//     return NextResponse.json({ error: 'name and image required' }, { status: 400 });
//   }

//   const newProvince = {
//     id: provinces.length + 1,
//     name,
//     image
//   };

//   provinces.push(newProvince);

//   return NextResponse.json(newProvince, { status: 201 });
// }
