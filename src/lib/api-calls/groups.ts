import {getDoc, postDoc, patchDoc, deleteDoc} from "@/utils/api-wrappers";

export const getGroups = async (domain: string, page?: string, q?: string) => {
    let res = await getDoc(`/groups/${domain}?page=${page || 0}${q ? `&q=${q}`: ""}`, true);
    return res?.data || false; 
}

export const createGroup = async (domainId: string, data: any) => {
    let res = await postDoc(`/groups/${domainId}`, data, true); 
    return res?.data?.doc || false; 
};

export const updateGroup = async (groupId: string, data: any) => {
    let res = await patchDoc(`/groups/${groupId}`, data, true); 
    return res?.status === "success" || false; 
};

export const getGroupUsers = async (groupId: string, tab: string, page: number, q?: string) => {
    let res = await getDoc(`/groups/users/${groupId}?tab=${tab}&page=${page || 0}${q ? `&q=${q}`: ""}`, true);
    return res?.data || false; 
}

export const toggleUsers = async (groupId: string, users: string[]) => {
    let res = await patchDoc(`/groups/users/${groupId}`, users, true); 
    return res?.data || false; 
};

export const deleteGroup = async (groupId: string) => {
    let res = await deleteDoc(`/groups/${groupId}`, true);
    return res?.status === "success" || false; 
}; 