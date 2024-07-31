// user container 
"use client"; 

import React from "react"; 
import { useRouter } from "next/navigation"; 

import { Bot, CheckCheck, Database, Group, Layers, LayoutPanelTop } from "lucide-react";

import TabContainer from "./tab-container"; 
import { Paragraph } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator"; 
import Groups from "./settings/groups"; 
import Storage from "./settings/storage"; 
import Verification from "./settings/verification"; 
import API from "./settings/api-key"; 
import More from "./settings/more"; 

import { cn } from "@/lib/utils";
import { useSearch } from "@/hooks"; 

const SettingsContainer = ({domain}: {domain: string}) => {
    const searchParams = useSearch(); 

    const d = searchParams?.get("d"); 
    const sec = searchParams?.get("sec") || "groups"; 

    return (
        <TabContainer
            title="Settings"
        >
            <div className="flex gap-2 h-full">
                <SettingsNav href={`/domains/${domain}?d=${d}&tab=settings`}/>
                <div className="flex-1 overflow-hidden overflow-y-auto">
                    {sec === "groups" && <Groups domain={domain}/>}
                    {sec === "storage" && <Storage domain={domain}/>}
                    {sec === "verification" && <Verification domain={domain}/>}
                    {sec === "api" && <API domain={domain}/>}
                    {/* {sec === "template" && <Templates domain={domain}/>} */}
                    {sec === "more" && <More domain={domain}/>}
                </div>
            </div>
        </TabContainer>
    )
};

export default SettingsContainer; 


const SettingsNav = ({href}: {href: string}) => {
    const searchParams = useSearch(); 

    const sec = searchParams?.get("sec") || "groups"; 
    return (
        <div className="border-r h-full flex flex-col gap-2">
            <NavItem 
                icon={<Group size={18}/>}
                href={`${href}&sec=groups`}
                text="Groups"
                active={sec === "groups"}
            />
            <NavItem 
                icon={<Database size={18}/>}
                href={`${href}&sec=storage`}
                text="Storage"
                active={sec === "storage"}
            />
            <NavItem 
                icon={<CheckCheck size={18}/>}
                href={`${href}&sec=verification`}
                text="Verification"
                active={sec === "verification"}
            />
            <NavItem 
                icon={<Bot size={18}/>}
                href={`${href}&sec=api`}
                text="API Key"
                active={sec === "api"}
            />
            <NavItem 
                icon={<LayoutPanelTop size={18}/>}
                href={`${href}&sec=templates`}
                text="Templates"
                active={sec === "template"}
            />
            <NavItem 
                icon={<Layers size={18}/>}
                href={`${href}&sec=more`}
                text="More"
                active={sec === "more"}
            />
            

{/*  */}
        </div>
    )
};

interface NavItemProps {
    text: string; 
    icon: React.ReactNode; 
    href: string; 
    active: boolean; 
};

const NavItem: React.FC<NavItemProps> = ({text, icon, href, active}) => {
    const {push} = useRouter(); 

    return (
        <div>
            <Paragraph className={
                cn(active ? "text-main-color bg-secondary": "", "hover:text-main-color px-2 mr-1 rounded-sm hover:bg-secondary py-2 duration-700 cursor-pointer flex items-center gap-2 min-w-[100px] text-sm lg:text-md")}
                onClick={() => push(href)}
            >
                {icon}
                <span>{text}</span>
            </Paragraph>
            <Separator />
        </div>
    )
}