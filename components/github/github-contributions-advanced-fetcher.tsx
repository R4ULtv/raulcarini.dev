"use client";

import * as React from "react";
import useSWR from "swr";
import GithubContributionsAdvanced from "@/components/github/github-contributions-advanced";
import { Contribution } from "@/components/github/github-contributions";
import { Grid3x3Icon, TriangleAlertIcon } from "lucide-react";
import { fetcher } from "@/lib/fetcher";

interface GithubContributionsResponse {
  total: {
    [year: string]: number; // e.g., 'lastYear'
  };
  contributions: Contribution[];
}

interface GithubRepo {
  id: number;
  name: string;
  created_at: string;
}

interface StatusDisplayProps {
  icon: React.ReactNode;
  message: string;
  additionalClasses?: string;
}

const now = Date.now();

const StatusDisplay: React.FC<StatusDisplayProps> = ({
  icon,
  message,
  additionalClasses,
}) => {
  return (
    <div
      className={`w-full max-w-[688px] min-h-[160px] border rounded-md flex flex-col items-center justify-center gap-1 ${
        additionalClasses || ""
      }`}
    >
      {icon}
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

const GithubContributionsAdvancedFetcher: React.FC<{ username: string }> = ({
  username,
}) => {
  const {
    data: contributionsResult,
    error: contributionsError,
    isLoading: isContributionsLoading,
  } = useSWR<GithubContributionsResponse>(
    username
      ? `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
      : null,
    fetcher,
    { revalidateOnFocus: false },
  );

  const {
    data: reposResult,
    error: reposError,
    isLoading: isReposLoading,
  } = useSWR<GithubRepo[]>(
    username
      ? `https://api.github.com/users/${username}/repos?sort=created`
      : null,
    fetcher,
    { revalidateOnFocus: false },
  );

  const loading = isContributionsLoading || isReposLoading;
  const error = contributionsError || reposError || null;
  const contributionsData: Contribution[] | null =
    contributionsResult?.contributions ?? null;
  const newPublicRepoCount: number | null = React.useMemo(() => {
    if (!reposResult) return null;
    const oneYearAgo = new Date(now - 365 * 24 * 60 * 60 * 1000);
    return reposResult.filter((repo) => new Date(repo.created_at) > oneYearAgo)
      .length;
  }, [reposResult]);

  if (loading) {
    return (
      <StatusDisplay
        icon={<Grid3x3Icon className="size-6 stroke-muted-foreground" />}
        message={`Loading advanced contribution data for ${username}...`}
        additionalClasses="motion-safe:animate-pulse"
      />
    );
  }

  if (error) {
    return (
      <StatusDisplay
        icon={<TriangleAlertIcon className="size-6 stroke-destructive" />}
        message={`Error: ${error.message}`}
      />
    );
  }

  if (contributionsData === null || newPublicRepoCount === null) {
    return (
      <StatusDisplay
        icon={<TriangleAlertIcon className="size-6 stroke-muted-foreground" />}
        message="Could not load contribution data."
      />
    );
  }

  return (
    <GithubContributionsAdvanced
      data={contributionsData}
      newPublicRepositories={newPublicRepoCount}
    />
  );
};

export default GithubContributionsAdvancedFetcher;
