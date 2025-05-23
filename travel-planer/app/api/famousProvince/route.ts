import { NextResponse } from 'next/server';

import { provinces } from '@/lib/mock-data';
// GET method
export async function GET() {
  return NextResponse.json(provinces);
}