"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUpIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export const description =
  "A vertical bar chart comparing package manager speeds";

const chartData = [
  {
    tool: "uv",
    coldInstall: 1.2,
    warmInstall: 0.06,
    coldResolution: 0.4,
    warmResolution: 0.02,
  },
  {
    tool: "poetry",
    coldInstall: 2.5,
    warmInstall: 0.99,
    coldResolution: 3.5,
    warmResolution: 0.6,
  },
  {
    tool: "pdm",
    coldInstall: 2.1,
    warmInstall: 1.9,
    coldResolution: 3.2,
    warmResolution: 2.0,
  },
  {
    tool: "pip",
    coldInstall: 7.3,
    warmInstall: 4.63,
    coldResolution: 3.9,
    warmResolution: 1.45,
  },
];

const chartConfig = {
  coldInstall: {
    label: "Cold Install",
    color: "var(--chart-5)",
  },
  warmInstall: {
    label: "Warm Install",
    color: "var(--chart-3)",
  },
  coldResolution: {
    label: "Cold Resolution",
    color: "var(--chart-1)",
  },
  warmResolution: {
    label: "Warm Resolution",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function BlogUvChart() {
  return (
    <Card className="mt-6 rounded-md">
      <CardHeader>
        <CardTitle>Package Manager Performance Comparison</CardTitle>
        <CardDescription>
          Installation and resolution speeds (in seconds)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart accessibilityLayer layout="vertical" data={chartData}>
            <rect
              x="60"
              y="0"
              width="95%"
              height="85%"
              fill="url(#default-multiple-pattern-dots)"
            />
            <defs>
              <DottedBackgroundPattern />
            </defs>
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}s`}
            />
            <YAxis
              dataKey="tool"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
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
                      {chartConfig[name as keyof typeof chartConfig]?.label ||
                        name}
                      <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                        {value}
                        <span className="text-muted-foreground font-normal">
                          s
                        </span>
                      </div>
                    </div>
                  )}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="coldInstall"
              fill="var(--color-coldInstall)"
              radius={4}
              barSize={14}
            />
            <Bar
              dataKey="warmInstall"
              fill="var(--color-warmInstall)"
              radius={4}
              barSize={14}
            />
            <Bar
              dataKey="coldResolution"
              fill="var(--color-coldResolution)"
              radius={4}
              barSize={14}
            />
            <Bar
              dataKey="warmResolution"
              fill="var(--color-warmResolution)"
              radius={4}
              barSize={14}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          uv is up to 5-15x faster than alternatives{" "}
          <TrendingUpIcon className="size-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Benchmarked on cold and warm cache scenarios
        </div>
      </CardFooter>
    </Card>
  );
}

const DottedBackgroundPattern = () => {
  return (
    <pattern
      id="default-multiple-pattern-dots"
      x="0"
      y="0"
      width="10"
      height="10"
      patternUnits="userSpaceOnUse"
    >
      <circle
        className="dark:text-muted/40 text-muted"
        cx="2"
        cy="2"
        r="1"
        fill="currentColor"
      />
    </pattern>
  );
};
