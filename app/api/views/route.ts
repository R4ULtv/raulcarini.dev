import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

export const runtime = "edge";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const KEY_PREFIX = "@blog/pageviews:" as const;

export async function GET() {
  let cursor = "0";
  const allKeys: string[] = [];

  do {
    const [nextCursor, keys] = await redis.scan(cursor, {
      match: `${KEY_PREFIX}*`,
      count: 50,
    });
    allKeys.push(...keys);
    cursor = nextCursor;
  } while (cursor !== "0");

  if (allKeys.length === 0) {
    return NextResponse.json({});
  }

  const values = await redis.mget<number[]>(...allKeys);

  const result: Record<string, number> = {};
  allKeys.forEach((key, index) => {
    const cleanKey = key.replace(KEY_PREFIX, "");
    const value = values[index];

    if (typeof value === "number" && value >= 0) {
      result[cleanKey] = value;
    }
  });

  return NextResponse.json(result);
}
