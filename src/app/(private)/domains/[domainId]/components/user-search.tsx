// search for user 
"use client"; 
import React from "react"; 
import { useRouter, usePathname } from "next/navigation"; 

import { Search, X } from "lucide-react";

import AppInput from "@/components/common/app-input";
import { Button } from "@/components/ui/button";

import { useSearch } from "@/hooks"; 
import { cn } from "@/lib/utils";


const UserSearch = ({}) => {
    const searchParams = useSearch(); 
    const {push} = useRouter(); 
    const pathname = usePathname(); 

    const q = searchParams?.get("q") || ""; 
    const [search, setSearch] = React.useState<string>(""); 

    const [openInput, setOpenInput] = React.useState<boolean>(false); 

    const entries: any = searchParams?.entries(); 

    React.useEffect(() => {
        if (q) {
            setSearch(q);
            setOpenInput(true)
        }
    }, [q])

    const handleKeyDown = (val: string) => {
        if (val.length < 1) return; 
        let queryStr = '?'; 

        // get current query params
        for (const [key, value ] of entries) {
            if (key !== "q") queryStr = queryStr + `${key}=${value}&`
        }

        // append the search values
        if (val) queryStr = queryStr + `q=${val}`; 
        
        push(`${pathname}${queryStr}`); 
    }

    const handleClearQueries = () => {
        // get current queries except q
        let queryStr = '?'; 

        // get current query params
        for (const [key, value ] of entries) {
            if (key !== "q") queryStr = queryStr + `${key}=${value}&`
        }

        push(`${pathname}${queryStr}`); 
        setOpenInput(false)
    }

    return (
        <>
            <AppInput 
                value={search}
                setValue={setSearch}
                placeholder={"Search user..."}
                onKeyDown={(val: string) => handleKeyDown(val)}
                containerClassName={cn(openInput ? "flex": "hidden", "duration-700 rounded-full")}
                cls="min-w-[250px]"
                button={
                       
                    <Button 
                        size="sm" 
                        className={cn("rounded-full")}
                        onClick={handleClearQueries}
                        // variant="secondary"
                    >
                        <X size={18}/>
                    </Button>
                           
                }
            />
            <Button 
                size="sm" 
                className={cn(!openInput ? "flex": "hidden", "duration-700 rounded-full")}
                onClick={() => setOpenInput(true)}
                variant="secondary"
            >
                <Search size={18}/>
            </Button>
        </>
    )

};


export default UserSearch; 