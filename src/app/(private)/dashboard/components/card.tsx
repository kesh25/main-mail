// dashboard cards
"use client"; 
import React from "react"; 
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ArrowRight, Globe } from "lucide-react";
import { Heading3, Paragraph } from "@/components/ui/typography";
import Link from "next/link";

const DashboardCard = () => {
    const [mounted, setMounted] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => setMounted(true), []); 

    let className = "w-[230px] h-[110px] p-2 my-2"

    if (!mounted || loading) return <Skeleton className={className}/>

    return (
        <Card className={cn(className, "flex flex-col justify-between gap-2")}>
            <Globe size={18} className="self-end"/>
            <Heading3 className="self-center text-lg lg:text-xl font-extrabold">{2}</Heading3>
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