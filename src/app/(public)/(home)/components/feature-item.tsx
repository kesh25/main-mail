"use client"; 
import React from "react"; 
import {useRouter} from "next/navigation"; 

import {  ChevronDown, ChevronUp } from "lucide-react";

import { Card } from "@/components/ui/card"; 
import { Heading3, Paragraph } from "@/components/ui/typography";

import {useSearch} from "@/hooks"; 
import {cn} from "@/lib/utils"; 

export type FeatureItemType = {
    icon: React.ReactNode; 
    title: string; 
    description: string; 
}

interface FeatureItemProps extends FeatureItemType {
    index: number; 
}; 

const FeatureItem: React.FC<FeatureItemProps> = ({icon, title, description, index}) => {
    const [opened, setOpened] = React.useState<boolean>(false); 
    const searchParams = useSearch(); 

    const feature = searchParams?.get("feature"); 
 

    
    return (
        <Card 
            className="lg:w-[400px] w-full max-w-[400px] p-2 py-3 duration-700 cursor-pointer hover:border-main-color"
            onClick={() => setOpened(!opened)}
        >
            <div className="flex items-center justify-between gap-2">
                <div className={
                    cn(
                        opened ? "flex-col": "flex-row items-center",
                        "flex gap-2"
                    )
                }>
                    <span className="w-9 h-9 rounded-full flex items-center justify-center border">
                        {icon}
                    </span>
                    <Heading3 className="text-sm lg:text-md">{title}</Heading3>
                </div>
                {opened ? <ChevronUp size={20} />: <ChevronDown size={20}/>}
            </div>
            <Paragraph className={cn(opened ? "block": "hidden", "my-2 duration-700")}>{description}</Paragraph>
        </Card>
    )
};

export default FeatureItem; 