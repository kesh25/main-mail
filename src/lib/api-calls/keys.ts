import {getDoc, deleteDoc, patchDoc, postDoc} from "@/utils/api-wrappers"; 


// generate key 

export const generateKey = async (domainId: string) => {
    let res = await getDoc(`/keys/generate/${domainId}`, true);
    return res?.data || false; 
};

// get api keys 
export const getApiKeys = async (domainId: string, page?: string) => {
    let res = await getDoc(`/keys/list/${domainId}?page=${page || 0}`, true);
    return res?.data || false; 
}; 

// get API Key || toggle visibility
export const getApiKey = async (keyId: string, visible?: boolean) => {
    let res = await getDoc(`/keys/${keyId}?${visible ? `visible=${visible}`: ""}`, true);
    return res?.data || false; 
};

// toggle active 
export const toggleActive = async (keyId: string, data: any) => {
    let res = await patchDoc(`/keys/${keyId}`, data, true); 
    return res?.status === "success" || false; 
};

// delete key
export const deleteApiKey = async (keyId: string) => {
    let res = await deleteDoc(`/keys/${keyId}`, true);
    return res?.status === "success" || false; 
}