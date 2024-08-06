import {getDoc, postDoc, patchDoc, deleteDoc} from "@/utils/api-wrappers";


// create user
export const createUser = async (domain: string, data: any) => {
    let res = await postDoc(`/business/users/${domain}`, data, true); 
    return res?.data?.doc || false; 
}; 


// reset password 
export const resetPassword = async (userId: string) => {
    let res = await getDoc(`/users/admin/${userId}`, true); 
    return res?.status === "success"; 
}

// update user 
export const updateUser = async (userId: string, data: any) => {
    let res = await patchDoc(`/users/admin/${userId}`, data, true);
    return res?.status === "success"; 
}

// delete user
export const deleteUser = async (userId: string) => {
    let res = await deleteDoc(`/users/admin/${userId}`, true); 
    return res?.status === "success";
}