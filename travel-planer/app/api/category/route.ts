import { NextResponse } from "next/server";
import { categories } from "@/lib/mock-data";

export async function GET(){
    return NextResponse.json(categories);
}


// import { NextResponse } from "next/server";
// import { connectToDB } from "@/lib/mongoose";
// import { CategoryModel } from "@/lib/model/Category";

// export async function GET() {
//   try {
//     await connectToDB();

//     const categories = await CategoryModel.find().lean();
//     return NextResponse.json(categories);
//   } catch (error) {
//     console.error("Failed to fetch categories:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
