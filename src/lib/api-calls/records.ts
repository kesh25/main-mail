// get domain records 

import {getDoc, postDoc} from "@/utils/api-wrappers"; 

// get domain records
export const getDomainRecords = async (domainId: string) => {
    let res = await getDoc(`/records/${domainId}`, true); 
    return res?.data?.doc || false; 
}; 

// verify domain 
export const verifyDomain = async (domainId: string) => {
    let res = await getDoc(`/records/verify/${domainId}`, true); 

    return res?.data?.state || false; 
}