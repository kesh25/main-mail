// storage graph 
"use client"
import React from "react"; 
import { SquareArrowOutUpRight } from "lucide-react"; 

import AppLinkButton from "@/components/common/app-link-button"; 
import Chart from "@/components/charts";
import {
    ChartConfig,
} from "@/components/ui/chart";

import { getBusinessStorage } from "@/lib/api-calls/storage";
import { useCustomEffect } from "@/hooks"; 
interface DomainStorageProps {
    domain: string; 
    title: string; 
    settings?: boolean; 
};

type DataType = {
    title: string;
    storage: number; 
    fill: string; 
}
const DomainStorage: React.FC<DomainStorageProps> =({
    domain, title, settings
}) => {
    const [mounted, setMounted] = React.useState<boolean>(false); 
    const [data, setData] = React.useState<DataType[]>([]); 
    const [total, setTotal] = React.useState<number>(0); 
    const [added, setAdded] = React.useState<number>(0); 
    const [used, setUsed] = React.useState<number>(0); 
    const [loading, setLoading] = React.useState<boolean>(false); 

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
    } satisfies ChartConfig;

    React.useEffect(() => setMounted(true), []);

    const fetchStorage = async () => {
        if (!mounted) return; 

        setLoading(true); 

        let res = await getBusinessStorage(domain); 

        if (res) {
            let {storage, addedStorage, used} = res; 
            setAdded(addedStorage); 
            setUsed(used); 

            let chartData: DataType[] = [
                {
                    title: "Used",
                    storage: used, 
                    fill: "#E76F4F"
                },
                {
                    title: "Free",
                    storage: (storage + addedStorage) - used,
                    fill: "#2B9C90"
                }
            ]; 

            setTotal(storage + addedStorage); 
            setData(chartData); 
        };

        setLoading(false); 
    }
    useCustomEffect(fetchStorage, [mounted]); 

    return (
        <Chart 
            labels={"Total Storage"}
            subtitle={`Added storage: ${added} GB, Used: ${used} GB`}
            labelString={`${total} GB`}
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
                                 
                                <AppLinkButton
                                    size="sm"
                                    type="secondary"
                                    href={`/domains/${domain}?d=${title}&tab=settings&sec=storage#upgrade`}
                                    className="gap-2"
                                >
                                    Upgrade <SquareArrowOutUpRight size={15}/>
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