import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["mdx", "ts", "tsx"],
  serverExternalPackages: ["@takumi-rs/image-response"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "abs.twimg.com" },
    ],
  },
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
