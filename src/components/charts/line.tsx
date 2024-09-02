"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const LineGraph = (
    {chartData, chartConfig, xAxis, lines, height}:
    {
        chartData: any;
        chartConfig: any; 
        xAxis: {dataKey: string};
        lines: {dataKey: string, fill: string}[]; 
        height: string
    }
) => {
    
    return (
        <ChartContainer
          config={chartConfig}
          className={cn("aspect-auto h-[250px] w-full", height)}
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxis.dataKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="date"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            {
                lines.map((line: any, index) => (
                    <Line
                        dataKey={line.dataKey}
                        type="monotone"
                        stroke={line.fill}
                        strokeWidth={2}
                        dot={false}
                        key={index}
                    />
                ))
            }
            {/* <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            /> */}
          </LineChart>
        </ChartContainer>
    )
}

export default LineGraph; 