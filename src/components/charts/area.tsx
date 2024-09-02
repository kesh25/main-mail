"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { cn } from "@/lib/utils";

const AreaGraph = ({
  data,
  chartConfig,
  height,
  labels
}: {
  data: any;
  chartConfig: any;
  height: string;
  labels: any
}) => {
  return (
    <ChartContainer
      config={chartConfig}
      className={cn("aspect-auto w-full", height)}
    >
      <AreaChart data={data}>
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              indicator="dot"
            />
          }
        />
        {
          labels.map((label: any, index: number) => (
             
              <Area
                dataKey={label.dataKey}
                type="natural"
                fill={label.fill}
                stroke={label.stroke}
                stackId="a"
                key={index}
              />

             
          ))
        }
        {/* <Area
          dataKey="mobile"
          type="natural"
          fill="url(#fillMobile)"
          stroke="var(--color-mobile)"
          stackId="a"
        />
        <Area
          dataKey="desktop"
          type="natural"
          fill="url(#fillDesktop)"
          stroke="var(--color-desktop)"
          stackId="a"
        /> */}
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};

export default AreaGraph;
 