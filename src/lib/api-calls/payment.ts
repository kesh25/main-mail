import {getDoc, postDoc, patchDoc} from "@/utils/api-wrappers"; 

// make payment
export const makePayment = async (paymentId: string, data: any) => {
    let res = await postDoc(`/payments/initiate/${paymentId}`, data, true); 
    return res?.status === "success"; 
};

// update payment
export const updatePayment = async (paymentId: string, data: any) => {
    let res = await patchDoc(`/payments/${paymentId}`, data, true);
    return res?.status === "success"; 
}


// get domain payments
export const getDomainPayments = async (domainId: string, page: string, status?: string) => {
    let res = await getDoc(`/payments/domain/${domainId}?page=${page || 0}&${status ? "status=" + status: ""}`, true); 
    return res?.data || false;
}