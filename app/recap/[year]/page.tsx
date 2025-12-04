import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import recapData from "../data.json";

type YearData = {
  activity: {
    activeDays: number;
    mostActiveMonth: string;
    mostActiveDay: string;
  };
  coding: {
    topLanguage: string;
    totalContributions: number;
    newRepositories: number;
    starsReceived: number;
  };
  content: {
    newBlogPosts: number;
    blogViews: number;
  };
  projects: {
    activeWebsites: number;
    totalPageViews: number;
  };
  revenue: {
    totalEarnings: number;
  };
};

export async function generateStaticParams() {
  return Object.keys(recapData.years).map((year) => ({
    year: year,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;

  if (!recapData.years[year as keyof typeof recapData.years]) {
    return {
      title: "Year Not Found",
    };
  }

  return {
    title: `${year} Recap`,
    description: `A recap of my ${year} achievements, projects, and contributions.`,
  };
}

export default async function RecapPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const yearData = recapData.years[year as keyof typeof recapData.years] as
    | YearData
    | undefined;

  if (!yearData) {
    notFound();
  }

  const stats = [
    {
      category: "Activity",
      items: [
        { label: "Active Days", value: yearData.activity.activeDays },
        {
          label: "Most Active Month",
          value: yearData.activity.mostActiveMonth,
        },
        { label: "Most Active Day", value: yearData.activity.mostActiveDay },
      ],
    },
    {
      category: "Coding",
      items: [
        { label: "Top Language", value: yearData.coding.topLanguage },
        {
          label: "Total Contributions",
          value: yearData.coding.totalContributions.toLocaleString(),
        },
        { label: "New Repositories", value: yearData.coding.newRepositories },
        { label: "Stars Received", value: yearData.coding.starsReceived },
      ],
    },
    {
      category: "Content",
      items: [
        { label: "New Blog Posts", value: yearData.content.newBlogPosts },
        {
          label: "Blog Views",
          value: yearData.content.blogViews.toLocaleString(),
        },
      ],
    },
    {
      category: "Projects",
      items: [
        { label: "Active Websites", value: yearData.projects.activeWebsites },
        {
          label: "Total Page Views",
          value: yearData.projects.totalPageViews.toLocaleString(),
        },
      ],
    },
    {
      category: "Revenue",
      items: [
        {
          label: "Total Earnings",
          value: `$${yearData.revenue.totalEarnings.toLocaleString()}`,
        },
      ],
    },
  ];

  const nextYear = String(Number(year) + 1);
  const previousYear = String(Number(year) - 1);
  const hasNextYear = recapData.years[nextYear as keyof typeof recapData.years];
  const hasPreviousYear =
    recapData.years[previousYear as keyof typeof recapData.years];

  return (
    <div className="fixed inset-0 z-10 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center">
      <div className="text-xs text-muted-foreground pb-12">
        <span className="hover:text-foreground transition-colors cursor-default">
          [ {year} RECAP ]
        </span>
      </div>
      <div className="space-y-2 text-sm md:text-base tracking-wider max-w-sm w-full">
        {stats.map((section, sectionIndex) => (
          <div key={section.category}>
            {section.items.map((item) => (
              <div
                key={`${section.category}-${item.label}`}
                className="flex justify-between items-center group cursor-default py-1"
              >
                <span className="text-muted-foreground/75 font-mono uppercase group-hover:text-foreground transition-colors">
                  {item.label}:
                </span>
                <span>{item.value}</span>
              </div>
            ))}
            {sectionIndex < stats.length - 1 && (
              <div className="border-t border-border my-4" />
            )}
          </div>
        ))}
      </div>
      <div className="pt-12 flex items-center gap-2 text-xs text-muted-foreground">
        {hasPreviousYear && (
          <Link
            href={`/recap/${previousYear}`}
            className="hover:text-foreground transition-colors w-fit"
          >
            [ {previousYear} ]
          </Link>
        )}
        <Link
          href="/"
          className="hover:text-foreground transition-colors w-fit"
        >
          [ HOME ]
        </Link>
        {hasNextYear && (
          <Link
            href={`/recap/${nextYear}`}
            className="hover:text-foreground transition-colors w-fit"
          >
            [ {nextYear} ]
          </Link>
        )}
      </div>
    </div>
  );
}
