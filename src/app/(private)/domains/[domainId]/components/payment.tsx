// user container 
"use client"; 

import React from "react"; 
import { RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading2, Paragraph } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { PaymentModal } from "@/components/data-tables/payments/cell-actions"; 
import TabContainer from "./tab-container"; 
import PaymentTable from "@/components/data-tables/payments";

import { PaymentTableType } from "@/types";
import {getDomainPayments} from "@/lib/api-calls/payment"; 
import {useSearch, useCustomEffect} from "@/hooks"
import { usePaymentState } from "@/stores/payment";

const PaymentContainer = ({domain}: {domain: string}) => {
    const [payments, setPayments] = React.useState<PaymentTableType[]>([]);
    const [count, setCount] = React.useState<number>(0); 
    const [mounted, setMounted] = React.useState<boolean>(false); 
    const [loading, setLoading] = React.useState<boolean>(true); 
    const [pending, setPending] = React.useState<number>(0); 
    const [openPayModal, setOpenPayModal] = React.useState<boolean>(false); 

    const searchParams = useSearch(); 
    const page = searchParams?.get("page") || ""; 
    const status = searchParams?.get("status") || ""; 
    const st = searchParams?.get("st") || ""; 

    const { updatedPayments } = usePaymentState(); 

    React.useEffect(() => setMounted(true), [])

    const fetchPayments = async () => {
        if (!mounted) return; 
        setLoading(true); 

        let res = await getDomainPayments(domain, page, status);

        if (res) {
            setPayments(res.docs);
            setCount(res.count);
            setPending(res.pending || 0)
        }
        setLoading(false)
    };

    useCustomEffect(fetchPayments, [mounted, page, status]);

    // listen for a payment update
    React.useEffect(() => {
        if (!mounted || updatedPayments.length === 0) return; 
        
        let updated: PaymentTableType[] = []; 
        for (let i = 0; i < payments.length; i++) {
            let curr = payments[i]; 

            let confirm = updatedPayments.filter((doc: PaymentTableType) => doc.id === curr.id); 

            if (confirm.length > 0) {
                updated.push({
                    ...confirm[0], 
                    status: "disputed"
                })
            } else updated.push(curr)
        };

        setPayments([]);
        setPayments(updated); 
        
    }, [updatedPayments]);

    return (
        <>
            {
                pending > 0 && (
                    <PaymentModal 
                        payment={payments.filter(pay => pay.status === "pending")[0]}
                        isOpen={openPayModal}
                        onClose={() => setOpenPayModal(false)}
                        type="pay"
                        pending={true}
                    />

                )

            }
            <TabContainer
                title="Payment"
                subtitle={`Total: ${loading ? "...": `${count} item${count === 1 ? "": "s"}`}`}
                headerComponent={
                    <div className="flex items-center gap-1">
                        {
                            pending > 0 ? (
                                <>
                                    <Button
                                        variant={"outline"}
                                        onClick={() => setOpenPayModal(true)}
                                    >
                                        Pay Pending
                                    </Button>
                                    
                                
                                </>
                            ): <></>
                        }
                        <Button
                            size="sm"
                            onClick={fetchPayments}
                        >
                            <RefreshCcw size={18}/>
                        </Button>
                    </div>
                }
            
            >
                {
                    !loading && st && (
                        <Card className="p-3 my-2 border-main-color">
                            <Paragraph className="font-bold text-sm lg:text-md">Congrats on adding your domain to our platform. You need to make the first payment to proceed before sending or receiving any email begins!</Paragraph>
                        </Card>
                    )
                }
                {
                    loading && (
                        <div className="w-full h-[40vh] flex justify-center items-center">
                            <Heading2 className="text-md lg:text-base">Loading....</Heading2>
                        </div>
                    )
                }
                {
                    !loading && <PaymentTable data={payments}/>
                }
            </TabContainer>
        </>
    )
};

export default PaymentContainer; 