// users container 
"use client"; 
import React from "react";
import {Forward, Reply, Users} from "lucide-react"; 

import { Card } from "@/components/ui/card"; 
import { Heading2, Paragraph } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import Badge from "@/components/utils/badge";
import DomainStorage from "./storage"; 
import DomainCard from "./card"; 

import { getDomain } from "@/lib/api-calls/domains";
import {useCustomEffect, useSearch} from "@/hooks";  
import {formatDateToString} from "@/utils/dates";  
import {numberWithCommas} from "@/utils/format-numbers";  


const Info = ({domainId}:{domainId: string}) => {
    const [mounted, setMounted] = React.useState<boolean>(false); 
    
    const [domain, setDomain] = React.useState<any>();
    const [loading, setLoading] = React.useState<boolean>(true); 
    
    const searchParams = useSearch(); 
    
    
    const tab = searchParams?.get("tab"); 
    
    React.useEffect(() => setMounted(true), [])

    const fetchDomain = async () => {
        if (tab || !mounted) return; 
        setLoading(true); 

        let res = await getDomain(domainId); 
        
        if (res) {
            setDomain(res.doc)
        };

        setLoading(false); 
    };

    useCustomEffect(fetchDomain, [tab]);

    

    return (
        <>
            {
                !tab && domain && (
                    <div className="flex flex-col gap-2 lg:flex-row h-fit my-3">
                        <div className="flex-1 flex flex-col ">
                            <div className="flex flex-col lg:flex-row gap-2">
                                <DomainCard 
                                    icon={<Users size={18} className={"self-end"}/>}
                                    title="Users"
                                    value={domain.users}
                                />
                                <DomainCard 
                                    icon={<Forward size={18} className={"self-end"}/>}
                                    title="Sent Mail"
                                    value={domain.sent}
                                />
                                <DomainCard 
                                    icon={<Reply size={18} className={"self-end"}/>}
                                    title="Received Mail"
                                    value={domain.received}
                                />
                            </div>
                            <Card className="p-6 lg:flex-1 flex flex-col gap-2">
                                <div className="flex gap-2 items-center">
                                    <Badge 
                                        text={domain.verified ? "Verified": "Not Verified"}
                                        type={
                                            domain.verified ? "primary": "danger"
                                        }
                                    />
                                </div>
                                <Heading2 className="text-md lg:text-lg">{domain.title || domain.domain}</Heading2>
                                <Paragraph className="text-sm lg:text-md">Added on: {formatDateToString(domain.createdAt)}</Paragraph>
                                <div className="flex-1 flex flex-col justify-between">
                                    <Separator />
                                    <Separator />
                                    <Separator />
                                    <Separator />
                                </div>
                            </Card>

                        </div>
                        {/* <Card className="lg:w-[50%] h-[20vh] p-6 "> */}
                        <DomainStorage 
                            domain={domainId}
                            title={domain.domain}
                        />
                            
                        {/* </Card> */}
                    </div>
                )
            }
        </>
    )
};

export default Info; 