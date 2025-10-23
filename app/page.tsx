import GitHubContributions from "@/components/github/github-contributions-advanced-fetcher";
import GithubRepositories from "@/components/github/github-repositories";
import { ImageViewer } from "@/components/image-viewer";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/content";
import Link from "next/link";

import Image from "next/image";

import dlynr from "@/app/assets/dlynr.png";
import job from "@/app/assets/job.jpg";
import lake from "@/app/assets/lake.png";
import mont from "@/app/assets/mont.png";
import mont2 from "@/app/assets/mont2.png";
import swag from "@/app/assets/swag.jpg";

import city from "@/app/assets/city.png";
import croatia from "@/app/assets/croatia.png";
import lake2 from "@/app/assets/lake2.png";

export default async function Home() {
  const posts = (await getAllPosts()).slice(0, 5);

  return (
    <div className="space-y-10 sm:space-y-16">
      <section id="about">
        <a
          href={"#about"}
          className="py-5 sm:py-4 block font-medium group after:content-['#'] after:ml-1 after:opacity-0 hover:after:opacity-90 after:transition-opacity after:duration-200 after:ease-out"
        >
          About
        </a>
        <p className="text-muted-foreground">
          Hi! I&apos;m a full-stack developer based in Milan, currently juggling
          projects and studies. On the professional side, I&apos;m diving into
          exciting ventures like{" "}
          <Badge
            asChild
            variant="secondary"
            className="h-[26px] px-1.5 rounded border border-border font-normal"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://ui.raulcarini.dev/"
            >
              <Image
                unoptimized
                width={16}
                height={16}
                alt="UI Components Icon"
                src="https://ui.raulcarini.dev/favicon.ico"
              />
              UI Components
            </a>
          </Badge>{" "}
          ,{" "}
          <Badge
            asChild
            variant="secondary"
            className="h-[26px] px-1.5 rounded border border-border font-normal"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://lazypr.vercel.app/"
            >
              <Image
                unoptimized
                width={16}
                height={16}
                alt="Lazypr Icon"
                src="https://lazypr.vercel.app/favicon.ico"
              />
              lazypr
            </a>
          </Badge>{" "}
          and{" "}
          <Badge
            asChild
            variant="secondary"
            className="h-[26px] px-1.5 rounded border border-border font-normal"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://learn-the-web.vercel.app"
            >
              <Image
                unoptimized
                width={16}
                height={16}
                alt="Learn The Web Icon"
                src="https://learn-the-web.vercel.app/favicon.ico"
              />
              Learn The Web
            </a>
          </Badge>{" "}
          a learning platform. Soon, more projects that I am building in secret
          will arrive.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-3">
          <ImageViewer
            src={mont2}
            width={320}
            alt="Alps, Italy"
            placeholder="blur"
          />
          <ImageViewer
            src={dlynr}
            width={320}
            alt="Raul Carini"
            placeholder="blur"
            className="sm:row-span-2 row-span-1"
            objectFit="cover"
          />
          <ImageViewer
            src={mont}
            width={320}
            alt="Alps, Italy"
            placeholder="blur"
          />
          <ImageViewer
            src={swag}
            width={320}
            alt="Raul Carini"
            placeholder="blur"
            className="row-span-2 col-span-1"
          />
          <ImageViewer
            src={job}
            width={320}
            alt="Work outside, Alps, Italy"
            placeholder="blur"
            className="row-span-2 col-span-1"
          />
          <ImageViewer
            src={lake}
            width={320}
            alt="Lake Alps, Italy"
            placeholder="blur"
          />
        </div>

        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          My true passion lies in crafting websites that solve problems. But
          there&apos;s more to me than code! When I&apos;m not developing, music
          takes center stage. I love producing tracks and experimenting with
          fresh sounds. If you are interested in my music check out on my{" "}
          <Badge
            asChild
            variant="secondary"
            className="h-[26px] px-1.5 rounded border border-border font-normal"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://open.spotify.com/artist/21DbatkhkYpxIpLfQ4LeUo"
            >
              <Image
                unoptimized
                width={16}
                height={16}
                alt="Spotify Icon"
                src="https://open.spotify.com/favicon.ico"
              />
              Spotify
            </a>
          </Badge>{" "}
          profile.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
          <ImageViewer
            src={city}
            width={320}
            alt="Lake Garda, Italy"
            placeholder="blur"
          />
          <ImageViewer
            src={lake2}
            width={320}
            alt="Lake view"
            placeholder="blur"
          />
          <ImageViewer
            src={croatia}
            width={640}
            alt="Croatia"
            placeholder="blur"
            className="col-span-2 sm:col-span-1"
          />
        </div>
      </section>

      <section id="blog">
        <a
          href={"#blog"}
          className="py-5 sm:py-4 block font-medium group after:content-['#'] after:ml-1 after:opacity-0 hover:after:opacity-90 after:transition-opacity after:duration-200 after:ease-out"
        >
          Blog
        </a>
        <div className="flex flex-col gap-6 md:gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex justify-between items-center gap-4 py-1 sm:py-3 px-3 -mx-3 group rounded-md hover:bg-muted/50 transition-colors duration-200 ease-out"
            >
              <div className="flex-1 flex flex-col">
                <p className="font-medium">
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
                </p>
                <span className="text-muted-foreground">
                  {post.metadata.description}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-start mt-4">
          <Link
            href="/blog"
            className="py-1 text-sm text-muted-foreground hover:underline"
          >
            Load more blog posts...
          </Link>
        </div>
      </section>
      <section id="contributions">
        <a
          href={"#contributions"}
          className="py-5 sm:py-4 block font-medium group after:content-['#'] after:ml-1 after:opacity-0 hover:after:opacity-90 after:transition-opacity after:duration-200 after:ease-out"
        >
          Github Contributions
        </a>
        <GitHubContributions username="r4ultv" />
      </section>
      <section id="repositories">
        <a
          href={"#repositories"}
          className="py-5 sm:py-4 block font-medium group after:content-['#'] after:ml-1 after:opacity-0 hover:after:opacity-90 after:transition-opacity after:duration-200 after:ease-out"
        >
          Public Repositories
        </a>
        <GithubRepositories username="r4ultv" limit={6} />
        <div className="flex items-center justify-start mt-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/R4ULtv?tab=repositories"
            className="py-1 text-sm text-muted-foreground hover:underline"
          >
            More repositories...
          </a>
        </div>
      </section>
      <section id="contact">
        <a
          href={"#contact"}
          className="py-5 sm:py-4 block font-medium group after:content-['#'] after:ml-1 after:opacity-0 hover:after:opacity-90 after:transition-opacity after:duration-200 after:ease-out"
        >
          Contact
        </a>
        <p className="text-muted-foreground">
          Want to get in touch? Email me at{" "}
          <a
            href="mailto:contact@raulcarini.dev"
            className="hover:underline text-foreground"
          >
            contact@raulcarini.dev
          </a>
          .
        </p>
      </section>
    </div>
  );
}
