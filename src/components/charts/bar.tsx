"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
 
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
 

const BarGraph = (
    {chartData, chartConfig, xAxis, bars, height}: 
    {
        chartData: any;
        chartConfig: any; 
        xAxis: {dataKey: string};
        bars: {dataKey: string, fill: string}[]; 
        height: string
    }
) => {
  return (
    
        <ChartContainer config={chartConfig} className={height}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            {/* <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            /> */}
             
            <XAxis
                dataKey={xAxis.dataKey}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                // tickFormatter={(value) => value?.slice(0, 3)}
            />

              
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {
                bars.map((bar, index) => (
                    <Bar dataKey={bar.dataKey} fill={bar.fill} radius={2} key={index}/>

                ))
            }
            {/* <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} /> */}
          </BarChart>
        </ChartContainer>
     
      
  )
}


export default BarGraph; 