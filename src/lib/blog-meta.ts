export const BLOG_CATEGORIES = ["projects", "articles", "updates", "personal"] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

type BlogCategoryMeta = {
  label: string;
  dotClass: string;
  ogAccent: string;
};

export const BLOG_CATEGORY_META: Record<BlogCategory, BlogCategoryMeta> = {
  projects: {
    label: "Projects",
    dotClass: "bg-sky-500/70",
    ogAccent: "rgba(14, 165, 233, 0.7)",
  },
  articles: {
    label: "Articles",
    dotClass: "bg-violet-500/70",
    ogAccent: "rgba(139, 92, 246, 0.7)",
  },
  updates: {
    label: "Updates",
    dotClass: "bg-amber-500/70",
    ogAccent: "rgba(245, 158, 11, 0.7)",
  },
  personal: {
    label: "Personal",
    dotClass: "bg-rose-500/70",
    ogAccent: "rgba(244, 63, 94, 0.7)",
  },
};

export const NEW_POST_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export function isNewPost(pubDate: Date, now = new Date()) {
  const age = now.valueOf() - pubDate.valueOf();

  return age >= 0 && age <= NEW_POST_DURATION_MS;
}
