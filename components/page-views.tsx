"use client";

import * as React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

interface PageViewsProps {
  path: string;
}

const PageViews = React.memo(({ path }: PageViewsProps) => {
  const {
    data: views,
    error,
    isLoading,
    mutate,
  } = useSWR<number | null>(`/api/views/${path}`, fetcher, {
    revalidateOnFocus: false,
  });

  const hasPostedRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    // Handle both 0 and null (non-existent key) cases
    if (views !== undefined && !isLoading && hasPostedRef.current !== path) {
      hasPostedRef.current = path;

      const currentCount = typeof views === "number" ? views : 0;

      // Optimistically increment the view count in the UI
      mutate(currentCount + 1, { revalidate: false });

      // Record the view in the background
      fetch(`/api/views/${path}`, { method: "POST" }).catch((err) => {
        console.error("Failed to record view (non-blocking):", err);
      });
    }
  }, [views, isLoading, path, mutate]);

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

  if (error) {
    return null;
  }

  const viewCount = typeof views === "number" ? views : 0;
  const formattedViews = formatViews(viewCount);

  return (
    <span className="text-sm" aria-label={`${viewCount} views`} role="status">
      {formattedViews} views
    </span>
  );
});

PageViews.displayName = "PageViews";

export default PageViews;
