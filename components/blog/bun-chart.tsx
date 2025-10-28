"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUpIcon } from "lucide-react";

const chartData = [
  {
    tool: "bun",
    installTime: 0.2256,
  },
  {
    tool: "pnpm",
    installTime: 2.335,
  },
  {
    tool: "yarn",
    installTime: 4.356,
  },
  {
    tool: "npm",
    installTime: 5.653,
  },
];

const chartConfig = {
  installTime: {
    label: "Installation Time",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function BlogBunChart() {
  return (
    <Card className="mt-6 rounded-md">
      <CardHeader>
        <CardTitle>Package Manager Install Speed Comparison</CardTitle>
        <CardDescription>
          Mean installation times (lower is faster)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
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
            <Bar
              dataKey="installTime"
              fill="var(--color-installTime)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          bun install --backend=hardlink is up to 25× faster than npm{" "}
          <TrendingUpIcon className="size-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Based on 10-run averages (hyperfine benchmark)
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
