"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/format";

const chartConfig = {
  revenue: {
    label: "revenue",
    color: "#2563eb",
  },
} satisfies ChartConfig;

interface DashboardChartProps {
  data: { month: string; revenue: number }[];
}

export function DashboardChart({ data }: DashboardChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] @container/card @xl:col-span-2"
    >
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />

        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) => formatCurrency(value as number)}
            />
          }
        />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
