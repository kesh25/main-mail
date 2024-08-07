"use client"; 

import React from "react"; 

import { useNotificationState } from "@/stores/notifications"; 
import { NotificationTableType } from "@/types"; 


interface NotificationUpdateProps {
    notifications: NotificationTableType[];
    setNotifications: React.Dispatch<NotificationTableType[]>;
    count: number; 
    setCount: React.Dispatch<number>; 
    unreadC: number; 
    setUnreadC: React.Dispatch<number>; 
}; 

const NotificationUpdate: React.FC<NotificationUpdateProps> = (
    {notifications, setNotifications, count, setCount, unreadC, setUnreadC}
) => {
    const { deletedNotifications, editedNotifications } = useNotificationState(); 


    // Update deleted notifications
    React.useEffect(() => {
        if (deletedNotifications.length === 0) return; 

        let updated = []; 
        let updatedCount = count; 
        let updatedUnread = unreadC; 

        for (let i = 0; i < notifications.length; i++) {
            let curr = notifications[i]; 

            let confirm = deletedNotifications.filter(not => not === curr.id); 

            if (confirm.length > 0) {
                updatedCount = updatedCount - 1; 
                if (curr.status === "unread") updatedUnread = updatedUnread - 1; 
            } else updated.push(curr)
        };

        setNotifications([]); 
        setCount(updatedCount);
        setUnreadC(updatedUnread)
        setNotifications(updated)
    }, [deletedNotifications]);

    // update updated notifications 
    React.useEffect(() => {
        if (editedNotifications.length === 0) return; 

        let updated = [];
        let updatedUnread = unreadC; 

        for (let i = 0; i < notifications.length; i++) {
            let curr = notifications[i]; 

            let confirm = editedNotifications.filter(not => not.id === curr.id); 

            if (confirm.length > 0) {
                updated.push(confirm[0]);
                updatedUnread = updatedUnread - 1
            } else updated.push(curr)
        };

        setNotifications([])
        setNotifications(updated);
        setUnreadC(updatedUnread)
    }, [editedNotifications])
    return (
        <></>
    )
};

export default NotificationUpdate; 