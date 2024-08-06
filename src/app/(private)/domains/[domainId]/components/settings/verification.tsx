// verification 
"use client"; 
import React from "react"; 
import { Copy } from "lucide-react"; 

import { Paragraph } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Badge from "@/components/utils/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FormTitle from "@/components/forms/components/form-title";
import Info from "./message"; 
import SettingsContainer from "./settings-container"; 

import { createToast } from "@/utils/toast"; 
import { getDomainRecords, verifyDomain } from "@/lib/api-calls/records";
import { useCustomEffect, useSearch } from "@/hooks";

type RecordsType = {
    CNAME: any; 
    DKIM: any; 
    MX: any; 
    SPF: any; 
    state: "unverified" | "active"
}

const Verification = ({domain}: {domain: string}) => {
    const [loading, setLoading] = React.useState<boolean>(false); 
    const [mounted, setMounted] = React.useState<boolean>(false); 

    const [verified, setVerified] = React.useState<boolean>(false); 
    const [records, setRecords] = React.useState<RecordsType>(); 

    const searchParams = useSearch(); 
    const d = searchParams?.get("d") || ""; 

    React.useEffect(() => setMounted(true), [])

    const fetchRecords = async () => {
        if (!mounted) return; 
        setLoading(true); 

        let res = await getDomainRecords(domain); 

        if (res) {
            setRecords(res);
        } else {
            setRecords(
                {
                    SPF: {
                      is_active: false,
                      name: 'Domain',
                      valid: 'invalid',
                      value: 'Not added'
                    },
                    DKIM: {
                      is_active: false,
                      name: 'DKIM',
                      valid: 'invalid',
                      value: 'Not Added'
                    },
                    MX: [
                      {
                        is_active: false,
                        priority: '10',
                        record_type: 'MX',
                        valid: 'invalid',
                        value: 'Not Added'
                      },
                      {
                        is_active: false,
                        priority: '10',
                        record_type: 'MX',
                        valid: 'invalid',
                        value: 'Not Added'
                      }
                    ],
                    CNAME: {
                      is_active: false,
                      name: 'CNAME',
                      valid: 'valid',
                      value: 'Not Added'
                    },
                    state: 'unverified',
                    
                }
            )
        }; 

        setLoading(false); 
    }

    useCustomEffect(fetchRecords, [mounted]); 

    const handleVerification = async () => {
        if (records?.state === "active") {
            createToast("error", "Domain is verified!");
            return; 
        };

        setLoading(true); 

        let res = await verifyDomain(domain); 
         
        if (res){
            if (res === "unverified") {
                createToast("error", "Domain is still unverified!")
            } else if (res === "active") {
                createToast("success", "Domain has been verified!");
                let update: any = {
                    ...records, state: "active"
                }
                setRecords(update); 
            }
        };

        setLoading(false); 
    }

    return (
        <SettingsContainer
            title="Domain Verification"
            subtitle={"DNS records that enable sending and receiving mail through our platform."}
        >
            <Info localStorageString="show_verification">
                <Paragraph>
                    These records are important are important in helping send and receive emails through our platform. Copy them to your respective DNS management platform 
                    such as cloudflare or any other that you are using. Click verify to check if they have been updated before your begin sending and recieving emails. 
                </Paragraph>
            </Info>

            <div className="flex gap-3 items-center justify-between  w-full">
                <div className="flex items-center gap-3">
                    <Badge type={records?.state === "active" ? "primary": "other"} text={loading ? "Unverified": records?.state === "active" ? "Verified": "Not Verified"}/>
                </div>
                {
                    records?.state  !== "active" && (
                        <Button 
                            className="w-[150px] rounded-full" 
                            disabled={loading}
                            onClick={handleVerification}
                        >
                            Verify
                        </Button>
                    )
                }
            </div>
            <Separator className="my-3"/>
            <DNSEntry 
                title="SPF"
                subtitle="TXT records (known as SPF & DKIM) are required to send and receive email through us"
                hostname={loading ? "..." : records?.SPF.name}
                value={loading ? "...": records?.SPF.value}
            />
            <Separator className="my-3"/>
            <DNSEntry 
                title="DKIM"
                subtitle="You can create up to 3 DKIM keys per domain"
                hostname={loading ? "...": records?.DKIM.name}
                value={loading ? "...": records?.DKIM.value}
            />
            <Separator className="my-3"/>
            
            <DNSEntry 
                title="MX"
                subtitle={`MX records are recommended for all domains, even if you are only sending messages. Unless you already have MX records for @${d} pointing to another email provider (e.g. Gmail), you should update the following records.`}
                hostname={loading ? "...": d}
                value={loading ? "...": records?.MX[0].value}
                subtext={`Priority: ${records?.MX[0].priority}`}
            />
            <DNSEntry 
                title="MX"
                hostname={loading ? "...": d}
                value={loading ? "...": records?.MX[1].value}
                subtext={`Priority: ${records?.MX[0].priority}`}
            />
            <Separator className="my-3"/>
            <DNSEntry 
                title="CNAME"
                subtitle="The CNAME record is necessary for tracking opens, clicks, and unsubscribes."
                hostname={`email.${d}`}
                value={loading ? "...": records?.CNAME.value}
            />
            <div className="pb-[5rem]"/>
        </SettingsContainer>
    )
};

export default Verification; 


const DNSEntry = ({title, hostname, subtitle, value, subtext}: {title: string, subtitle?: string, hostname: string, value: string, subtext?: string}) => {

    const handleCopy = async (titleS: boolean) => {
        try {
            await navigator?.clipboard.writeText(titleS ? hostname: value)
            createToast("success", titleS ? "Copied!": `${title} value has been copied!`)
        } catch (err) {
            createToast("error", "Copying was unsuccessful!")
        }
     
    }
    return (
        <div className="flex flex-col gap-2 my-3 overflow-hidden">
            <FormTitle title={title}/>
            {subtitle && <Paragraph className="text-xs lg:text-sm text-gray-500">{subtitle}</Paragraph>}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <FormTitle title={"Hostname"}/>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(true)}>
                        <Copy size={17}/>
                    </Button>
                </div>
                {subtext && <Paragraph className="text-xs lg:text-sm my-1">{subtext}</Paragraph>}
                <Card className="p-3 bg-secondary h-fit relative max-w-[80vw]">
                    <Paragraph>{hostname}</Paragraph>
                </Card>
                <div className="flex items-center gap-2">
                    <FormTitle title={"Value"}/>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(false)}>
                        <Copy size={17}/>
                    </Button>
                </div>
                <Card className="p-3 pr-4 bg-secondary h-fit max-w-[80vw] overflow-auto">
                    <Paragraph className="w-full">{`${value?.toString()}`}</Paragraph>
                </Card>

            </div>
        </div>

    )
}