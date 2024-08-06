// show api key 

import React from "react";
import { Copy, Eye, EyeOff } from "lucide-react";

import {CopyToClipboard} from 'react-copy-to-clipboard';

import AppLinkButton from "@/components/common/app-link-button";
import { getApiKey } from "@/lib/api-calls/keys";
import { APIKeyTableType } from "@/types"; 
import { createToast } from "@/utils/toast"; 

const ShowAPI = ({api_key}: {api_key: APIKeyTableType}) => {
    const [rawKey, setRawKey] = React.useState<string>(api_key.key); 
    const [show, setShow] = React.useState<boolean>(false); 

    const handleToggleShowAPI = async () => {
        let updateShow = !show
        setShow(updateShow); 

        let res = await getApiKey(api_key.id, updateShow); 
        if (res) setRawKey(res.key); 
    }

    const handleCopy = async () => {
        if (!show) {
            createToast("error", "You need to decrypt the key before use!");
            return; 
        }
        createToast("success", "Copied API Key to clipboard")
    }

    return (
        <span className="flex items-center gap-4 text-xs overflow-auto">
            <span className="flex flex-col max-w-[90%] overflow-auto">
                <span className="font-bold">{show ? "Decrypted": "Encrypted"}</span>
                <span>{rawKey.slice(0, 30)}***</span>
            </span>
            <span className="flex gap-2 items-center">
                <AppLinkButton
                    size={"sm"}
                    type="secondary"
                    onClick={handleToggleShowAPI}
                >
                    {show ? <EyeOff size={18}/>: <Eye size={18}/>}
                </AppLinkButton>
                <CopyToClipboard 
                    text={rawKey}
                    onCopy={handleCopy}
                >
                    <AppLinkButton
                        size={"sm"}
                        type="secondary"
                    >
                        <Copy size={18}/>
                    </AppLinkButton>
                </CopyToClipboard>
            </span>
        </span>
    )
};

export default ShowAPI; 