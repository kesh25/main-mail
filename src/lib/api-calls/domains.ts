import {getDoc, deleteDoc, patchDoc, postDoc} from "@/utils/api-wrappers"; 


// get user domains/business
export const getDomains = async (page?: string, limit?: number) => {
    let res = await getDoc(`/business?page=${page || 0}&limit=${limit || 30}`, true); 
    return res?.data || false; 
}; 

// get domain/business
export const getDomain = async (domainId: string) => {
    let res = await getDoc(`/business/${domainId}`, true); 
     
    return res?.data || false; 
};

// update domain/business
export const updateDomain = async (domainId: string, data: any) => {
    let res = await patchDoc(`/business/${domainId}`, data, true);
    return res?.status === "success" || false; 
};

// delete domain
export const deleteDomain = async (domainId: string) => {
    let res = await deleteDoc(`/business/${domainId}`, true); 
    return res?.status === "success" || false; 
}; 

// create domain || business
export const createDomain = async (data: any) => {
    let res = await postDoc(`/business`, data, true); 
    return res?.data || false; 
};

// get domain users 
export const getDomainUsers = async (domainId: string, page?: string, limit?: number, q?: string) => {
    let url = `/business/users/${domainId}`;
    url = `${url}?page=${page || 0}`; 
    url = `${url}&limit=${limit || 40}`; 
    if (q) url = `${url}&q=${q}`; 
    // `/business/users/${domainId}?page=${page || 0}&limit=${limit || 40}&${q ? "q=" + q: ""}`
    let res = await getDoc(url, true);
    return res?.data || false; 
};

// add user to domain
export const addUserToDomain = async (domainId: string, data: any, group?: boolean) => {
    let res = await postDoc(`/business/users/${group ? "group/": ""}${domainId}`, data, true);
    return res?.status === "success" || false; 
};

// update user in domain 
// export const updateDomainUser = async (domainId: string, )