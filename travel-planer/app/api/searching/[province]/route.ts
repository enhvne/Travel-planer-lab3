import { NextResponse } from "next/server";
import { destinations , provinces} from "@/lib/mock-data";


export async function GET(
  request: Request,
  { params }: { params: { province: string } }
) {
  const provinceParam = decodeURIComponent(params.province || '').trim();

  // Step 1: Нэрээр ID-г олох
  const matchedProvince = provinces.find(
    (province) => province.name === provinceParam
  );

  if (!matchedProvince) {
    return NextResponse.json([], { status: 200 }); // Аймаг олдоогүй
  }

  // Step 2: ID-аар destination-уудыг шүүх
  const filtered = destinations.filter(
    (item) => item.province === matchedProvince.id
  );

  return NextResponse.json(filtered);
}

// app/api/destinations/by-province/[province]/route.ts
// import { NextResponse } from "next/server";
// import { connectToDB } from "@/lib/mongoose";
// import { DestinationModel } from "@/lib/model/Destination";
// import { ProvinceModel } from "@/lib/model/Province";

// export async function GET(
//   request: Request,
//   { params }: { params: { province: string } }
// ) {
//   try {
//     await connectToDB();

//     const provinceParam = decodeURIComponent(params.province || "").trim();

//     // Step 1: Нэрээр Province хайх
//     const matchedProvince = await ProvinceModel.findOne({ name: provinceParam });

//     if (!matchedProvince) {
//       return NextResponse.json([], { status: 200 }); // Аймаг олдоогүй
//     }

//     // Step 2: Province ID-р Destination-уудыг шүүх
//     const destinations = await DestinationModel.find({ province: matchedProvince._id })
//       .populate("category")
//       .populate("province")
//       .populate("comments")
//       .populate("hotels")
//       .lean();

//     return NextResponse.json(destinations);
//   } catch (error) {
//     console.error("Error fetching destinations by province:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

  