// user popover 
import React from "react";

import { CheckCheck, SlidersHorizontal } from "lucide-react";

import AppLinkButton from "../common/app-link-button";
import { Button } from "../ui/button";
import { Paragraph } from "../ui/typography";
import PopoverContainer from "./container";
 
import { cn } from "@/lib/utils";
import { useSearch } from "@/hooks";

const NotificationPopover = () => {
    const searchParams = useSearch(); 
    
    const unread = searchParams?.get("unread"); 
    const oldest = searchParams?.get("oldest") || "0"; 

    const handleUpdateQuery = (queryParam: string) => {

    }

    let cls = "text-xs lg:text-sm hover:text-main-color duration-700 cursor-pointer flex gap-1 items-center"
    return (
        <PopoverContainer
            contentClassName="w-[150px] absolute  -right-[1.3rem]"
            trigger={
                <AppLinkButton
                    size="sm"
                    type="secondary"
                >
                    <SlidersHorizontal size={18} />
                </AppLinkButton>
            }
        >
            <div className="flex flex-col gap-2">
                <Paragraph
                    className={cn(
                        cls,
                        unread ? "text-main-color": ""
                    )}
                    onClick={() => {
                        handleUpdateQuery("unread=1")
                    }}
                >
                    <CheckCheck 
                        size={18} 
                        className={cn(unread ? "text-main-color": "text-transparent")}
                    />
                    Unread
                </Paragraph>
                <Paragraph
                    className={cn(
                        cls,
                        oldest === "1" ? "text-main-color": ""
                    )}
                    onClick={() => {
                        handleUpdateQuery("oldest=1")
                    }}
                >
                    <CheckCheck 
                        size={18} 
                        className={cn(oldest === "1" ? "text-main-color": "text-transparent")}
                    />
                    Oldest First
                </Paragraph>
                <Paragraph
                    className={cn(
                        cls, 
                        (oldest === "0" || !oldest) ? "text-main-color": ""
                    )}
                    onClick={() => {
                        handleUpdateQuery("oldest=0")
                    }}
                >
                    <CheckCheck 
                        size={18} 
                        className={cn((oldest === "0" || !oldest) ? "text-main-color": "text-transparent")}
                    />
                    Newest First
                </Paragraph>
            </div>
        </PopoverContainer>
    )
};

export default NotificationPopover;

