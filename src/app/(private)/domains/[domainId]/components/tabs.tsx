// tabs 
"use client"; 
import React from "react"; 

import { usePathname, useRouter } from "next/navigation";
import {Cog, CreditCard, Database, Home, Users} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {useSearch} from "@/hooks"; 

const Navs = ({tab}: {tab: string}) => {
    const [mounted, setMounted] = React.useState<boolean>(false); 

    const { push } = useRouter(); 
    const pathname = usePathname(); 
    const searchParams = useSearch(); 

    const d = searchParams?.get("d"); 
     

    return (
        <div className="flex items-center justify-end my-3">
            <Tabs defaultValue={tab} className="border-[.08rem] border-gray-500 dark:border-white-200 rounded-lg p-0 py-0 shadow-lg overflow-hidden">
                <TabsList className="py-0 p-0">
                    <TabsTrigger value="home" className="py-2 flex gap-2" onClick={() => push(`${pathname}?d=${d}`)}>
                        <Home size={18}/>{tab == "home" && <span className="text-xs lg:text-sm">Home</span>}
                    </TabsTrigger>
                    <TabsTrigger value="users" className="py-2 flex gap-2" onClick={() => push(`${pathname}?d=${d}&tab=users`)}>
                        <Users size={18}/>{tab == "users" && <span className="text-xs lg:text-sm">Users</span>}
                    </TabsTrigger>
                    <TabsTrigger value="payment" className="py-2 flex gap-2" onClick={() => push(`${pathname}?d=${d}&tab=payment`)}>
                        <CreditCard size={18}/>{tab == "payment" && <span className="text-xs lg:text-sm">Payment</span>}
                    </TabsTrigger>
                    {/* <TabsTrigger value="storage" className="py-2 flex gap-2" onClick={() => push(`${pathname}?d=${d}&tab=storage`)}>
                        <Database size={18}/>
                    </TabsTrigger> */}
                    <TabsTrigger value="settings" className="py-2 flex gap-2" onClick={() => push(`${pathname}?d=${d}&tab=settings`)}>
                        <Cog size={18}/>{tab == "settings" && <span className="text-xs lg:text-sm">Settings</span>}
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
};

export default Navs; 