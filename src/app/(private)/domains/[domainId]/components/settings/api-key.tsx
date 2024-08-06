// api settings
"use client"; 
import React from "react";
import Link from "next/link"; 

import SettingsContainer from "./settings-container"; 
import APITable from "@/components/data-tables/api-keys";
import { Button } from "@/components/ui/button";
import { Heading3, Paragraph } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

import {APIKeyTableType} from "@/types";
import { useCustomEffect, useSearch } from "@/hooks";
import { generateKey, getApiKeys } from "@/lib/api-calls/keys";
import { createToast} from "@/utils/toast"; 
import { useApiKeyState } from "@/stores/api-keys";

type PlanType = "basic" | "premium" | "startup" | "custom" | undefined; 

const API = ({domain}: {domain: string}) => {
    const [keys, setKeys] = React.useState<APIKeyTableType[]>([]); 
    const [count, setCount] = React.useState<number>(0); 
    const [loading, setLoading] = React.useState<boolean>(false); 
    const [btnLoading, setBtnLoading] = React.useState<boolean>(false); 
    const [mounted, setMounted] = React.useState<boolean>(false);
    
    const [plan, setPlan] = React.useState<PlanType>()

    const searchParams = useSearch(); 
    const page = searchParams?.get("page") || ""; 
    const d = searchParams?.get("d"); 

    const { apiKeys, deletedKeys } = useApiKeyState(); 

    React.useEffect(() => setMounted(true), []); 

    const fetchKeys = async () => {
        if (!mounted) return; 
        setLoading(true);

        let res = await getApiKeys(domain, page);

        if (res) {
            setPlan(res.plan); 
             
            if (res.plan !== "basic") {
                setKeys(res.docs);
                setCount(res.count); 
             }
        }

        setLoading(false)
    }

    useCustomEffect(fetchKeys, [mounted, page]); 

    const handleGenerateKey = async () => {
        setBtnLoading(true); 
        let res = await generateKey(domain); 

        if (res) {
            let key = {
                ...res, 
                active: true, 
                createdAt: new Date(), 
                lastUsed: new Date()
            }; 

            setKeys([key, ...keys]);
            createToast("success", "API key was generated!") 
        };
        setBtnLoading(false); 
    }

    // update on cell actions 

    React.useEffect(() => {
        if (apiKeys.length === 0) return; 
        let updated = []; 
        for (let i = 0; i < keys.length; i++) {
            let curr = keys[i]; 

            // check current key in apiKey state
            let confirm = apiKeys.filter(ky => ky.id === curr.id); 
            if (confirm.length > 0) updated.push(confirm[0]);
            else updated.push(curr); 
        }; 
        setKeys([]); 
        setKeys([...updated]); 
    }, [apiKeys]);

    React.useEffect(() => {
        if (deletedKeys.length === 0) return; 
        let updated = [...keys]; 
        for (let i = 0; i < keys.length; i++) {
            let curr = keys[i]; 

            // check current key in apiKey state
            let confirm = deletedKeys.filter(ky => ky.id === curr.id); 
            if (confirm.length > 0) updated = updated.filter(ky => ky.id !== curr.id);
        }; 
        setKeys([]); 
        setKeys([...updated]); 
    }, [deletedKeys])

    return (
        <SettingsContainer
            title="API"
            subtitle="Automate your transactional and marketing emails with a few lines of code."
        >
            {
                plan === "basic" ? (
                    <div className="w-full h-[40vh] border my-2 rounded-sm flex flex-col gap-2 items-center justify-center">
                        <Heading3 className="text-sm lg:text-md">You plan does not include the API access. Upgrade to get the service</Heading3>
                        <Link 
                            href={`/domains/${domain}?d=${d}&tab=settings&sec=more#upgrade`}
                            className="text-xs lg:text-sm duration-700 hover:text-main-color"
                        >
                            Upgrade
                        </Link>
                    </div>
                ): (
                    <>
                        <Paragraph className=""><span className="text-extrabold">NB:</span> Make certain that you protect your API Keys with your life. They are encrypted before they are stored in our database.</Paragraph>
                        <Separator className="my-3"/>
                        <div className="flex justify-end my-2">
                            <Button
                                disabled={btnLoading}
                                onClick={handleGenerateKey}
                            >
                                Generate New Key
                            </Button>
                        </div>
                        <APITable 
                            data={keys}
                        />
                    </>
                )
        }
        </SettingsContainer>
    )
};

export default API; 