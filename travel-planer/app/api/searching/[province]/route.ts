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
  