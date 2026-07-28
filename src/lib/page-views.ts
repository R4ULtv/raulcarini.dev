import { Redis } from "@upstash/redis/cloudflare";
import { env } from "cloudflare:workers";

export const PAGE_VIEW_KEY_PREFIX = "@blog/pageviews:";

export function getPageViewsRedis() {
  return Redis.fromEnv(env);
}

export function pageViewKey(path: string) {
  return `${PAGE_VIEW_KEY_PREFIX}${path}`;
}
