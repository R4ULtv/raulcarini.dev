# raulcarini.dev

Personal portfolio and blog, built with [Astro](https://astro.build) and deployed to Cloudflare Workers. Content lives in Markdown/MDX, most pages are prerendered to static HTML, and server-side code is limited to the page-view API.

## ✨ Features

- **📝 MDX Blog** — posts in a type-safe content collection, with custom components (tweet embeds, YouTube embeds)
- **🎨 Syntax Highlighting** — Shiki with dual `vitesse-light` / `vitesse-dark` themes
- **💻 GitHub Integration** — contribution heatmap and repository list, fetched client-side and cached in `localStorage`
- **🌗 Dark Mode** — theme switching with system preference detection, applied before first paint
- **🔤 Local Fonts** — Geist and Geist Mono, self-hosted and optimized through Astro's font pipeline
- **🔍 SEO** — automatic sitemap, RSS feed, canonical URLs, and per-page metadata
- **📅 Annual Recaps** — year-by-year development metrics, highlights, and reflections
- **📊 Page View API** — Cloudflare Worker endpoints backed by Upstash Redis
- **☁️ Cloudflare Deployment** — static-first output with API routes, rate limiting, and observability on Cloudflare Workers

## 🧰 Stack

| | |
|---|---|
| Framework | Astro 7 |
| Runtime / Hosting | Cloudflare Workers via `@astrojs/cloudflare` |
| Styling | Tailwind CSS v4 (CSS-first, via `@tailwindcss/vite`) |
| Content | `@astrojs/mdx` + content collections |
| Language | TypeScript |
| Lint / Format | oxlint + oxfmt |
| Package manager | pnpm |

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm

### Installation

```bash
git clone https://github.com/R4ULtv/raulcarini.dev.git
cd raulcarini.dev
pnpm install
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321).

Copy `.env.example` to `.dev.vars` and add the Upstash REST credentials used by the page-view API. The GitHub data is fetched from public APIs in the browser.

## 📝 Writing Blog Posts

Create a `.md` or `.mdx` file in `src/content/blog/`. The filename becomes the slug, so `src/content/blog/my-post.mdx` is served at `/blog/my-post`.

```mdx
---
title: My First Blog Post
shortDescription: A one-line summary used in listings.
description: A longer summary used for SEO and social previews.
category: articles
keywords: ["astro", "typescript"]
pubDate: 2026-01-15
---

This is my blog post content with **markdown** support.

```

### Frontmatter

| Field | Required | Notes |
|---|---|---|
| `title` | ✅ | |
| `shortDescription` | ✅ | Short summary for listings |
| `description` | ✅ | Long summary for metadata |
| `category` | ✅ | One of `projects`, `articles`, `updates`, `personal` |
| `keywords` | ✅ | Array of strings |
| `pubDate` | ✅ | Sorted newest first |
| `updatedDate` | | |
| `heroImage` | | Resolved and optimized by Astro |
| `heroImageAlt` | | Alt text for the hero image |

The schema is enforced at build time in `src/content.config.ts` — an invalid `category` or a missing field fails the build rather than shipping broken output.

## 📁 Project Structure

```
src/
├── assets/fonts/     # Geist + Geist Mono
├── components/       # Layout and UI components
│   └── content/      # Components usable inside MDX
├── content/blog/     # Blog posts (.md / .mdx)
├── data/             # Annual recap data
├── layouts/          # BlogPost layout
├── lib/              # GitHub, page-view, and post helpers
├── pages/            # Home, blog, recap, RSS, and API routes
└── styles/           # global.css (Tailwind theme tokens)
```

## 🔧 Available Scripts

```bash
pnpm dev        # Start the dev server
pnpm build      # Build the static site to dist/
pnpm preview    # Preview a completed build in the Workers runtime
pnpm deploy     # Build and deploy with Wrangler
pnpm cf-typegen # Regenerate Cloudflare binding types
pnpm check      # Type-check with astro check
pnpm lint       # Run oxlint
pnpm fmt        # Run oxfmt
```

> `astro check` relies on generated types in `.astro/`. If they're missing or stale, run `pnpm astro sync` first.

## 🚢 Cloudflare Deployment

The site uses the Astro Cloudflare adapter. Content pages are prerendered during the build, while `/api/views` and `/api/views/:path` run on Cloudflare Workers.

[`wrangler.jsonc`](wrangler.jsonc) configures:

- the `raulcarini.dev` custom domain
- separate read and write rate-limit bindings for the page-view API
- Worker observability
- the `nodejs_compat` compatibility flag

For local development, copy `.env.example` to `.dev.vars` and provide the Upstash REST credentials. The adapter uses Node.js to prerender static pages during development and builds because `prerenderEnvironment` is set to `"node"`. On-demand routes such as the page-view API still run in Cloudflare's `workerd` runtime. After building, `pnpm preview` runs the completed Worker bundle locally in `workerd`.

Authenticate Wrangler and add the production secrets once:

```bash
pnpm wrangler login
pnpm wrangler secret put UPSTASH_REDIS_REST_URL
pnpm wrangler secret put UPSTASH_REDIS_REST_TOKEN
```

Deploy the site:

```bash
pnpm deploy
```

When Cloudflare bindings change, update the generated types before checking the project:

```bash
pnpm cf-typegen
pnpm check
```

## 📄 License

Open source under the [MIT License](LICENSE).

## 🤝 Contributing

This is a personal site, but feel free to fork it and adapt it for your own use. Bug reports and suggestions are welcome - open an issue.

---

Built with ❤️ by Raul Carini
