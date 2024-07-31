// storage graph 
"use client"
import { SquareArrowOutUpRight, TrendingUp } from "lucide-react"; 

import AppLinkButton from "@/components/common/app-link-button"; 
import { Button } from "@/components/ui/button"; 
import Chart from "@/components/charts";
import {
    ChartConfig,
} from "@/components/ui/chart";

interface DomainStorageProps {
    data: {
        title: string;
        storage: number; 
        fill: string; 
    }[];
    domain?: string; 
    title: string; 
    settings?: boolean; 
};

const DomainStorage: React.FC<DomainStorageProps> =({
    data, domain, title, settings
}) => {

    const chartConfig = {
        visitors: {
            label: "Storage"
        },
        used: {
            label: "Used",
            color: "hsl(var(--chart-1))"
        },
        free: {
            label: "Free",
            color: "hsl(var(--chart-2))"
        }
    } satisfies ChartConfig

    return (
        <Chart 
            labels={"Total Storage"}
            labelString="500 GB"
            data={data}
            chartConfig={chartConfig}
            title="Domain Storage"
            height="h-[20vh]"
            type="pie"
            className="w-[30%] my-0"
            headerComponent={
                <>
                    {
                        !settings && domain && (
                            <div className="flex gap-2">
                                <Button size="sm" className="gap-2 items-center" variant="secondary">
                                    Upgrade <TrendingUp size={17}/>
                                </Button>
                                <AppLinkButton
                                    size="sm"
                                    type="default"
                                    href={`/domains/${domain}?d=${title}&tab=settings&sec=storage`}
                                >
                                    <SquareArrowOutUpRight size={18}/>
                                </AppLinkButton>
                            </div>
                        )
                    }
                </>
            }
        />
    )
};

export default DomainStorage; 