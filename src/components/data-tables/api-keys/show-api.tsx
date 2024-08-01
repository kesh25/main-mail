// show api key 

import React from "react";
import { Copy, Eye, EyeOff } from "lucide-react";

import AppLinkButton from "@/components/common/app-link-button";

const ShowAPI = ({api_key, appId}: {api_key: string, appId: string}) => {
    const [show, setShow] = React.useState<boolean>(false); 

    return (
        <span className="flex items-center gap-4 w-[400px] text-xs overflow-auto">
            <span className="flex flex-col max-w-[90%] overflow-auto">
                <span className="font-bold">{show ? "Decrypted": "Encrypted"}</span>
                <span>{api_key.slice(0, 30)}***</span>
            </span>
            <span className="flex gap-2 items-center">
                <AppLinkButton
                    size={"sm"}
                    type="secondary"
                >
                    {show ? <EyeOff size={18}/>: <Eye size={18}/>}
                </AppLinkButton>
                <AppLinkButton
                    size={"sm"}
                    type="secondary"
                >
                    <Copy size={18}/>
                </AppLinkButton>
            </span>
        </span>
    )
};

export default ShowAPI; 