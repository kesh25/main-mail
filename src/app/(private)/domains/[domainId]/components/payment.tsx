// user container 
"use client"; 

import React from "react"; 
import TabContainer from "./tab-container"; 
import PaymentTable from "@/components/data-tables/payments";
import { Heading2, Paragraph } from "@/components/ui/typography";
import { PaymentTableType } from "@/components/data-tables/payments/columns";

import {getDomainPayments} from "@/lib/api-calls/payment"; 
import {useSearch, useCustomEffect} from "@/hooks"
import { Card } from "@/components/ui/card";

const PaymentContainer = ({domain}: {domain: string}) => {
    const [payments, setPayments] = React.useState<PaymentTableType[]>([]);
    const [count, setCount] = React.useState<number>(0); 

    const [loading, setLoading] = React.useState<boolean>(true); 
    const searchParams = useSearch(); 
    const page = searchParams?.get("page") || ""; 
    const status = searchParams?.get("status") || ""; 
    const st = searchParams?.get("st") || ""; 

    const fetchPayments = async () => {
        setLoading(true); 

        let res = await getDomainPayments(domain, page, status);

        if (res) {
            setPayments(res.docs);
            setCount(res.count)
        }
        setLoading(false)
    };

    useCustomEffect(fetchPayments, [page, status])
    return (
        <TabContainer
            title="Payment"
            subtitle={`Total: ${loading ? "...": `${count} item${count === 1 ? "": "s"}`}`}
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
    )
};

export default PaymentContainer; 