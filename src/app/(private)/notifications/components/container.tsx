// notifications container 
"use client"; 
import React from "react"; 
import { SlidersHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import NotificationTable from "@/components/data-tables/notifications";
import { Heading3 } from "@/components/ui/typography";
import NotificationPopover from "@/components/popovers/notification"; 

import { getNotifications } from "@/lib/api-calls/notifications";
import { useCustomEffect, useSearch } from "@/hooks";
import { NotificationTableType } from "@/types";
import {numberWithCommas} from "@/utils/format-numbers"; 

const Container = () => {
    const [notifications, setNotifications] = React.useState<NotificationTableType[]>([]);
    const [count, setCount] = React.useState<number>(0); 
    const [unreadC, setUnreadC] = React.useState<number>(0); 

    const [loading, setLoading] = React.useState<boolean>(true); 

    const [selected, setSelected] = React.useState<any>(); 

    const searchParams = useSearch(); 
    const page = searchParams?.get("page") || "";
    const unread = searchParams?.get("unread") || ""; 

    const fetchNotifications = async () => {
        setLoading(true);
        
        let res = await getNotifications(page, unread); 
        
        if (res) {
            setNotifications(res.docs);
            setUnreadC(res.docs.map((not: NotificationTableType) => not.status === "unread").length)
            setCount(res.count); 
        };
        setLoading(false); 
    }; 

    useCustomEffect(fetchNotifications, [page, unread]);

    console.log(selected)

    return (
        <Card className="p-2 my-2">
            <CardHeader className="flex items-center justify-between gap-2 space-y-0 py-5 pb-2 sm:flex-row">
                <div>
                    <CardTitle className="text-md lg:text-lg font-bold">My Notifications</CardTitle>
                    <CardDescription className="text-xs lg:text-sm">Total {loading ? "...": `${count} notifications`} | {`${unreadC ? `${numberWithCommas(unreadC)} unread`: ""}`}</CardDescription>
                </div>
                <div className="flex gap-2 items-center">
                    {
                       (
                            selected?.length > 0 && 
                            selected?.map((not: NotificationTableType) => not.status === "unread").length > 0
                        ) && (
                            <Button
                                disabled={loading}
                                size="sm"
                            >
                                Mark as Read
                            </Button>
                        )
                    }
                    {
                        (selected?.length === 0 || !selected) && unreadC > 0 &&
                        (
                            <Button
                                disabled={loading}
                                size="sm"
                            >
                                Mark all as read
                            </Button>
                        )
                    }
                    {
                        selected?.length > 0 && (
                            <Button 
                                size="sm"
                                disabled={loading}
                                variant="destructive"
                            >
                                <Trash2 size={18}/>
                            </Button>
                        )
                    }
                    <NotificationPopover />
                    {/* <Button variant="secondary" size={"sm"}>
                        <SlidersHorizontal size={18}/>
                    </Button> */}
                </div>
            </CardHeader>
            <div className="px-6">
                <Separator className="my-2"/>
            </div>
            <CardContent className={"min-h-[79vh]"}>
                {!loading && (
                    <NotificationTable 
                        data={notifications}
                        setSelected={setSelected}
                    />
                )}
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