"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

 
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const BarHorizontal = (
    {chartData, chartConfig, xAxis, yAxis, bars, height}: 
    {
        chartData: any;
        chartConfig: any; 
        xAxis: {type: "number", dataKey: string};
        yAxis: {type: "category", dataKey: string};
        bars: {dataKey: string, fill: string}[]; 
        height: string; 
    },

) => {
  return (
     
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            // layout="vertical"
            margin={{
              left: -20,
            }}
          >
            {/* <XAxis type={"number"} dataKey="desktop" hide /> */}
            <XAxis type={xAxis.type} dataKey={xAxis.dataKey} hide />
            {/* <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            /> */}
            <YAxis
              dataKey={yAxis.dataKey}
              type={yAxis.type}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
                    {/* <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} key={index}/> */}
            {
                bars.map((bar: any, index) => (
                    <Bar dataKey={bar.dataKey} fill={bar.fill} radius={2} key={index}/>

                ))
            }
          </BarChart>
        </ChartContainer>
       
  )
};

export default BarHorizontal; 
