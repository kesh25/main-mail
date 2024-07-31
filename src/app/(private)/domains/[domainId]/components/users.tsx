// users container 
"use client"; 
import React from "react";
import Link from "next/link"; 
import { ChevronRight } from "lucide-react"; 

import { Card } from "@/components/ui/card"; 
import { Heading2, Paragraph } from "@/components/ui/typography"; 
import { Separator } from "@/components/ui/separator"; 
import UserTable from "@/components/data-tables/users";
import { useCustomEffect, useSearch } from "@/hooks";
import { UserTableType } from "@/components/data-tables/users/columns";
import {getDomainUsers} from "@/lib/api-calls/domains"

const Users = ({domainId}: {domainId: string}) => {
    const [users, setUsers] = React.useState<UserTableType[]>([]);
    const [count, setCount] = React.useState<number>(0); 

    const [loading, setLoading] = React.useState<boolean>(true); 
    const searchParams = useSearch(); 

    const tab = searchParams?.get("tab"); 
    const d = searchParams?.get("d"); 

    return (
        <>
            {
                !tab && (
                    <Card className="px-6 py-2  w-full">
                        <Heading2 className="text-md lg:text-lg">Domain Users</Heading2>
                        <Paragraph className="text-xs lg:text-sm text-gray-500 my-2">Found {loading ? "...": `${count} users`}</Paragraph>
                        <Separator className="my-2"/>
                        <UsersItems 
                            domain={domainId}
                            limit={10} 
                            users={users} 
                            setUsers={setUsers} 
                            loading={loading} 
                            setLoading={setLoading} 
                            count={count} 
                            setCount={setCount}
                        />
                        <Separator className="my-2"/>
                        <div className=" pb-5 flex justify-center">
                            <Link href={`/domains/${domainId}?d=${d}&tab=users`} className="text-xs lg:text-sm hover:text-main-color duration-700 flex items-center gap-2">View All <ChevronRight size={18}/></Link>
                        </div>
                    </Card>
                )
            }
        </>
    )
};

export default Users; 


export const fetchUsers = async (
    setUsers: React.Dispatch<UserTableType[]>,
    setCount: React.Dispatch<number>,
    setLoading: React.Dispatch<boolean>,
    page: string,
    limit: number,
    domain: string,
    q?: string
) => {
    if (!domain) return; 
    setLoading(true);
    setUsers([]); 

    let res = await getDomainUsers(domain, page, limit, q);
    
    if (res) {
        setCount(res.count);
        setUsers(res.docs); 
    }
    setLoading(false); 
}; 


export const UsersItems = (
    {limit, users, setUsers, loading, setLoading, count, setCount, domain}: 
    {
        limit: number;
        users: UserTableType[];
        setUsers: React.Dispatch<UserTableType[]>;
        loading: boolean; 
        setLoading: React.Dispatch<boolean>;
        count: number; 
        setCount: React.Dispatch<number>; 
        domain: string; 
    }
) => {
     const [mounted, setMounted] = React.useState<boolean>(false); 


    const searchParams = useSearch(); 
    const page = searchParams?.get("page") || "0";
    const q = searchParams?.get("q") || "";

    React.useEffect(() => setMounted(true), [])

    useCustomEffect(() => {
        if (!mounted) return; 
        fetchUsers(
            setUsers, setCount, setLoading, page, limit, domain, q
        )
    }, [mounted, page, q])

    return (
        <>
            {
                loading && (
                    <div className="h-[30vh] w-full flex items-center justify-center">
                        <Heading2 className="text-md lg:text-lg">Loading...</Heading2>
                    </div>
                )
            }
            {
                !loading && (
                    <UserTable 
                        data={users}
                    />
                )
            }
        </>
    )
}