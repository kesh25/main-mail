// chart component 
"use client"; 
import React from "react"; 

import AreaGraph from "./area";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import PieGraph from "./pie";
import BarHorizontal from "./bar-horizontal";
import BarGraph from "./bar"; 

interface ChartProps {
    type: "area" | "line" | "bar" | "pie" | "bar-horizontal",
    title: string; 
    headerComponent?: React.ReactNode; 
    height: string; 
    subtitle?: string; 
    data: any; 
    labels?: any; 
    labelString?: string; // pie
    chartConfig: any; 
    className?: string; 
    xAxis?: any;
    yAxis?: any; 
    bars?: any;
}


const Chart: React.FC<ChartProps> = ({
    type, title, subtitle, headerComponent, height, 
    data, labels, labelString, chartConfig, className,
    xAxis, yAxis, bars

}) => {
    const [mounted, setMounted] = React.useState<boolean>(false); 
    React.useEffect(() => setMounted(true), []); 

    if (!mounted) {
        return (
            <ChartActualContainer
                title={title}
                subtitle={subtitle}
                headerComponent={headerComponent}
            >
                <Skeleton className={cn("w-full", height)}/>

            </ChartActualContainer>
    )}

    return (
        <ChartActualContainer
            title={title}
            subtitle={subtitle}
            headerComponent={headerComponent}
            className={className}
        >
            {type === "area" && (
                <AreaGraph 
                    data={data}
                    chartConfig={chartConfig}
                    height={height}
                />
            )}
            {
                type === "pie" && (
                    <PieGraph 
                        label={labels}
                        labelString={labelString}
                        chartData={data}
                        chartConfig={chartConfig}
                        // height={height}
                    />
                )
             }
             {
                type === "bar-horizontal" && xAxis && yAxis && bars && (
                    <BarHorizontal 
                        chartConfig={chartConfig}
                        chartData={data}
                        xAxis={xAxis}
                        yAxis={yAxis}
                        bars={bars}
                        height={height}
                    />
                )
             }
             {
                type === "bar" && xAxis && bars && (
                    <BarGraph 
                        chartData={data}
                        chartConfig={chartConfig}
                        xAxis={xAxis}
                        bars={bars}
                        height={height}
                    />
                )
             }
            
        </ChartActualContainer>
    )
};

export default Chart;


const ChartActualContainer = ({
    title, subtitle, children, headerComponent, className
}:
{
    title: string; 
    subtitle?: string; 
    headerComponent?: React.ReactNode; 
    children: React.ReactNode; 
    className?: string
}) => (
    <Card className={cn("py-2 my-2", className)}>
            <CardHeader className="flex flex-col items-center justify-between w-full gap-2 space-y-0 border-b py-3 lg:flex-row">
                <div>
                    <CardTitle className="text-md lg:text-base">{title}</CardTitle>
                    {subtitle && <CardDescription>{subtitle}</CardDescription>}
                </div>
                {headerComponent && headerComponent}
            </CardHeader>
            <CardContent className="pt-4 sm:px-6 sm:pt-6">
                {children}
            </CardContent>
    </Card>
)