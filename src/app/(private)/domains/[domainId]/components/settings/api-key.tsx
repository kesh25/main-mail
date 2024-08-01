// api settings
"use client"; 
import React from "react";

import SettingsContainer from "./settings-container"; 
import APITable from "@/components/data-tables/api-keys";
import { Button } from "@/components/ui/button";
import { Heading3, Paragraph } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

import {APIKeyTableType} from "@/components/data-tables/api-keys/columns";
import { useCustomEffect, useSearch } from "@/hooks";
import { generateKey, getApiKeys } from "@/lib/api-calls/keys";
import { createToast} from "@/utils/toast"; 

const API = ({domain}: {domain: string}) => {
    const [keys, setKeys] = React.useState<APIKeyTableType[]>([]); 
    const [count, setCount] = React.useState<number>(0); 
    const [loading, setLoading] = React.useState<boolean>(false); 
    const [btnLoading, setBtnLoading] = React.useState<boolean>(false); 
    const [mounted, setMounted] = React.useState<boolean>(false); 

    const searchParams = useSearch(); 
    const page = searchParams?.get("page") || ""; 

    React.useEffect(() => setMounted(true), []); 

    const fetchKeys = async () => {
        if (!mounted) return; 
        setLoading(true);

        let res = await getApiKeys(domain, page);

        if (res) {
            setKeys(res.docs);
            setCount(res.count); 
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
            console.log(res)
        };
        setBtnLoading(false); 
    }

    return (
        <SettingsContainer
            title="API"
            subtitle="Automate your transactional and marketing emails with a few lines of code."
        >
            <Heading3 className="text-sm lg:text-md">API Keys</Heading3>
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
        </SettingsContainer>
    )
};

export default API; 