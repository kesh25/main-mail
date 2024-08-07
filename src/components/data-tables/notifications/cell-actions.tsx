"use client"; 

import React from "react";

import { Button } from "@/components/ui/button";
import CellAction from "../components/cell-action";
import Confirm from "@/components/modals/confirm";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";


import { NotificationTableType } from "@/types";
import { useNotificationState } from "@/stores/notifications";
import { deleteNotification } from "@/lib/api-calls/notifications";
import { createToast } from "@/utils/toast";

const NotificationCellActions = ({notification}: {notification: NotificationTableType}) => {
    const [openModal, setOpenModal] = React.useState<boolean>(false); 

    return (
        <>
            <DeleteModal 
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                notificationId={notification.id}
            />
            <CellAction
                id={notification.id}
            >
                <DropdownMenuItem
                    onClick={() => setOpenModal(true)}
                >
                    Delete
                </DropdownMenuItem>
            </CellAction>
        </>
    )
};

export default NotificationCellActions; 

const DeleteModal = (
    {isOpen, onClose, notificationId}:
    {
        isOpen: boolean; 
        onClose: () => void; 
        notificationId: string; 
    }
) => {
    const [loading, setLoading] = React.useState<boolean>(false); 

    const { addToDeletedNotifications } = useNotificationState();

    const handleDelete = async () => {
        setLoading(true)

        let res = await deleteNotification(notificationId); 

        if (res) {
            createToast("success", "Notification deleted!"); 

            addToDeletedNotifications(notificationId); 
            onClose(); 
        };

        setLoading(false)
    }

    return (
        <Confirm
            isOpen={isOpen}
            onClose={onClose}
            title="Delete notification"
            description="Do you wish to delete the notification? The action is irreversible and the notification cannot be recovered!"
        >
            <div className="flex w-full justify-end my-3">
                <Button 
                    disabled={loading}
                    variant="destructive"
                    onClick={handleDelete}
                    className="min-w-[150px]"
                >
                    Proceed
                </Button>
            </div>
        </Confirm>
    )
}