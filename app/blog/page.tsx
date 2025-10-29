import BookReading from "@/components/svg/artworks/book-reading";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/content";
import { SparklesIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on software development, web technologies, and building projects.",
};

export default async function Home() {
  const posts = await getAllPosts();

  const isNewPost = (createdAt: string) => {
    const postDate = new Date(createdAt);
    const now = new Date();
    const diffInMs = now.getTime() - postDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays <= 7;
  };

  return (
    <div className="space-y-10 sm:space-y-16">
      <section className="relative md:-mx-8 overflow-hidden">
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-primary/20 to-transparent" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
              Blog
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-primary/20 to-transparent" />
          </div>
          <div className="flex items-start gap-3">
            <BookReading className="fill-muted-foreground hover:fill-foreground transition-colors duration-300 ease-out size-auto hidden md:block" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                Thoughts & Ideas
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Insights on software development, web technologies, and building
                meaningful projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="blog">
        <div className="flex flex-col gap-6 md:gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex justify-between items-center gap-4 py-1 sm:py-3 px-3 -mx-3 group rounded-md hover:bg-muted/50 transition-colors duration-200 ease-out"
            >
              <div className="flex-1 flex flex-col">
                <p className="font-medium space-x-1.5">
                  {post.metadata.title}{" "}
                  <span className="font-normal">
                    •{" "}
                    {new Date(post.metadata.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </span>
                  {isNewPost(post.metadata.createdAt) && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-500 text-white dark:bg-blue-600 rounded-sm"
                    >
                      <SparklesIcon />
                      New
                    </Badge>
                  )}
                </p>
                <span className="text-muted-foreground">
                  {post.metadata.description}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
