import type { APIRoute } from "astro";

import { getPageViewsRedis, pageViewKey } from "../../../lib/page-views";

export const prerender = false;

const RESPONSE_HEADERS = {
  "Cache-Control": "no-store",
};

const BLOG_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function getPath(path: string | undefined) {
  if (!path || !BLOG_SLUG_PATTERN.test(path)) {
    return null;
  }

  return path;
}

export const POST: APIRoute = async ({ params, locals }) => {
  const path = getPath(params.path);
  if (!path) {
    return Response.json(
      { error: "A valid blog post path is required." },
      { status: 400, headers: RESPONSE_HEADERS },
    );
  }

  const redis = getPageViewsRedis();
  const key = pageViewKey(path);
  const views = (await redis.get<number>(key)) ?? 0;

  // Return the stored count without making the visitor wait for the write.
  // Local navigation does not pollute production counters.
  if (import.meta.env.PROD) {
    locals.cfContext.waitUntil(
      redis.incr(key).catch((error) => {
        console.error(`Failed to increment page views for "${path}":`, error);
      }),
    );
  }

  return Response.json(views, { headers: RESPONSE_HEADERS });
};
