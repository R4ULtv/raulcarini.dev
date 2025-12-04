import type { Metadata } from "next";
import Link from "next/link";
import recapData from "./data.json";
import { RecapChart } from "./recap-chart";

export const metadata: Metadata = {
  title: "Recap",
  description:
    "A recap of my achievements, projects, and contributions over the years.",
};

interface YearData {
  activity: {
    activeDays: number;
  };
  coding: {
    totalContributions: number;
  };
  content: {
    blogViews: number;
  };
  projects: {
    totalPageViews: number;
  };
}

export default function RecapPage() {
  const years = Object.keys(recapData.years).sort();

  const chartData = years.map((year) => {
    const yearData = recapData.years[
      year as keyof typeof recapData.years
    ] as YearData;
    return {
      year,
      contributions: yearData.coding.totalContributions,
      activeDays: yearData.activity.activeDays,
      pageViews: yearData.projects.totalPageViews,
      blogViews: yearData.content.blogViews,
    };
  });

  return (
    <div className="fixed inset-0 z-10 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center overflow-y-auto py-12">
      <div className="text-xs text-muted-foreground pb-8">
        <span className="hover:text-foreground transition-colors cursor-default">
          [ ALL TIME RECAP ]
        </span>
      </div>

      <div className="max-w-lg w-full px-4">
        <RecapChart data={chartData} />
      </div>

      <div className="pt-8 flex items-center gap-2 text-xs text-muted-foreground flex-wrap justify-center px-4">
        {years.map((year) => (
          <Link
            key={year}
            href={`/recap/${year}`}
            className="hover:text-foreground transition-colors w-fit"
          >
            [ {year} ]
          </Link>
        ))}
        <Link
          href="/"
          className="hover:text-foreground transition-colors w-fit"
        >
          [ HOME ]
        </Link>
      </div>
    </div>
  );
}
