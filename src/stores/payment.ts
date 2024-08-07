import {create} from 'zustand'; 
import { PaymentTableType } from "@/types"; 

type PaymentState = {
    updatedPayments: PaymentTableType[];
    updatePayments: (payment: PaymentTableType) => void; 
};

export const usePaymentState = create<PaymentState>((set, get) => ({
    updatedPayments: [],
    updatePayments: (payment: PaymentTableType) => {
        let { updatedPayments } = get(); 

        let updated = [...updatedPayments.filter(doc => doc.id !== payment.id), payment]; 
        set({updatedPayments: updated});
        setTimeout(() => set({updatedPayments}), 1500)
    }
}))