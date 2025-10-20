"use client";

import * as React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

interface PageViewsProps {
  path: string;
}

const PageViews = React.memo(({ path }: PageViewsProps) => {
  const { data: views, error, isLoading, mutate } = useSWR<number>(
    `/api/views/${path}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  const hasPostedRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (typeof views === "number" && hasPostedRef.current !== path) {
      hasPostedRef.current = path;

      // Optimistically increment the view count in the UI
      mutate(
        (current) => (typeof current === "number" ? current + 1 : views + 1),
        { revalidate: false }
      );

      // Record the view in the background
      fetch(`/api/views/${path}`, { method: "POST" })
        .catch((err) => {
          console.error("Failed to record view (non-blocking):", err);
        });
    }
  }, [views, path, mutate]);

  const formatViews = React.useCallback((count: number): string => {
    if (count >= 1_000) {
      return `${(count / 1_000).toFixed(1)}K`;
    }
    return count.toString();
  }, []);

  if (isLoading) {
    return (
      <span className="text-sm animate-pulse" role="status" aria-live="polite">
        0 views
      </span>
    );
  }

  if (error || typeof views !== "number") {
    return null;
  }

  const formattedViews = formatViews(views);

  return (
    <span className="text-sm" aria-label={`${views} views`} role="status">
      {formattedViews} views
    </span>
  );
});

PageViews.displayName = "PageViews";

export default PageViews;
