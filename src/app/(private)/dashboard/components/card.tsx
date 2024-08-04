// dashboard cards
"use client"; 
import React from "react"; 
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Heading3, Paragraph } from "@/components/ui/typography";

import { cn } from "@/lib/utils";
import { getBusinessCount } from "@/lib/api-calls/domains";
import { useCustomEffect } from "@/hooks";

const DashboardCard = () => {
    const [mounted, setMounted] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const [count, setCount] = React.useState<number>(0)

    React.useEffect(() => setMounted(true), []); 

    let className = "w-[230px] h-[110px] p-2 my-2"

    
    const fetchCount = async () => {
        if (!mounted) return; 
        setLoading(true); 
        
        let res = await getBusinessCount();
        
        if (res) setCount(res);
        
        setLoading(false)
    };
    
    useCustomEffect(fetchCount, [mounted])
    
    if (!mounted) return <Skeleton className={className}/>;
    return (
        <Card className={cn(className, "flex flex-col justify-between gap-2")}>
            <Globe size={18} className="self-end"/>
            <Heading3 className="self-center text-lg lg:text-xl font-extrabold">{count}</Heading3>
            <div className="flex items-center justify-between">
                <Paragraph className="text-xs lg:text-xs">Your Domains</Paragraph>

                <Link href="/domains" className="hover:text-main-color duration-700 text-xs lg:text-xs flex items-center gap-2">
                     <ArrowRight size={20}/>
                </Link>
            </div>
        </Card>
    )
};

export default DashboardCard; 