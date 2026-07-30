// @ts-check

import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders, sessionDrivers } from "astro/config";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    imageService: "compile",
    prerenderEnvironment: "workerd",
  }),
  session: {
    // The site does not use Astro sessions. An in-memory driver prevents the
    // Cloudflare adapter from provisioning an unused SESSION KV namespace.
    driver: sessionDrivers.lruCache({
      max: 1,
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://www.raulcarini.dev",
  trailingSlash: "never",
  build: {
    // Emits `blog/post.html` instead of `blog/post/index.html`, keeping URLs
    // slash-less to match the previously indexed Next.js routes.
    format: "file",
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
    },
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Geist",
      cssVariable: "--font-geist",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Geist/Geist.woff2"],
            weight: "400 700",
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Geist/GeistMono.woff2"],
            weight: "400 700",
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
  ],
});
