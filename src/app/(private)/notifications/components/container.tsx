// notifications container 
"use client"; 
import React from "react"; 

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SlidersHorizontal } from "lucide-react"
import { NotificationTableType } from "@/components/data-tables/notifications/columns";
import NotificationTable from "@/components/data-tables/notifications";
import { useCustomEffect, useSearch } from "@/hooks";
import { getNotifications } from "@/lib/api-calls/notifications";
import { Heading3 } from "@/components/ui/typography";

const Container = () => {
    const [notifications, setNotifications] = React.useState<NotificationTableType[]>([]);
    const [count, setCount] = React.useState<number>(0); 

    const [loading, setLoading] = React.useState<boolean>(true); 

    const searchParams = useSearch(); 
    const page = searchParams?.get("page") || "";
    const unread = searchParams?.get("unread") || ""; 

    const fetchNotifications = async () => {
        setLoading(true);
        
        let res = await getNotifications(page, unread); 
        console.log(res)
        if (res) {
            setNotifications(res.docs);
            setCount(res.count); 
        };
        setLoading(false); 
    }; 

    useCustomEffect(fetchNotifications, [page, unread])

    return (
        <Card className="p-2 my-2">
            <CardHeader className="flex items-center justify-between gap-2 space-y-0 py-5 pb-2 sm:flex-row">
                <div>
                    <CardTitle className="text-md lg:text-lg font-bold">My Notifications</CardTitle>
                    <CardDescription className="text-xs lg:text-sm">Found {loading ? "...": `${count} notifications`}</CardDescription>
                </div>
                <div className="flex gap-2 items-center">
                    <Button variant="ghost" size={"icon"}>
                        <SlidersHorizontal size={18}/>
                    </Button>
                </div>
            </CardHeader>
            <div className="px-6">
                <Separator className="my-2"/>
            </div>
            <CardContent className={"min-h-[79vh]"}>
                {!loading && <NotificationTable data={notifications}/>}
                {
                    loading && (
                        <div className="w-full h-full flex items-center justify-center">
                            <Heading3 className="text-sm lg:text-md font-semibold">Loading...</Heading3>
                        </div>
                    )
                }
            </CardContent>
            <div className="px-6">
                <Separator className="my-2"/>
            </div>
            <CardFooter className="flex justify-center w-full">
                 
            </CardFooter>
        </Card>
    )
};

export default Container; 