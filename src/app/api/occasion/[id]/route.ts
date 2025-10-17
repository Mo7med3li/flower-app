import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const res = await fetch(`${process.env.API}/occasions/${params.id}`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const payload = await res.json();
    return NextResponse.json(payload.occasion);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch occasion", message: error },
      { status: 500 },
    );
  }
}
