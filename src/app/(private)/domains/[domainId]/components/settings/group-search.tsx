// search for user 
"use client"; 
import React from "react"; 
import { useRouter, usePathname } from "next/navigation"; 

import { X } from "lucide-react";

import AppInput from "@/components/common/app-input";
import { Button } from "@/components/ui/button";

import { useSearch } from "@/hooks"; 
import { cn } from "@/lib/utils";


const GroupSearch = ({}) => {
    const searchParams = useSearch(); 
    const {push} = useRouter(); 
    const pathname = usePathname(); 

    const q = searchParams?.get("q") || ""; 
    const [search, setSearch] = React.useState<string>(""); 

    const entries: any = searchParams?.entries(); 

    React.useEffect(() => {
        if (q && !search) {
            setSearch(q);
        }
    }, [q])

    const handleKeyDown = (val: string) => {
        
        
        let queryStr = '?'; 

        // get current query params
        for (const [key, value ] of entries) {
            if (key !== "q") queryStr = queryStr + `${key}=${value}&`
        }

        // append the search values
        setSearch(val); 
        if (val)  queryStr = queryStr + `q=${val}`; 
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
        setSearch(""); 
    }

    return (
         
            <AppInput 
                value={search}
                setValue={setSearch}
                placeholder={"Search group..."}
                onKeyDown={(val: string) => handleKeyDown(val)}
                containerClassName={cn("rounded-full")}
                cls="w-[250px]"
                button={
                    <>
                        {
                            search && (
                                <>
                                    <Button 
                                        size="sm" 
                                        className={cn("rounded-full")}
                                        onClick={handleClearQueries}
                                        // variant="secondary"
                                    >
                                        <X size={18}/>
                                    </Button>
                                </>
                            )
                        }
                    </>
                           
                }
            />
             
        
    )

};


export default GroupSearch; 