"use client";

import React from "react";

import AppInput from "@/components/common/app-input";
import { Button } from "@/components/ui/button";
import CellAction from "../components/cell-action";
import Confirm from "@/components/modals/confirm";
import FormTitle from "@/components/forms/components/form-title";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import { PaymentTableType } from "@/types";
import { numberWithCommas } from "@/utils/format-numbers";
import { makePayment, updatePayment } from "@/lib/api-calls/payment";
import { createToast } from "@/utils/toast";
import { validatePhone } from "@/utils/validation";
import { usePaymentState } from "@/stores/payment";

type ModalType = "pay" | "dispute" | "invoice" | undefined; 

const PaymentCellActions = ({ payment }: { payment: PaymentTableType }) => {
    const [openModal, setOpenModal] = React.useState<boolean>(false); 
    const [type, setType] = React.useState<ModalType>(); 

    return (
        <>
            <PaymentModal 
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setType(undefined); 
                }}
                payment={payment}
                type={type}
            />
            <CellAction
                id={payment.id}
            >
                <>
                    {
                        payment.status === "pending" && (
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                    setType("pay");
                                    setOpenModal(true)
                                }}
                            >
                                Make payment
                            </DropdownMenuItem>
                        )
                    }
                    {
                        payment.status === "paid" && (
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                    setType("invoice");
                                    setOpenModal(true)
                                }}
                            >
                                Generate Invoice
                            </DropdownMenuItem>

                        )
                    }
                    {
                        payment.status === "pending" && (
                            <>
                                <Separator />
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setType("dispute");
                                        setOpenModal(true)
                                    }}
                                >
                                    Dispute
                                </DropdownMenuItem>
                            </>
                        )
                    }
                    {
                        payment.status === "disputed" && (
                            <>
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setType("dispute");
                                        setOpenModal(true)
                                    }}
                                >
                                    Track
                                </DropdownMenuItem>
                            </>
                        )
                    }
                </>
            </CellAction>
        </>
    )
};

export default PaymentCellActions; 

// make payment 
const PaymentModal = (
    {payment, isOpen, onClose, type}: 
    {
        payment: PaymentTableType;
        isOpen: boolean; 
        onClose: () => void;
        type: ModalType; 
    }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [phone, setPhone] = React.useState<string>(""); 
    const [reason, setReason] = React.useState<string>(""); 

    const { updatePayments } = usePaymentState()

    const handleInitiatePayment = async () => {
        if (!phone || !validatePhone(phone)) {
            createToast("error", "Provide a valid phone number");
            return; 
        }
        setLoading(true); 

        let res = await makePayment(payment.id, {phone}); 

        if (res) {
            createToast("success", "Payment initiated!");
            onClose()
        };
        setLoading(false); 
    }; 

    const handleUpdatePayment = async () => {
        if (!reason) {
            createToast("error", "Provide a reason for dispute");
            return;
        };
        setLoading(true); 

        let res = await updatePayment(payment.id, {reason}); 

        if (res) {
            createToast("success", "Dispute submitted");
            updatePayments(payment); 
            onClose(); 
        };
        setLoading(false)
    };

    return (
        <Confirm
            isOpen={isOpen}
            onClose={onClose}
            title={
                type === "pay" ?
                    "Make payment":
                type === "dispute" ?
                    "Submit dispute":
                    "Generate invoice"
            }
            description={
                type === "pay" ?
                    `Proceed with making a payment of KES: ${numberWithCommas(payment.amount)} for the ${payment.service} service using your ${payment.mode}`:
                type === "dispute" ? 
                    `Do you wish to dispute the payment of KES: ${numberWithCommas(payment.amount)} for the ${payment.service} service? Our team will look into it and contact you as soon as possible!`:
                    "Generate and download the invoice for this particular payment."
            }
        >
            <>
                {
                    type === "pay" && payment.mode === "MPESA" && (
                        <>
                            <FormTitle title="M-pesa number"/>

                            <AppInput 
                                value={phone}
                                setValue={setPhone}
                                placeholder={"254711000222"}
                                disabled={loading}
                            />
                        </>
                    )
                }
                {
                    type === "dispute" && (
                        <>
                            <FormTitle title="Enter dispute reason"/>

                            <AppInput 
                                value={reason}
                                setValue={setReason}
                                placeholder={"I was overcharged more than the resources I used."}
                                disabled={loading}
                                textarea={true}
                            />
                        </>
                    )
                }
                <div className="w-full flex justify-end my-2">
                    <Button
                        className="min-w-[200px]"
                        disabled={loading}
                        onClick={
                            type === "pay" ? 
                                handleInitiatePayment:
                            type === "dispute" ? 
                                handleUpdatePayment:
                                () => {}
                        }
                    >
                        {type === "pay" && "Initiate Payment"}
                        {type === "dispute" && "Submit dispute"}
                        {type === "invoice" && "Generate Invoice"}
                    </Button>
                </div>

            </>
        </Confirm>
    )
}; 


 