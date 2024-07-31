// common info component for settings page 
"use client"; 

import React from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { getLocalStorageItem, setLocalStorageItem } from "@/helpers/local-storage";
import { Card } from "@/components/ui/card";

interface InfoProps {
    // section: "groups" | "storage" | "verification" | "api" | "more"; 
    children: React.ReactNode; 
    localStorageString: string; 

}



const Info: React.FC<InfoProps> = ({ children, localStorageString}) => {
    const [show, setShow] = React.useState<boolean>(false); 

    React.useEffect(() => {
        let show_info = getLocalStorageItem(localStorageString); 

        if (!show_info) setShow(true)
    }, []);

    const handleHideInfo = (forever?: boolean) => {
        if (forever) setLocalStorageItem(localStorageString, "1"); 
        setShow(false)
    }

    return (
        <>
            {
                show && (
                    <Card className="p-3 my-3">
                        <div className="my-2 flex justify-end">
                            <Button variant="ghost" size={"sm"} onClick={() => handleHideInfo(false)}>
                                <X size={18}/>
                            </Button>
                        </div>
                        {children}
                        <div className="flex my-2">
                            <Button onClick={() => handleHideInfo(true)}>
                                Don't show again
                            </Button>
                        </div>
                    </Card>

                )       
            }
        </>
    )
};

export default Info; 