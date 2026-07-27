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

export const GET: APIRoute = async ({ params }) => {
  const path = getPath(params.path);
  if (!path) {
    return Response.json(
      { error: "A valid blog post path is required." },
      { status: 400, headers: RESPONSE_HEADERS },
    );
  }

  const views = await getPageViewsRedis().get<number>(pageViewKey(path));

  // Keep the legacy client contract: a number for an existing counter,
  // otherwise null.
  return Response.json(views, { headers: RESPONSE_HEADERS });
};

export const POST: APIRoute = async ({ params }) => {
  const path = getPath(params.path);
  if (!path) {
    return Response.json(
      { error: "A valid blog post path is required." },
      { status: 400, headers: RESPONSE_HEADERS },
    );
  }

  // Local navigation should not pollute production counters.
  if (!import.meta.env.PROD) {
    return new Response("OK", { headers: RESPONSE_HEADERS });
  }

  await getPageViewsRedis().incr(pageViewKey(path));

  return new Response("OK", { headers: RESPONSE_HEADERS });
};
