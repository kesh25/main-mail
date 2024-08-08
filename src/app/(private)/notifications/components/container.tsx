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

import { deleteNotifications, getNotifications, updateNotifications } from "@/lib/api-calls/notifications";
import { useCustomEffect, useSearch } from "@/hooks";
import { NotificationTableType } from "@/types";
import {numberWithCommas} from "@/utils/format-numbers"; 
import NotificationUpdate from "./notification-update";
import { createToast } from "@/utils/toast";
import { useNotificationState } from "@/stores/notifications";

const Container = () => {
    const [notifications, setNotifications] = React.useState<NotificationTableType[]>([]);
    const [count, setCount] = React.useState<number>(0); 
    const [unreadC, setUnreadC] = React.useState<number>(0); 

    const [mounted, setMounted] = React.useState<boolean>(false); 
    const [loading, setLoading] = React.useState<boolean>(true); 
    const [btnLoading, setBtnLoading] = React.useState<boolean>(false); 

    const [selected, setSelected] = React.useState<any>(); 

    const searchParams = useSearch(); 
    const page = searchParams?.get("page") || "";
    const unread = searchParams?.get("unread") || ""; 
    const old = searchParams?.get("old") === "1" ? true: false;

    const { addToDeletedNotifications, addToEditedNotifications } = useNotificationState(); 

    React.useEffect(() => setMounted(true), []); 

    const fetchNotifications = async () => {
        setLoading(true);
        
        let res = await getNotifications(page, unread, old); 
        
        if (res) {
            setNotifications(res.docs);
            setUnreadC(res.unread);
            setCount(res.count); 
        };
        setLoading(false); 
    }; 

    useCustomEffect(fetchNotifications, [page, unread, mounted, old]);

    const handleDelete = async () => {
        if (selected.length === 0) return; 
        setBtnLoading(true);

        const data: string[] = selected.map((not: NotificationTableType) => not.id); 
        let res = await deleteNotifications(data); 

        if (res) {
            createToast("success", "Notification(s) deleted!"); 

            for (let i = 0; i < data.length; i++) {
                addToDeletedNotifications(data[i]); 
            };
            setSelected([])
        };
        setBtnLoading(false); 
        
    }; 

    const handleMarkAsRead = async (all?: boolean) => {
        if (!all && selected.length === 0) return; 
        if (all && !unreadC) {
            createToast("error", "Nothing to update!");
            return; 
        }
        setBtnLoading(true);

        const data: string[] = all ? []: selected.map((not: NotificationTableType) => not.id); 
        let res = await updateNotifications(data, all); 

        if (res) { 
            createToast("success", "Notification(s) updated!");

             
            for (let i = 0; i < (all ? notifications: data).length; i++) {
                
                if (all){
                    let current = notifications[i];  
                    addToEditedNotifications({
                        ...current, status: "read"
                    })
                } else {
                    let curr = selected.filter((s: NotificationTableType) => s.id === data[i]); 
    
                    if (curr.length > 0) {
                        addToEditedNotifications({
                            ...curr[0], status: "read"
                        })
                    }

                }
            };

            setSelected([])
        };
        setBtnLoading(false); 
    }; 

    // const handleDeleteOne = async () => {}; 

    return (
        <>
            <NotificationUpdate 
                count={count}
                notifications={notifications}
                unreadC={unreadC}
                setCount={setCount}
                setNotifications={setNotifications}
                setUnreadC={setUnreadC}
            />
            <Card className="p-2 my-2">
                <CardHeader className="flex items-center justify-between gap-2 space-y-0 py-5 pb-2 sm:flex-row">
                    <div>
                        <CardTitle className="text-md lg:text-lg font-bold">My Notifications</CardTitle>
                        <CardDescription className="text-xs lg:text-sm">Total {loading ? "...": `${count} notifications`}  {`${unreadC > 0 ? ` | ${numberWithCommas(unreadC)} unread`: ""}`}</CardDescription>
                    </div>
                    <div className="flex gap-2 items-center">
                        {
                        (
                                selected?.length > 0 && 
                                selected?.map((not: NotificationTableType) => not.status === "unread").length > 0
                            ) && (
                                <Button
                                    disabled={loading || btnLoading}
                                    size="sm"
                                    onClick={() => handleMarkAsRead(false)}
                                >
                                    Mark as Read
                                </Button>
                            )
                        }
                        {
                            (selected?.length === 0 || !selected) && unreadC > 0 &&
                            (
                                <Button
                                    disabled={loading || btnLoading}
                                    size="sm"
                                    onClick={() => handleMarkAsRead(true)}
                                >
                                    Mark all as read
                                </Button>
                            )
                        }
                        {
                            selected?.length > 0 && (
                                <Button 
                                    size="sm"
                                    disabled={loading || btnLoading}
                                    variant="destructive"
                                    onClick={handleDelete}
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
        </>
    )
};

export default Container; 