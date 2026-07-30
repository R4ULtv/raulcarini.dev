import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

import { BLOG_CATEGORIES } from "./lib/blog-meta";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortDescription: z.string(),
      description: z.string(),
      category: z.enum(BLOG_CATEGORIES),
      keywords: z.array(z.string()),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      shortSlug: z.string().optional(),
      heroImage: z.optional(image()),
      heroImageAlt: z.string().optional(),
    }),
});

export const collections = { blog };
