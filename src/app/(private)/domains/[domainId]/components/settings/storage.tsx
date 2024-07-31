// storage in settings
"use client"; 
import React from "react"; 

import {
    ChartConfig,
    
  } from "@/components/ui/chart"

import AppInput from "@/components/common/app-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading2, Paragraph } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import Chart from "@/components/charts";

import StorageUserTable from "@/components/data-tables/storage-users";
import {StorageUserTableType} from "@/components/data-tables/storage-users/columns";

import DomainStorage from "../storage"; 
import SettingsContainer from "./settings-container"; 


const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

const Storage = ({domain}: {domain: string}) => {

    return (
        <SettingsContainer
            title="Storage"
            subtitle={"Storage analysis for all users in the domain."}
        >
            <div className="flex gap-2 flex-col lg:flex-row my-3">
                <DomainStorage 
                    title="Storage"
                    settings={true}
                    data={
                        [
                            {title: "Used", storage: 40, fill: "#E76F4F" },
                            {title: "Free", storage: 10, fill: "#2B9C90" }
                        ]
                    }
                />
                <Chart 
                    className="flex-1 my-0"
                    title="File Overview"
                    type="bar"
                    height="h-[23vh] w-full"
                    data={chartData}
                    chartConfig={chartConfig}
                    xAxis={{dataKey: "month"}}
                    bars={[{dataKey: "desktop", fill: "var(--color-desktop)"}]}
                />
            </div>
            <div className="flex gap-2 flex-col lg:flex-row">
                <StorageUsers />
                <StorageUpgrade />
            </div>

        </SettingsContainer>
    )
};

export default Storage; 


const StorageUsers = () => {
    const [storage, setStorage] = React.useState<StorageUserTableType[]>([]);
    return (
        <Card className="px-6 py-3 lg:min-w-[60%]">
            <Heading2 className="text-md lg:text-base">User's storage</Heading2>
            <Paragraph className="text-sm lg:text-md text-gray-500">Storage for the domain users</Paragraph>
            <Separator className="my-3"/>
            <StorageUserTable data={storage}/>
        </Card>
    )
}; 

const StorageUpgrade = () => {
    const [size, setSize] = React.useState<number>(0); 

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
                />
                <span className="block text-sm lg:text-md">Amount to add per month</span>
                <Paragraph>KES: 0.00</Paragraph>
                <Button>Upgrade</Button>
            </div>
        </Card>
    )
}