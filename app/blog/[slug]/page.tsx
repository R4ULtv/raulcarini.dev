import PageViews from "@/components/page-views";
import ShareButton from "@/components/share-button";
import { generateShortSlug, getAllPosts } from "@/lib/content";
import { formatTimeAgo } from "@/lib/time";
import { baseURL } from "@/lib/url";
import { Metadata } from "next";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post, metadata } = await import(`@/content/${slug}.mdx`);
  return (
    <article className="prose prose-zinc max-w-none dark:prose-invert">
      <h1>{metadata.title}</h1>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm">
          {new Date(metadata.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          ({formatTimeAgo(metadata.createdAt)}) <br className="md:hidden" />{" "}
          <span className="hidden md:inline">•</span> <PageViews path={slug} />
        </span>
        <ShareButton
          slug={
            metadata.shortSlug
              ? metadata.shortSlug
              : generateShortSlug(metadata.title)
          }
        />
      </div>
      <Post />
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await import(`@/content/${slug}.mdx`);

  return {
    metadataBase: new URL(baseURL),
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      url: new URL(`${baseURL}/blog/${slug}`),
      images: [
        {
          url: `/api/dynamic-og?title=${metadata.title}&description=${metadata.description}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
