import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import Projects from "@/components/svg/artworks/projects";
import { ExternalLinkIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of projects I've built, ranging from web applications to learning platforms and developer tools.",
};

interface Project {
  title: string;
  description: string;
  url: string;
  icon?: string;
  tags?: string[];
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Learn The Web",
    description:
      "An interactive learning platform for web development fundamentals and modern practices.",
    url: "https://learn-the-web.vercel.app",
    icon: "https://learn-the-web.vercel.app/favicon.ico",
    tags: ["Education", "Next.js", "MDX"],
    featured: true,
  },
  {
    title: "UI Components",
    description:
      "A collection of reusable UI components built with React and Tailwind CSS.",
    url: "https://ui.raulcarini.dev/",
    icon: "https://ui.raulcarini.dev/favicon.ico",
    tags: ["React", "Tailwind CSS", "Components"],
    featured: true,
  },
  {
    title: "lazypr",
    description:
      "The lazy way to write pull requests. AI-powered CLI tool for streamlined PR creation.",
    url: "https://lazypr.vercel.app/",
    icon: "https://lazypr.vercel.app/favicon.ico",
    tags: ["CLI", "AI", "GitHub API"],
    featured: true,
  },
  {
    title: "Archive Space",
    description:
      "A personal digital archive for storing and organizing memories, thoughts, and collections.",
    url: "https://archive.raulcarini.dev/",
    icon: "https://archive.raulcarini.dev/favicon.ico",
    tags: ["Next.js", "Cloudflare R2", "Archive"],
    featured: true,
  },
  {
    title: "Multi-Region R2 Bucket System",
    description:
      "A multi-region system with Cloudflare Worker and Cloudflare R2 Buckets.",
    url: "https://github.com/R4ULtv/multi-region-r2-bucket-system",
    icon: "https://github.com/favicon.ico",
    tags: ["Cloudflare", "Multi-Region", "Workers"],
  },
  {
    title: "Tailwind Color Palette",
    description:
      "Tailwind CSS colors in HSL, RGB, HEX, and OKLCH formats with easy copy functionality.",
    url: "https://colors.raulcarini.dev",
    icon: "https://colors.raulcarini.dev/favicon.ico",
    tags: ["Tailwind CSS", "Colors", "Tool"],
  },
  {
    title: "AI Models Database",
    description:
      "An open-source database of AI models with detailed information and specifications.",
    url: "https://models.raulcarini.dev",
    icon: "https://models.raulcarini.dev/favicon.ico",
    tags: ["Database", "AI", "Next.js"],
  },
  {
    title: "Text Editor",
    description:
      "Create blogging content with ease. Markdown editor with built-in AI capabilities.",
    url: "https://editor.raulcarini.dev",
    icon: "https://editor.raulcarini.dev/favicon.ico",
    tags: ["Markdown", "AI", "Next.js"],
  },
  {
    title: "LLMs Speed Test",
    description:
      "Benchmark your LLMs in seconds. Test and compare language model performance.",
    url: "https://snappy.raulcarini.dev",
    icon: "https://snappy.raulcarini.dev/favicon.ico",
    tags: ["LLMs", "Benchmark", "Ollama"],
  },
  {
    title: "Shadcn Registry",
    description:
      "Cloudflare Worker registry for shadcn/ui components with usage stats.",
    url: "https://github.com/R4ULtv/shadcn-registry",
    icon: "https://github.com/favicon.ico",
    tags: ["Shadcn", "Registry", "Cloudflare"],
  },
  {
    title: "Spotify Web Player",
    description:
      "Listen to your music anytime, anywhere. Custom Spotify web player interface.",
    url: "https://web-player.raulcarini.dev",
    icon: "https://web-player.raulcarini.dev/favicon.ico",
    tags: ["Spotify", "Music", "Web Player"],
  },
];

function isGithubHost(iconUrl: string): boolean {
  try {
    const url = new URL(iconUrl);
    return url.hostname === "github.com";
  } catch {
    return false;
  }
}

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="space-y-10 sm:space-y-16">
      <div className="relative mb-10 md:mb-16 md:-mx-8 overflow-hidden">
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
              Projects
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>
          <div className="flex items-start gap-3">
            <Projects className="fill-muted-foreground hover:fill-foreground transition-colors duration-300 ease-out size-auto hidden md:block" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                Things I&apos;ve Built
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                From component libraries to developer tools, these are the
                projects I&apos;ve shipped.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section id="projects">
        {featuredProjects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-muted-foreground mb-4">
              Featured
            </h2>
            <div className="flex flex-col gap-4">
              {featuredProjects.map((project) => (
                <a
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 py-3 px-3 -mx-3 group rounded-md hover:bg-muted/50 transition-colors duration-200 ease-out"
                >
                  {project.icon && (
                    <div className="flex-shrink-0 mt-1">
                      <Image
                        unoptimized
                        width={20}
                        height={20}
                        alt={`${project.title} Icon`}
                        src={project.icon}
                        className={cn(
                          "rounded",
                          isGithubHost(project.icon) && "dark:invert",
                        )}
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col min-w-0">
                    <p className="font-medium">{project.title}</p>
                    <span className="text-muted-foreground text-sm">
                      {project.description}
                    </span>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs h-5 px-1.5 rounded border border-border"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <ExternalLinkIcon className="flex-shrink-0 w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors mt-1" />
                </a>
              ))}
            </div>
          </div>
        )}

        {otherProjects.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-4">
              Other Projects
            </h2>
            <div className="flex flex-col gap-4">
              {otherProjects.map((project) => (
                <a
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 py-3 px-3 -mx-3 group rounded-md hover:bg-muted/50 transition-colors duration-200 ease-out"
                >
                  {project.icon && (
                    <div className="flex-shrink-0 mt-1">
                      <Image
                        unoptimized
                        width={20}
                        height={20}
                        alt={`${project.title} Icon`}
                        src={project.icon}
                        className={cn(
                          "rounded",
                          isGithubHost(project.icon) && "dark:invert",
                        )}
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col min-w-0">
                    <p className="font-medium">{project.title}</p>
                    <span className="text-muted-foreground text-sm">
                      {project.description}
                    </span>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs h-5 px-1.5 rounded border border-border"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <ExternalLinkIcon className="flex-shrink-0 w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors mt-1" />
                </a>
              ))}
            </div>
          </div>
        )}

        {projects.length === 0 && (
          <p className="text-muted-foreground text-center py-8">
            No projects yet. Check back soon!
          </p>
        )}
      </section>

      <section id="contact">
        <a
          href={"#contact"}
          className="py-5 sm:py-4 block font-medium group after:content-['#'] after:ml-1 after:opacity-0 hover:after:opacity-90 after:transition-opacity after:duration-200 after:ease-out"
        >
          Work Together
        </a>
        <p className="text-muted-foreground">
          Interested in collaborating on a project? Feel free to reach out at{" "}
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
