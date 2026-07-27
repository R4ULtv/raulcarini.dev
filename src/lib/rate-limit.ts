const RATE_LIMIT_HEADERS = {
  "Cache-Control": "no-store",
  "Retry-After": "60",
};

type RateLimiter = {
  limit(options: { key: string }): Promise<{ success: boolean }>;
};

export async function getRateLimitResponse(request: Request, rateLimiter: RateLimiter) {
  // This application has no user accounts, so the connecting IP is the
  // narrowest stable client identifier available at Cloudflare's edge.
  const key = request.headers.get("cf-connecting-ip") ?? "unknown-client";
  const { success } = await rateLimiter.limit({ key });

  if (success) {
    return null;
  }

  return Response.json(
    { error: "Too many requests. Please try again later." },
    { status: 429, headers: RATE_LIMIT_HEADERS },
  );
}
