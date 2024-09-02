// storage in settings
"use client"; 
import React from "react"; 

import {
    ChartConfig,
} from "@/components/ui/chart"

import AppInput from "@/components/common/app-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Chart from "@/components/charts";
import { Heading2, Heading3, Paragraph } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import SettingsContainer from "./settings-container"; 
import DomainStorage from "../storage"; 
import StorageUserTable from "@/components/data-tables/storage-users";

import {StorageUserTableType} from "@/types";
import {useCustomEffect, useSearch} from "@/hooks";
import { getBusinessFileDistribution, getBusinessUsersStorage, upgradeBusinessStorage } from "@/lib/api-calls/storage"
import { createToast } from "@/utils/toast";
import { numberWithCommas } from "@/utils/format-numbers";

type DataType = {
    type: string; 
    total: number; 
}

const chartConfig = {
    total: {
        label: "Total",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

const Storage = ({domain}: {domain: string}) => {
    const [mounted, setMounted] = React.useState<boolean>(false); 
    const [data, setData] = React.useState<DataType[]>([]); 
    const [total, setTotal] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false); 

    React.useEffect(() => setMounted(true), []); 

    const fetchFileDistribution = async () => {
        if (!mounted) return; 

        setLoading(true); 

        let res = await getBusinessFileDistribution(domain); 

        if (res) {
            let {docs} = res; 

            const keys = [
                "Audio",
                "Documents",
                "PDFs", 
                "Images",
                "Excel", 
                "CSV",
                "Zip",
                "Others",
                "Folders",
            ]; 

            const chartData = keys.map(key => {
                let type = key; 

                let doc_val = key === "Documents" || "PDFs" || "Images" || "Others" || "Folders" ?
                    key.slice(0, key.length - 1): 
                    key;
                
                doc_val = doc_val === "PDF" || "CSV" ? doc_val: doc_val.toLowerCase(); 
                let total = docs[doc_val] || 0; 
                return {
                    type, 
                    total
                }
            })
            setData(chartData)
        };

        setLoading(false)
    }; 

    useCustomEffect(fetchFileDistribution, [mounted]); 


    return (
        <SettingsContainer
            title="Storage"
            subtitle={"Storage analysis for all users in the domain."}
        >
            <div className="flex gap-2 flex-col lg:flex-row my-3">
                <DomainStorage 
                    title="Storage"
                    settings={true}
                    domain={domain}
                />
                <Chart 
                    className="flex-1 my-0"
                    title="File Overview"
                    type="bar"
                    height="h-[23vh] w-full"
                    data={data}
                    chartConfig={chartConfig}
                    xAxis={{dataKey: "type"}}
                    bars={[{dataKey: "total", fill: "#2763D7"}]}
                />
            </div>
            <div className="flex gap-2 flex-col lg:flex-row pb-5">
                <StorageUsers domain={domain}/>
                <StorageUpgrade domain={domain}/>
            </div>

        </SettingsContainer>
    )
};

export default Storage; 


const StorageUsers = ({domain}: {domain: string}) => {
    const [storage, setStorage] = React.useState<StorageUserTableType[]>([]);
    const [count, setCount] = React.useState<number>(0); 
    const [loading, setLoading] = React.useState<boolean>(false); 
    const [mounted, setMounted] = React.useState<boolean>(false); 

    const searchParams = useSearch(); 
    const page = searchParams?.get("page") || "0";

    React.useEffect(() => setMounted(true), []); 

    const fetchUsersStorage = async () => {
        if (!mounted) return; 

        setLoading(true); 

        let res = await getBusinessUsersStorage(domain, page); 

        if (res) {
            setCount(res.count);
            setStorage(res.docs); 
        };

        setLoading(false); 
    }

    useCustomEffect(fetchUsersStorage, [mounted, page])

    return (
        <Card className="px-6 py-3 lg:min-w-[60%]">
            <Heading2 className="text-md lg:text-base">User&apos;s storage</Heading2>
            <Paragraph className="text-sm lg:text-md text-gray-500">Storage for the domain users</Paragraph>
            <Separator className="my-3"/>
            {
                loading ? (
                    <div className="flex items-center justify-center w-full h-[20vh]">
                        <Heading3 className="text-xs lg:text-sm">Loading...</Heading3>
                    </div>
                ): (
                    <StorageUserTable data={storage}/>
                )
            }
        </Card>
    )
}; 

const StorageUpgrade = ({domain}: {domain: string}) => {
    const [size, setSize] = React.useState<number>(0); 

    const [loading, setLoading] = React.useState<boolean>(false); 

    const handleUpgradeStorage = async () => {
        if (!size) {
            createToast("error", "Size cannot be 0"); 
            return
        };
        setLoading(true); 

        let res = await upgradeBusinessStorage(domain, {storage: size}); 

        if (res) {
            createToast("success", "Storage added, reloading..."); 
            window.location.reload(); 
        };
        setLoading(false)
    }

    return (
        <Card className="px-6 py-3 flex-1 h-fit">
            <Heading2 className="text-md lg:text-base">Storage upgrade</Heading2>
            <Paragraph className="text-sm lg:text-md text-gray-500">Upgrade your storage to cover your business needs. Storage can only be added in GBs.</Paragraph>
            <Separator className="my-3"/>
            <div className="flex flex-col gap-2">
                <AppInput 
                    value={size}
                    setValue={setSize}
                    placeholder={40}
                    type="number"
                    disabled={loading}
                />
                <span className="block text-sm lg:text-md">Amount to add per month</span>
                <Paragraph>KES: {numberWithCommas(Math.ceil(size * 5))}</Paragraph>
                <Button 
                    onClick={handleUpgradeStorage}
                    disabled={loading}
                >
                    Upgrad{loading ? "ing...": "e"}
                </Button>
            </div>
        </Card>
    )
}