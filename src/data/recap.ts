export type RecapMetricKey =
  | "activeDays"
  | "contributions"
  | "repositories"
  | "stars"
  | "blogPosts"
  | "blogViews"
  | "websites"
  | "projectViews";

export interface RecapYear {
  year: number;
  thesis: string;
  reflection: string;
  topLanguage: string;
  metrics: Record<RecapMetricKey, number>;
  highlightSlugs: string[];
}

export const recapYears: RecapYear[] = [
  {
    year: 2023,
    thesis: "The groundwork year.",
    reflection:
      "Most of the work happened before the public writing archive. I spent the year opening repositories and building the first small group of sites that everything else grew from.",
    topLanguage: "JavaScript",
    metrics: {
      activeDays: 103,
      contributions: 483,
      repositories: 13,
      stars: 1,
      blogPosts: 0,
      blogViews: 0,
      websites: 3,
      projectViews: 23_953,
    },
    highlightSlugs: [],
  },
  {
    year: 2024,
    thesis: "Building turned into a publishing habit.",
    reflection:
      "I started documenting the work instead of only shipping it. The portfolio became a record of projects, Cloudflare experiments, and what I learned while building them.",
    topLanguage: "JavaScript",
    metrics: {
      activeDays: 217,
      contributions: 1_973,
      repositories: 8,
      stars: 6,
      blogPosts: 17,
      blogViews: 3_261,
      websites: 5,
      projectViews: 39_122,
    },
    highlightSlugs: [
      "shortly",
      "multi-region-r2-bucket-system",
      "raulcarini-dev",
      "tailwindcss-color-palettes",
      "2024-developer-wrapped",
    ],
  },
  {
    year: 2025,
    thesis: "Experiments became tools people could use.",
    reflection:
      "TypeScript became my main language, and the focus shifted from starting websites to refining useful tools. More projects stayed active and the work reached beyond my own portfolio.",
    topLanguage: "TypeScript",
    metrics: {
      activeDays: 224,
      contributions: 1_963,
      repositories: 13,
      stars: 40,
      blogPosts: 18,
      blogViews: 2_070,
      websites: 10,
      projectViews: 19_561,
    },
    highlightSlugs: [
      "texta-editor",
      "learn-the-web",
      "icon-picker",
      "ui-components",
      "lazypr",
      "polar-better-stripe-alternative",
    ],
  },
];
