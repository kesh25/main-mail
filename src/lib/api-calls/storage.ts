// storage api calls

import { getDoc, patchDoc } from "@/utils/api-wrappers"; 

// get business storage 
export const getBusinessStorage = async (domain: string) => {
    let res = await getDoc(`/storage/business/${domain}`, true); 
    return res?.data || false; 
}; 

// file distribution graph 
export const getBusinessFileDistribution = async (domain: string) => {
    let res = await getDoc(`/storage/business/files/${domain}`, true); 
    return res?.data || false;  
};

// get business users' storages
export const getBusinessUsersStorage = async (domain: string, page?: string) => {
    let res = await getDoc(`/storage/business/users/${domain}?page=${page || 0}`, true); 
    return res?.data || false; 
}

// upgrade storage 
export const upgradeBusinessStorage = async (domain: string, data: any) => {
    let res = await patchDoc(`/storage/business/${domain}`, data, true);
    return res?.status === "success"; 
}