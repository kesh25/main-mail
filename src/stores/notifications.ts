import {create} from 'zustand'; 
import { NotificationTableType } from "@/types"; 

type NotificationStateType = {
    deletedNotifications: string[]; 
    editedNotifications: NotificationTableType[]; 
    addToDeletedNotifications: (notification: string) => void; 
    addToEditedNotifications: (notification: NotificationTableType) => void; 
}; 


export const useNotificationState = create<NotificationStateType>((set, get) => ({
    deletedNotifications: [],
    editedNotifications: [],
    addToDeletedNotifications: (notification: string) => {
        const { deletedNotifications } = get(); 
        let updated = [...deletedNotifications.filter(not => not !== notification), notification]
        set({deletedNotifications: updated}); 

        setTimeout(() => set({deletedNotifications}), 1500)
    },
    addToEditedNotifications: (notification: NotificationTableType) => {
        const { editedNotifications } = get(); 
        let updated = [...editedNotifications.filter(not => not.id !== notification.id), notification]; 
        set({editedNotifications: updated});
        setTimeout(() => set({editedNotifications}), 1500)

    }
}))