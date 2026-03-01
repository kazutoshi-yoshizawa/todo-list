import { NextRequest, NextResponse } from "next/server";
import { getAll, create } from "./store";

export async function GET() {
  return NextResponse.json(getAll());
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const title = body.title?.trim();
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  const todo = create(title);
  return NextResponse.json(todo, { status: 201 });
}
