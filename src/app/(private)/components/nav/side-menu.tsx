// side menu
"use client"; 
import React from "react"; 
import Link from "next/link"; 
import {usePathname} from "next/navigation"; 

import {Gauge, List, LogOut, Bell, Cog, Database, ChevronsLeftRight} from "lucide-react"; 

import Logo from "@/components/utils/logo"; 
import { Separator } from "@/components/ui/separator"; 
import { cn } from "@/lib/utils"; 
import {getLocalStorageItem, setLocalStorageItem} from "@/helpers/local-storage"; 
import { Button } from "@/components/ui/button";

const SideMenu = () => {
    const [opened, setOpened] = React.useState<boolean>(false); 

    React.useEffect(() => {
        let menuOpen = getLocalStorageItem("menu_open"); 

        if (menuOpen && menuOpen === "yes") setOpened(true)
        else setOpened(false);  
    }, []);

    const handleToggleMenu = () => {
        if (!opened) setLocalStorageItem("menu_open", "yes")
        else setLocalStorageItem("menu_open", "no");

        setOpened(!opened); 
    }

    return (
        <div className="bg-background relative p-3 flex flex-col gap-2 border-r-[0.03rem]">
            <Logo showText={opened}/>
            <Button
                variant="outline"
                size="icon"
                className="rounded-full absolute -right-5 bottom-0 mb-[4.5rem]"
                onClick={handleToggleMenu}
            >
                <ChevronsLeftRight size={18}/>
            </Button>
            <Separator />
            <div className="flex-1 flex flex-col">
                {
                    list.map((link, index) => (
                        <SideItem 
                            key={index} 
                            text={link.text}
                            href={link.href}
                            icon={link.icon}
                            opened={opened}

                        />
                    ))
                }
            </div>
            <Separator />
            <Button size={opened ? "default": "icon"} className={cn(opened ? "pl-0": "", " flex items-center gap-2 hover:text-destructive duration-700")} variant="ghost">
                <LogOut size={18}/>
                {opened && <span>Logout</span>}
            </Button>
        </div>
    )
};

export default SideMenu; 


type SideItemType = {
    icon: React.ReactNode; 
    text: string;
    href: string; 
};

interface SideItemProps extends SideItemType {
    opened?: boolean; 
}; 

const SideItem: React.FC<SideItemProps> = ({icon, text, href, opened}) => {
    const pathname = usePathname(); 


    return (
        <>
            <Link 
                href={href} 
                title={text}
                className={cn(pathname === href ? "text-main-color bg-secondary border-l-main-color": "border-l-transparent", "border-l-[.2rem] py-2 px-1 my-1 text-sm lg:text-md hover:border-l-main-color hover:text-main-color hover:bg-secondary duration-700 flex gap-2 items-center")}
            >
                {icon}
                {opened && <span>{text}</span>}
            </Link>
            {/*  */}
        </>
    )
};

const list: SideItemType[] = [
    {
        text: "Dashboard",
        href: "/dashboard",
        icon: <Gauge size={18}/>
    },
    {
        text: "Domains",
        href: "/domains",
        icon: <List size={18}/>
    },
    {
        text: "Notifications",
        href: "/notifications",
        icon: <Bell size={18}/>
    },
    {
        text: "Settings",
        href: "/settings",
        icon: <Cog size={18}/>
    },
]