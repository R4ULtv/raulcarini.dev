"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  contributions: {
    label: "Contributions",
    color: "var(--chart-1)",
  },
  activeDays: {
    label: "Active Days",
    color: "var(--chart-2)",
  },
  blogViews: {
    label: "Blog Views",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

type ChartData = {
  year: string;
  contributions: number;
  activeDays: number;
  blogViews: number;
};

export function RecapChart({ data }: { data: ChartData[] }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <AreaChart accessibilityLayer data={data} margin={{ top: 18, left: 18 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <div className="text-muted-foreground flex gap-1.5 min-w-42 items-center text-xs">
                  <div
                    className="size-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                    style={
                      {
                        "--color-bg": `var(--color-${name})`,
                      } as React.CSSProperties
                    }
                  />
                  {chartConfig[name as keyof typeof chartConfig]?.label || name}
                  <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                    {value}
                  </div>
                </div>
              )}
            />
          }
        />
        <defs>
          <linearGradient
            id="gradient-rounded-chart-contributions"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="var(--color-contributions)"
              stopOpacity={0.5}
            />
            <stop
              offset="95%"
              stopColor="var(--color-contributions)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient
            id="gradient-rounded-chart-activeDays"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="var(--color-activeDays)"
              stopOpacity={0.5}
            />
            <stop
              offset="95%"
              stopColor="var(--color-activeDays)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient
            id="gradient-rounded-chart-blogViews"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="var(--color-blogViews)"
              stopOpacity={0.5}
            />
            <stop
              offset="95%"
              stopColor="var(--color-blogViews)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="activeDays"
          type="natural"
          fill="url(#gradient-rounded-chart-activeDays)"
          fillOpacity={0.4}
          stroke="var(--color-activeDays)"
          strokeWidth={0.8}
        />
        <Area
          dataKey="contributions"
          type="natural"
          fill="url(#gradient-rounded-chart-contributions)"
          fillOpacity={0.4}
          stroke="var(--color-contributions)"
          strokeWidth={0.8}
        />
        <Area
          dataKey="blogViews"
          type="natural"
          fill="url(#gradient-rounded-chart-blogViews)"
          fillOpacity={0.4}
          stroke="var(--color-blogViews)"
          strokeWidth={0.8}
        />
      </AreaChart>
    </ChartContainer>
  );
}
