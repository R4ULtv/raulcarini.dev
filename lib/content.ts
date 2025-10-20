import fs from "fs";
import path from "path";

export type PostMetadata = {
  title: string;
  createdAt: string; // ISO date string
  description?: string;
  keywords?: string | string[];
  shortSlug?: string;
};

export type PostSummary = {
  slug: string;
  metadata: PostMetadata;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function getAllPosts(): Promise<PostSummary[]> {
  const entries = fs.readdirSync(CONTENT_DIR, {
    recursive: true,
    withFileTypes: true,
  });

  const mdxFiles = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith(".mdx"),
  );

  const posts = await Promise.all(
    mdxFiles.map(async (entry) => {
      const relativePath = path.join(entry.parentPath, entry.name);
      const slug = path
        .relative(CONTENT_DIR, relativePath)
        .replace(/\.mdx$/, "")
        .replace(/\\/g, "/");

      // Dynamic import to access the exported `metadata` from each MDX file
      const mod = (await import(`@/content/${slug}.mdx`)) as {
        metadata: PostMetadata;
      };

      return { slug, metadata: mod.metadata } satisfies PostSummary;
    }),
  );

  posts.sort(
    (a, b) =>
      new Date(b.metadata.createdAt).getTime() -
      new Date(a.metadata.createdAt).getTime(),
  );

  return posts;
}

export function generateShortSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[aeiou]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 6);
}
