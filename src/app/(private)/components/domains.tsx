// sample domain list 
"use client"; 
import React from "react";
import Link from "next/link";

import { ChevronRight, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heading3 } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator"
import DomainTable from "@/components/data-tables/domains";
import AddDomainModal from "@/components/modals/add-domain";
import DomainSearch from "./domain-search"; 

import { DomainTableType } from "@/types";
import { getDomains } from "@/lib/api-calls/domains";
import { useCustomEffect, useSearch } from "@/hooks";
import { cn } from "@/lib/utils";


interface DomainsProps {
    limit: number; 
    search: boolean; 
}

const Domains: React.FC<DomainsProps> = ({limit, search}) => {
    const [domains, setDomains] = React.useState<DomainTableType[]>([]);
    const [count, setCount] = React.useState<number>(0); 

    const [mounted, setMounted] = React.useState<boolean>(false); 
    const [loading, setLoading] = React.useState<boolean>(true); 
    const [openAddDomainModal, setOpenAddDomainModal] = React.useState<boolean>(false); 

    const searchParams = useSearch(); 
    const page = searchParams?.get("page") || ""; 
    const q = searchParams?.get("q") || ""; 

    React.useEffect(() => setMounted(true), [])

    const fetchDomains = async () => {
        if (!mounted) return; 
        setLoading(true); 

        let res = await getDomains(page, limit, q);

        if (res) {
              
            setCount(res.count);
            setDomains(res.docs);
        }
        setLoading(false); 
    }

    useCustomEffect(fetchDomains, [mounted, page, q])
    return (
        <>
            <AddDomainModal 
                domains={domains}
                setDomains={setDomains}
                isOpen={openAddDomainModal}
                onClose={() => setOpenAddDomainModal(false)}
            />
            <Card className="p-2 my-2">
                <CardHeader className=" flex items-center justify-between gap-2 space-y-0 py-5 sm:flex-row pb-2">
                    <div>
                        <CardTitle className="text-md lg:text-lg font-bold">Domain List</CardTitle>
                        <CardDescription className="text-xs lg:text-sm">Total: {loading ? "....": `${count} domain${count === 1 ? "": "s"}`}</CardDescription>
                    </div>
                        <div className="flex gap-2 items-center">
                            {
                                search && (
                                    <DomainSearch />
                                )
                            }
                            <Button 
                                disabled={loading}
                                onClick={() => setOpenAddDomainModal(true)}
                                className="gap-2 items-center rounded-full" size="sm">
                                {!search && <span>Add Domain</span>}
                                <Plus size={18}/>
                            </Button>      
                        </div>
                    
                </CardHeader>
                <div className="px-6">
                    <Separator className="my-2"/>
                </div>
                {
                    !loading && (
                        <>
                            <CardContent className={cn(search ? "min-h-[56vh]": "h-[30vh]", "")}>
                                <DomainTable data={domains}/>
                            </CardContent>
                            <div className="px-6">
                                <Separator className="my-2"/>
                            </div>
                            <CardFooter className="flex justify-center w-full">
                                {
                                    !search && (
                                        <Link href="/domains" className="flex gap-2 items-center text-xs lg:text-sm hover:text-main-color duration-700">
                                            View All <ChevronRight size={18}/>
                                        </Link>
                                    )
                                }
                            </CardFooter>
                        </>
                    )
                }
                {
                    loading && (
                        <div className="h-[40vh] w-full flex items-center justify-center">
                            <Heading3 className="text-sm lg:text-md font-semibold">Loading...</Heading3>
                        </div>
                    )
                }
            </Card>
        </>
    )
};

export default Domains; 