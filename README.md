<img alt="Raul Carini - Full-Stack Developer" src="https://www.raulcarini.dev/api/dynamic-og">

A modern personal portfolio and blog built with Next.js 15, featuring MDX-powered content, dynamic Open Graph images, page view tracking, and GitHub contributions visualization. The site leverages cutting-edge Next.js features including App Router, Server Components, and Turbopack for optimal performance.

## ✨ Features

- **📝 MDX Blog** - Write rich blog posts with custom components (Tweet embeds, YouTube videos)
- **🎨 Syntax Highlighting** - Beautiful code blocks with Shiki (`vitesse-dark`/`vitesse-light` themes)
- **🖼️ Dynamic OG Images** - Automatically generated social preview images (WebP, 1200x630px)
- **📊 Page View Tracking** - Real-time view counts with Upstash Redis (Edge runtime)
- **💻 GitHub Integration** - Contribution heatmap and repository visualization
- **🌗 Dark Mode** - Seamless theme switching with system preference detection
- **⚡ Modern Stack** - Next.js 15.5.4, React 19.1.0, Tailwind CSS v4, TypeScript
- **🔍 SEO Optimized** - Dynamic sitemap/robots.txt, metadata API, semantic HTML

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (latest LTS recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/R4ULtv/raulcarini.com-v2.git
cd raulcarini.com-v2
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables (create `.env.local`):
```env
# Upstash Redis (for page views)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Optional: GitHub token for higher API rate limits
GITHUB_TOKEN=your_github_token
```

4. Run the development server with Turbopack:
```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## 📝 Writing Blog Posts

Create a new `.mdx` file in the `/content` directory:

```mdx
export const metadata = {
  title: "My First Blog Post",
  createdAt: "2025-01-15",
  description: "An amazing blog post about web development",
  keywords: ["nextjs", "react", "typescript"],
  shortSlug: "first-post" // Optional short URL
};

# My First Blog Post

This is my blog post content with **markdown** support!

\`\`\`typescript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

<Tweet id="1234567890" />
```

Posts are automatically discovered and sorted by `createdAt` date (newest first).

## 🔧 Available Scripts

```bash
# Development server with Turbopack
pnpm run dev

# Production build with Turbopack
pnpm run build

# Start production server
pnpm start

# Run ESLint
pnpm run lint
```

## 🚢 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FR4ULtv%2Fraulcarini.com-v2)

Don't forget to add your environment variables in the Vercel dashboard!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

While this is a personal portfolio, feel free to fork it and adapt it for your own use! If you find bugs or have suggestions, please open an issue.

---

Built with ❤️ by Raul Carini
