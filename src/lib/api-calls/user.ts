import {getDoc, postDoc, patchDoc, deleteDoc} from "@/utils/api-wrappers";


// create user
export const createUser = async (domain: string, data: any) => {
    let res = await postDoc(`/business/users/${domain}`, data, true); 

    return res?.data?.doc || false; 
}
