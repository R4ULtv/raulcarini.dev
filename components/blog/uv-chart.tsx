"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
      <CardContent className="px-6">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart accessibilityLayer layout="vertical" data={chartData}>
            <CartesianGrid horizontal={false} />
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
                <ChartTooltipContent className="min-w-48" indicator="line" />
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
          uv is up to 5/15x faster than alternatives{" "}
          <TrendingUpIcon className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Benchmarked on cold and warm cache scenarios
        </div>
      </CardFooter>
    </Card>
  );
}
