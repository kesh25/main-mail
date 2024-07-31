// user popover 
import React from "react"; 
import Link from "next/link"; 

import {ChevronDown, Cog, LogOut, User } from "lucide-react"; 
 
import AppAvatar from "../common/app-avatar";
import { Card } from "../ui/card";
import { Heading4, Paragraph } from "../ui/typography";
import PopoverContainer from "./container";
import Logout from "../modals/logout";
import { Separator } from "@/components/ui/separator"; 

const UserPopover = () => {
    const [openLogoutModal, setOpenLogoutModal] = React.useState<boolean>(false)

    return (
        <>
            <Logout 
                isOpen={openLogoutModal}
                onClose={() => setOpenLogoutModal(false)}
            />

            <PopoverContainer
                contentClassName="w-[200px] absolute  -right-[5rem]"
                trigger={
                    <Card className="cursor-pointer hover:bg-secondary hover:border-background duration-700 px-2 py-[.14rem] flex gap-1 items-center">
                        <AppAvatar 
                            src=""
                            name="Kinyua Nyaga"
                            dimension="w-7 h-7"
                        />
                        <div className="flex-1 flex flex-col items-start">
                            <Heading4 className="text-xs lg:text-sm my-0">Kinyua Nyaga</Heading4>
                            <Paragraph className="text-xs lg:text-xs">Admin</Paragraph>
                        </div>
                        <ChevronDown size={18}/>
                    </Card>
                }
            >
                <div className="flex flex-col gap-1">
                     {
                        items.map((item, index) => (
                            <MoreItem key={index} item={item}/>
                        ))
                     }
                     <Separator className="my-1"/>
                    <Link
                        href="#"
                        onClick={(e) => {
                            e.stopPropagation(); 
                            e.preventDefault(); 
                            setOpenLogoutModal(true)
                        }}
                        className="flex items-center gap-2 hover:text-destructive duration-700"
                    >
                        <LogOut size={18}/>
                        <span className="text-xs">Logout</span>
                    </Link>
                </div>
            </PopoverContainer>
        </>
    )
};

export default UserPopover; 


// files, calendar, contacts, account, logout
const items: MoreItemType[] = [
    {
        title: "Profile",
        href: "/profile",
        icon: <User size={18}/>
    },
    {
        title: "Settings",
        href: "/settings",
        icon: <Cog size={18}/>
    },
]

type MoreItemType = {
    title: string; 
    icon?: React.ReactNode; 
    href: string; 
}; 

const MoreItem = ({item}: {item: MoreItemType}) => {

    return (
        <Link 
            href={item.href} 
            title={item.title}
            className="flex items-center gap-2 hover:text-main-color duration-700 my-2"
        >
            {item.icon && item.icon}
            <span className="text-xs">{item.title}</span>
        </Link>
    )
}