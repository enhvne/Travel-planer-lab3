import { CommentU } from '@/models/model';
import { NextResponse } from 'next/server'
import { title } from 'process';
import { destinations } from '@/lib/mock-data';

export async function GET(){
    return NextResponse.json(destination);
}

// app/api/destinations/route.ts
// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/lib/mongoose';
// import { DestinationModel } from '@/lib/model/Destination';

// export async function GET() {
//   try {
//     await connectToDB();

//     const destinations = await DestinationModel.find()
//       .populate('category')
//       .populate('province')
//       .populate('comments')
//       .populate('hotels')
//       .lean();

//     // _id-г id болгон хөрвүүлэх + нийцүүлэлт
//     const transformed = destinations.map((dest: any) => ({
//       id: dest._id.toString(),
//       title: dest.title,
//       overview: dest.overview,
//       category: dest.category.map((c: any) => ({
//         id: c._id.toString(),
//         name: c.name,
//       })),
//       province: {
//         id: dest.province._id.toString(),
//         name: dest.province.name,
//         image: dest.province.image,
//       },
//       images: dest.images,
//       location: dest.location,
//       sum: dest.sum || null,
//       rating: dest.rating,
//       filters: dest.filters,
//       comments: dest.comments?.map((c: any) => ({
//         id: c._id.toString(),
//         content: c.content,
//         user: c.user,
//         date: c.date,
//       })) || null,
//       hotels: dest.hotels?.map((h: any) => ({
//         id: h._id.toString(),
//         name: h.name,
//         location: h.location,
//         stars: h.stars,
//         image: h.image,
//       })) || null,
//       isWishListed: dest.isWishListed,
//     }));

//     return NextResponse.json(transformed);
//   } catch (error) {
//     console.error('Failed to fetch destinations:', error);
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
// }

const user1={id: 1, name: 'tsend_Sh'}
const user2={id: 1, name: 'baatar_Sh'}
const user3={id: 1, name: 'anuuk'}
const user4={id: 1, name: 'nurkash'}

const comments = [
    {
      id: 1,
      rating: 5,
      desc: 'Отгонтэнгэр уулын оргилд гарч үзэхэд үнэхээр гайхалтай байлаа. Байгалийн цэвэр агаарт алхаж, мөнх цаст оройг харан суух мэдрэмж мартагдашгүй. Хөх нуурын эрэг дээр амрахад сэтгэл тайвширч, амар амгаланг мэдэрсэн',
      author: user2.name,
      date: '1 Jan 2023'
    },
    {
      id: 2,
      rating: 4,
      desc: 'Алдархаан сумын Отгонтэнгэр уулын орчимд аялал хийхэд байгаль үнэхээр онгон, амьтан ургамал элбэгтэй байсан. Тахилгатай ариун уул гэдгийг нутгийн хүмүүсийн ярианаас мэдэрсэн. Мөн рашаан сувилал нь эрүүл мэндэд маш сайн санагдсан.',
      author: user3.name,
      date: '1 Jan 2023'
    },
    {
      id: 3,
      rating: 3,
      desc: 'Уулын энгэрт байрлах Бадархундага нуурын үзэмж үнэхээр сайхан. Уулын орчинд амьдардаг ховор ургамал, шувуудыг харах боломжтой байсан нь аялалыг илүү сонирхолтой болгож өгсөн.',
      author: user4.name,
      date: '4 Feb 2023'
    },
    {
      id: 4,
      rating: 3.5,
      desc: 'Отгонтэнгэр уулын дэргэдэх Даян амралтын рашаан сувилалд зочилсон. Эртний уламжлалтай, эмчилгээний чанартай рашаан гэдгийг мэдэрч, бие сэтгэл амарч тайвширсан сайхан газар байлаа.',
      author: 'tsend_Sh',
      date: '1 Feb 2023'
    },
    {
      id: 5,
      rating: 4,
      desc: 'Улиастайгаас Отгонтэнгэр рүү явж, уулын оргилд гарахад бэрхшээлтэй ч үнэхээр үнэ цэнэтэй туршлага болсон. Орчин тойрон дахь уулс, нуур, ой хөвч нь байгалийн гайхамшиг шиг санагдсан. Монголын ариун уулыг үзэж, нутгийн соёл, домгийг мэдэрсэн сайхан аялал байлаа.',
      author: user1.name,
      date: '2 Jan 2023'
    }
];
const category =[{ id: 1, name: 'hiking' }, { id: 2, name: 'nature' }]
  
let destination =[
    {
       id: 1,
       title: 'Oтгoнтэнгэр уул',
       overview: 'Отгонтэнгэр уул нь Монгол Улсын баруун бүсэд, Завхан аймгийн Алдархаан сумын нутагт байрлах Хангайн нурууны ноён оргил бөгөөд далайн түвшнээс 4021 метр өндөрт өргөгдсөн Монголын ариун дагшин уул юм. Монголчууд эртнээс Очирваань хайрхан, Этүгэн уул хэмээн хүндэтгэн тахиж ирсэн бөгөөд бөө мөргөлийн гол тахилгатай газар билээ. Уулын оргил хэсэг нь мөнх цастай, түүний доор Бадархундага зэрэг үзэсгэлэнт нуур, рашаан сувиллын газрууд оршдог. Отгонтэнгэр нь Хангайн нурууны байгалийн өвөрмөц тогтоц бүхий, олон төрлийн ховор ургамал, амьтан амьдардаг биосферийн цогцолборт газар бөгөөд 1992 оноос дархан цаазат газар болж хамгаалагдаж байна. Уулын орчимд Монголын уламжлалт тахилга, шашны зан үйл одоо ч хадгалагдан үлдсэн бөгөөд ЮНЕСКО-ийн дэлхийн байгалийн өвд бүртгэгдэх магадлалтай газруудын нэг юм. Отгонтэнгэр уул нь байгалийн үзэсгэлэн, түүх соёлын өвийг нэгтгэсэн аялал жуулчлалын чухал төв бөгөөд ууланд авиралт хийх, рашаан сувилалд зочлох, байгалийн аялал хийх боломжтой газар юм.',
       province: 'Завхан аймaг',
       category: [1, 2],
       images: [
        '/images/image1.jpg',
        '/images/image2.jpg',
        '/images/image3.jpg',
        '/images/image4.jpg',
       ],
       comments: comments,
       isWishListed: false,
    },
    {
        id: 2,
        title: 'Хөвсгөл нуур',
        overview: 'Хөвсгөл нуур нь Монголын хойд хэсэгт орших гүн цэнгэг нуур бөгөөд “Монголын Швейцарь” хэмээн нэрлэгддэг. Байгаль дэлхийн унаган төрхийг хадгалсан, аялал жуулчлалын гол бүс нутагт тооцогддог. Нуурын эрэг дагуу морин аялал, завиар зугаалах, нуурын мөсөн дээр өвлийн спортоор хичээллэх зэрэг олон сонирхолтой боломжууд бий.',
        province: 'Хөвсгөл аймаг',
        category: [1],
        images: [
          '/images/image1.jpg',
          '/images/image2.jpg',
          '/images/image3.jpg',
          '/images/image4.jpg',
        ],
        comments: [
          {
            id: 1,
            rating: 5,
            desc: 'Хөвсгөл нуур үнэхээр гайхамшигтай! Тунгалаг ус, эргэн тойронд нь амар амгалан мэдрэгдэж байсан.',
            author: 'anuu_kh',
            date: '5 Jul 2023',
          },
          {
            id: 2,
            rating: 4.5,
            desc: 'Өвлийн мөсөн фестиваль нь үнэхээр гоё байлаа. Гэр бүлээрээ очиж сайхан дурсамж бүтээсэн.',
            author: 'bold_hg',
            date: '15 Feb 2023',
          },
        ],
        isWishListed: false,
      }
]