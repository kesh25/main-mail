// add group modal 
"use client"; 
import React from "react"; 
import Link from "next/link"; 
import { useRouter } from "next/navigation"; 

import { ChevronLeft } from "lucide-react";

import AppInput from "../common/app-input"; 
import {Button} from "../ui/button"; 
import { Card } from "../ui/card";
import FormTitle from "../forms/components/form-title";
import { Heading3, Paragraph } from "../ui/typography";
import {Modal} from "./modal";

import { numberWithCommas } from "@/utils/format-numbers";
import { cn } from "@/lib/utils";
import { createToast } from "@/utils/toast"; 
import {createDomain} from "@/lib/api-calls/domains"; 
import { DomainTableType } from "@/types";

interface AddDomainModalProps {
    setDomains: React.Dispatch<DomainTableType[]>;
    domains: DomainTableType[]; 
    isOpen: boolean; 
    onClose: () => void; 
     
};



const AddDomainModal: React.FC<AddDomainModalProps> = ({
    setDomains, domains, isOpen, onClose, 
}) => {
    const {push} = useRouter(); 

    const [loading, setLoading] = React.useState<boolean>(false); 
    const [domain, setDomain] = React.useState<string>("");
    const [sendingDomain, setSendingDomain] = React.useState<string>("");
    const [plan, setPlan] = React.useState<PlanType>(); 

    const [stage, setStage] = React.useState<number>(0); 

    const handleCreateDomain = async () => {
        if (!domain || !sendingDomain) {
            createToast("error", "Domain is required!");
            return; 
        };

        if (!plan) {
            createToast("error", "Select a plan to proceed!");
            return; 
        }

        // validate sending domain 
        let sendingArr = sendingDomain.split("."); 
        let sending_domain_check = sendingArr.length > 1 ? `${sendingArr[1]}.${sendingArr[2]}`: null; 

        if (!sending_domain_check) {
            createToast("error", "Invalid sending domain.");
            return; 
        };

        if (sending_domain_check.toLowerCase() !== domain.toLowerCase()) {
            createToast("error", "The sending domain does not match the main domain!");
            return; 
        }
        

        setLoading(true); 

        let doc = {
            domain: domain.toLowerCase(), 
            sending_domain: sendingDomain.toLowerCase(), 
            plan, 
        }; 

        let res = await createDomain(doc); 

        if (res) {
            createToast("success", "Domain created!"); 
            push(`/domains/${res.doc}?d=${domain}&tab=payment&st=new`)
        };

        setLoading(false); 
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add Domain"
        >
            {
                stage === 1 && <Button disabled={loading} className="text-sm gap-2 items-center" variant={"secondary"} size={"sm"} onClick={() => setStage(0)}><ChevronLeft size={18}/> Back</Button>
            }
            {
                stage === 0 && (
                    <>
                        <FormTitle title={"Domain"}/>
                        <AppInput 
                            value={domain}
                            setValue={setDomain}
                            placeholder="vuteer.com"
                            containerClassName="my-3"
                            disabled={loading}

                        />
                        <FormTitle title={"Sending Domain"}/>
                        <Paragraph className="text-xs text-gray-500 my-1">The sub-domain that will be used to send your mails</Paragraph>
                        <AppInput 
                            value={sendingDomain}
                            setValue={setSendingDomain}
                            placeholder="mail.vuteer.com"
                            containerClassName="my-3"
                            disabled={loading}
                        />
                    </>
                )
            }
            {
                stage === 1 && (
                    <>
                        <FormTitle title={"Select Plan"}/>
                        <Paragraph className="text-xs my-2">
                            You can read more about the plans <Link href="/pricing" target="_blank" className="text-main-color hover:text-gray-500 duration-700">here</Link>.
                        </Paragraph>
                        <div className={"grid grid-cols-1 lg:grid-cols-3 gap-2"}>
                            <Plan 
                                title="basic"
                                price={999}
                                plan={plan}
                                setPlan={setPlan}
                            />
                            <Plan 
                                title="premium"
                                price={2999}
                                plan={plan}
                                setPlan={setPlan}
                            />
                            <Plan 
                                title="startup"
                                price={4999}
                                plan={plan}
                                setPlan={setPlan}
                            />
                        </div>
                    </>
                )
            }
            <div 
                className="flex justify-end my-3"
                >
                <Button
                    onClick={stage === 0 ? () => setStage(1): handleCreateDomain}
                    disabled={loading}
                >
                    {
                        stage === 1 ? `Add${loading ? "ing...": ""} Domain`: "Next Step"
                    }
                </Button>
            </div>
        </Modal>
    )
};

export default AddDomainModal; 

type PlanType = "basic" | "premium" | "startup" | "custom"; 

const Plan = ({title, price, plan, setPlan}: {title: PlanType, price: number, plan: PlanType | undefined, setPlan: React.Dispatch<PlanType>}) => {

    return (
        <Card 
            className={cn(plan === title ? "border-main-color": "", "border-[0.03rem] cursor-pointer duration-700 hover:border-main-color p-3 relative h-[90px] flex items-center justify-center")}
            onClick={() => setPlan(title)}
        >
            <Paragraph className="absolute right-0 top-0 m-3 capitalize text-xs text-gray-500">{title}</Paragraph>
            <Heading3 className="text-sm lg:text-md">KES: {numberWithCommas(price)}</Heading3>
        </Card>
    )
}