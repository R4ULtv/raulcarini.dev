"use client";

import { fetcher } from "@/lib/fetcher";
import * as React from "react";
import useSWR from "swr";

interface GithubRepository {
  id: number;
  name: string;
  description: string;
  created_at: string;
  html_url: string;
  fork: boolean;
  language: string;
  stargazers_count: number;
  forks_count: number;
}

// GitHub language colors mapping
const languageColors: Record<string, string> = {
  JavaScript: "oklch(0.8961 0.1527 102.08)",
  TypeScript: "oklch(0.5671 0.1399 253.3)",
  Python: "oklch(0.5354 0.1022 246.5)",
  Shell: "oklch(0.8229 0.1959 135.27)",
  MDX: "oklch(0.8158 0.1597 76.85)",
};

const GithubRepositories = ({
  username,
  limit = 5,
}: {
  username: string;
  limit?: number;
}) => {
  const { data, error, isLoading } = useSWR<GithubRepository[]>(
    username
      ? `https://api.github.com/users/${username}/repos?sort=created`
      : null,
    fetcher,
    { revalidateOnFocus: false },
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 md:gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center gap-4 py-1 sm:py-3 px-3 -mx-3 rounded-md"
          >
            <div className="flex-1 flex gap-1.5">
              <div className="relative flex h-2 w-2 mt-2">
                <div className="h-2 w-2 rounded-full bg-muted-foreground/50 motion-safe:animate-pulse" />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="h-5 w-32 bg-muted-foreground/50 rounded-sm motion-safe:animate-pulse" />
                <div className="h-5 w-full max-w-96 mt-1 bg-muted-foreground/50 rounded-sm motion-safe:animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-zinc-600 dark:text-zinc-400">
          Failed to load repositories.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-4">
      {data &&
        data
          .filter((repo) => !repo.fork)
          .slice(0, limit - 1)
          .map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-start gap-3 py-1 sm:py-3 px-3 -mx-3 group rounded-md hover:bg-muted/50 transition-colors duration-200 ease-out"
            >
              <div className="relative flex h-2 w-2 mt-2">
                <span
                  className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{
                    backgroundColor: languageColors[repo.language] || "#8b949e",
                  }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2 opacity-90"
                  style={{
                    backgroundColor: languageColors[repo.language] || "#8b949e",
                  }}
                />
              </div>
              <div className="flex-1 flex flex-col">
                <p className="font-medium">
                  {repo.name}{" "}
                  <span className="font-normal">
                    •{" "}
                    {new Date(repo.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </p>
                {repo.description && (
                  <span className="text-muted-foreground">
                    {repo.description}
                  </span>
                )}
              </div>
            </a>
          ))}
    </div>
  );
};

export default GithubRepositories;
