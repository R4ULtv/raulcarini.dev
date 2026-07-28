import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

import { getPageViewsRedis, PAGE_VIEW_KEY_PREFIX } from "../../../lib/page-views";
import { getRateLimitResponse } from "../../../lib/rate-limit";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const rateLimitResponse = await getRateLimitResponse(request, env.PAGE_VIEWS_READ_RATE_LIMITER);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const redis = getPageViewsRedis();
  const keys: string[] = [];
  let cursor = 0;

  do {
    const [nextCursor, pageKeys] = await redis.scan(cursor, {
      match: `${PAGE_VIEW_KEY_PREFIX}*`,
      count: 50,
    });

    keys.push(...pageKeys);
    cursor = Number(nextCursor);
  } while (cursor !== 0);

  if (keys.length === 0) {
    return Response.json(
      {},
      {
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  const values = await redis.mget<(number | null)[]>(...keys);
  const views: Record<string, number> = {};

  keys.forEach((key, index) => {
    const value = values[index];
    if (typeof value === "number" && value >= 0) {
      views[key.slice(PAGE_VIEW_KEY_PREFIX.length)] = value;
    }
  });

  return Response.json(views, {
    headers: { "Cache-Control": "no-store" },
  });
};
