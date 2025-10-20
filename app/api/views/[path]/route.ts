import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  const views = await redis.get("@blog/pageviews:" + path);
  return NextResponse.json(views);
}

export async function POST(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  await redis.incr("@blog/pageviews:" + path);
  return new NextResponse("OK");
}
