import {getDoc, deleteDoc, patchDoc} from "@/utils/api-wrappers"; 


// get notifications
export const getNotifications = async (page?: string, unread?: string, old?: boolean) => {

    let url = `/notifications?page=${page || 0}`; 
    if (unread) url = url + "&unread=1"; 
    if (old) url = url + "&old=1"; 

    let res = await getDoc(url, true); 
    return res?.data || false; 
}; 

export const deleteNotifications = async (data: string[]) => {
    let res = await patchDoc(`/notifications/list/delete`, data, true); 
    return res?.status === "success" ; 
}

export const updateNotifications = async (data: string[], all?: boolean) => {
    let res = await patchDoc(`/notifications?${all ? "all=1": ""}`, data, true); 
    return res?.status === "success" || false; 
};

export const deleteNotification = async (notificationId: string) => {
    let res = await deleteDoc(`/notifications/${notificationId}`, true);
    return res?.status === "success"
}