import { NextRequest, NextResponse } from "next/server";
import { JSON_HEADER } from "@/lib/constants/api.constant";

export async function GET(req: NextRequest, { params }: { params: { productId: string } }) {
  const { searchParams } = new URL(req.url);

  const pageParam = searchParams.get("page") || 1;

  const response = await fetch(
    `${process.env.API}/reviews?page=${pageParam}&limit=20&productId=${params.productId}`,
    {
      headers: { ...JSON_HEADER },
    },
  );

  const payload = await response.json();

  return NextResponse.json(payload);
}
