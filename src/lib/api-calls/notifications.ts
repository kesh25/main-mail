import {getDoc, deleteDoc, patchDoc} from "@/utils/api-wrappers"; 


// get notifications
export const getNotifications = async (page?: string, unread?: string) => {

    let url = `/notifications?page=${page || 0}`; 
    if (unread) url = url + "&unread=1"; 

    let res = await getDoc(url, true); 
    return res?.data || false; 
}; 

export const deleteNotification = async (notificationId: string) => {
    let res = await deleteDoc(`/notifications/${notificationId}`, true); 
    return res?.status === "success" || false; 
}

export const updateNotification = async (notificationId: string) => {
    let res = await patchDoc(`/notifications/${notificationId}`, {}, true); 
    return res?.status === "success" || false; 
}