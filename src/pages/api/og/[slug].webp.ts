import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { ImageResponse } from "takumi-js/response";

import { SITE_DESCRIPTION, SITE_TITLE } from "../../../consts";
import { readingTime } from "../../../lib/post";

export const prerender = false;

const WIDTH = 1200;
const HEIGHT = 630;
const BLOG_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const RESPONSE_HEADERS = {
  "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
};

const CATEGORY_ACCENTS = {
  projects: "rgba(14, 165, 233, 0.7)",
  articles: "rgba(139, 92, 246, 0.7)",
  updates: "rgba(245, 158, 11, 0.7)",
  personal: "rgba(244, 63, 94, 0.7)",
} as const;

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function template({
  eyebrow,
  title,
  description,
  details,
  accent,
  isHome = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  details: string;
  accent: string;
  isHome?: boolean;
}) {
  return {
    type: "container" as const,
    tw: "flex h-full w-full flex-col justify-between bg-[oklch(0.1805_0.0065_46.2)] p-[60px] text-[oklch(0.986_0.002_67.8)]",
    children: [
      {
        type: "container" as const,
        tw: "flex items-center justify-between",
        children: [
          {
            type: "text" as const,
            text: "RAUL CARINI",
            tw: "text-[21px] font-semibold tracking-[0.12em]",
          },
          {
            type: "text" as const,
            text: "raulcarini.dev",
            tw: "text-[20px] text-[oklch(0.714_0.014_41.2)]",
          },
        ],
      },
      {
        type: "container" as const,
        tw: "flex max-w-[1080px] flex-col",
        children: [
          {
            type: "container" as const,
            tw: "mb-[18px] flex items-center gap-[12px]",
            children: [
              {
                type: "container" as const,
                tw: "mb-[3px] flex h-[12px] w-[12px] shrink-0 rounded-full",
                style: { backgroundColor: accent },
                children: [],
              },
              {
                type: "text" as const,
                text: eyebrow,
                tw: "text-[19px] font-semibold tracking-[0.14em] text-[oklch(0.714_0.014_41.2)]",
              },
            ],
          },
          {
            type: "text" as const,
            text: title,
            tw: `${isHome ? "text-[86px]" : "line-clamp-2 text-[70px]"} font-bold leading-[1.04] tracking-[-0.045em]`,
          },
          {
            type: "text" as const,
            text: description,
            tw: "mt-[22px] line-clamp-2 max-w-[1000px] text-[27px] leading-[1.35] text-[oklch(0.714_0.014_41.2)]",
          },
        ],
      },
      {
        type: "container" as const,
        tw: "flex items-center border-t-[2px] border-[rgba(255,255,255,0.1)] pt-[26px]",
        children: [
          {
            type: "text" as const,
            text: details,
            tw: "text-[20px] text-[oklch(0.714_0.014_41.2)]",
          },
        ],
      },
    ],
  };
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;

  if (!slug || !BLOG_SLUG_PATTERN.test(slug)) {
    return new Response("OG image not found.", { status: 404 });
  }

  let image;

  if (slug === "home") {
    image = template({
      eyebrow: "FULL STACK DEVELOPER",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      details: "Milan, Italy  ·  Projects, writing and open source",
      accent: "oklch(0.714 0.014 41.2)",
      isHome: true,
    });
  } else {
    const post = await getEntry("blog", slug);

    if (!post) {
      return new Response("OG image not found.", { status: 404 });
    }

    const dates = [
      formatDate(post.data.pubDate),
      `${readingTime(post.body)} min read`,
      post.data.updatedDate ? `Updated ${formatDate(post.data.updatedDate)}` : undefined,
    ]
      .filter(Boolean)
      .join("  ·  ");

    image = template({
      eyebrow: post.data.category.toUpperCase(),
      title: post.data.title,
      description: post.data.shortDescription,
      details: dates,
      accent: CATEGORY_ACCENTS[post.data.category],
    });
  }

  const response = new ImageResponse(image, {
    width: WIDTH,
    height: HEIGHT,
    format: "webp",
    headers: RESPONSE_HEADERS,
  });

  try {
    await response.ready;
    return response;
  } catch (error) {
    console.error(`Failed to generate an OG image for "${slug}":`, error);
    return new Response("Failed to generate image.", { status: 500 });
  }
};
