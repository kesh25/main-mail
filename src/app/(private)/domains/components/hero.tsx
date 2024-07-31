// domain hero section 
"use client"; 
import React from "react"; 

import AppInput from "@/components/common/app-input"
import { Card } from "@/components/ui/card"
import { Heading2, Paragraph } from "@/components/ui/typography"
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Hero = () => {
    const [domain, setDomain] = React.useState<string>(""); 

    return (
        <Card className="p-6">
            <Paragraph className="text-sm lg:text-md text-green-500">Coming soon...</Paragraph>
            <Heading2 className="text-md lg:text-lg my-3">Purchase a domain</Heading2>
            <Paragraph className="text-gray-500 my-3">Purchase and manage your domain directly from here at the cheapest rates in the market.</Paragraph>
            <div className="flex items-center gap-1 my-3">
                <div className="flex-1">
                    <AppInput 
                        value={domain}
                        setValue={setDomain}
                        placeholder={"Type a domain"}
                        containerClassName="w-full"
                        cls="w-full"
                    />
                </div>
                <Button className="gap-2 items-center">
                    Search <Search size={18}/>
                </Button>
            </div>
            <div className="flex gap-2 items-center my-2 flex-wrap">
                {
                    domain_ext.map((dom, index) => <Button key={index} variant="outline" disabled={true}>{dom}</Button>)
                }
            </div>
        </Card>
    )
}; 


export default Hero; 

let domain_ext: string[] = [
    ".co.ke", ".com", ".xyz", ".ke", ".shop", ".org", ".africa", ".vip", ".net", ".info", ".me", ".online", ".io"
]