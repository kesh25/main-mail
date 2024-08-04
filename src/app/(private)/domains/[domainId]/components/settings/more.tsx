// more settings
"use client"; 

import React from "react"; 

import AppCheckbox from "@/components/common/checkbox";
import AppInput from "@/components/common/app-input"; 
import {Button} from "@/components/ui/button"; 

import { Card } from "@/components/ui/card";
import FormTitle from "@/components/forms/components/form-title"; 

import { Heading3, Paragraph } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

import SettingsContainer from "./settings-container"; 
import { cn } from "@/lib/utils";

const More = ({domain}: {domain: string}) => {


    return (
        <SettingsContainer
            title="More Settings"
        >
            <MoreSettings 
                email=""
                phone=""
                production={true}
            />
           <Separator className="my-3"/>
            <LetterHead  domain={domain}/>
            <Separator className="my-3"/>
            {/* <div className="h-[40vh]"/> */}

            <Upgrade 
                domain={domain}
                plan="basic"
            />
        </SettingsContainer>
    )
};

export default More; 

const MoreSettings = (
    {email, phone, production}: 
    {
        email: string; 
        phone: string; 
        production: boolean; 
    }
) => {
    const [currentEmail, setCurrentEmail] = React.useState<string>(email)
    const [currentPhone, setCurrentPhone] = React.useState<string>(phone);
    const [currentProduction, setCurrentProduction] = React.useState<boolean>(production); 

    return (
        <div className="flex flex-col gap-2">
            <FormTitle title="Contact Email"/>
            <AppInput 
                value={currentEmail}
                setValue={setCurrentEmail}
                placeholder="name@domain.com"
            />
            <FormTitle title="Contact Phone"/>
            <AppInput 
                value={currentPhone}
                setValue={setCurrentPhone}
                placeholder="+254700111222"
            />
            <Paragraph className="my-2 text-xs lg:text-sm font-bold text-destructive">To receive and send emails, the domain should be in production!</Paragraph>
            <AppCheckbox 
                checked={currentProduction}
                setChecked={setCurrentProduction}
                text={`App state - ${currentProduction ? "Production": "Development"}`}
            />
            {
                (email !== currentEmail) ||
                (phone !== currentPhone) ||
                (production !== currentProduction) && (
                    <Button className="my-2 w-[200px]">
                        Save
                    </Button>
                )
            }
        </div>
    )
}


const LetterHead = ({domain}: {domain: string}) => {
    const [logo, setLogo] = React.useState<string>("")
    return (
        <>
            <Heading3 className="text-sm lg:text-base">Mail Signature</Heading3>
            <Paragraph className="">Make each mail professional with customized letter signatures</Paragraph>
            <Separator className="my-3"/>
            
            <Card className="w-full lg:max-w-[800px] p-2">
                <Heading3 className="text-sm lg:text-md text-center">Sample Mail</Heading3>
                <Separator className="my-2"/>
                <div className="h-[20vh]">
                    <Paragraph className="">Mail goes here!</Paragraph>
                </div>
                <Separator className="my-2"/>
                <div className={"flex gap-2 items-center h-[75px] py-2 "}>

                    <Card className="w-[70px] h-full"/>
                    <div className="flex flex-col justify-between">
                        <Heading3 className="text-sm lg:text-md">Person's Name</Heading3>
                        <Paragraph className="text-xs lg:text-xs">Position | Company | Slogan</Paragraph>
                        <Paragraph className="text-xs lg:text-xs">Address | Nairobi, Kenya</Paragraph>
                    </div>
                </div>
            </Card>
           
        </>
    )
};


type PlansType = "basic" | "premium" | "startup" | "custom"; 
let plans: PlansType[] = [ "basic", "premium", "startup", "custom"]
const Upgrade = (
    {domain, plan}: 
    {
        domain: string, 
        plan: PlansType
    }
) => {
    const [selected, setSelected] = React.useState<PlansType>(plan)

    return (
        <>
            <Heading3 className="text-sm lg:text-base">Upgrade plan</Heading3>
            <Paragraph className="text-xs lg:text-sm">Current Plan: {plan.charAt(0).toUpperCase()}{plan.slice(1)}</Paragraph>
            <Separator className="my-3"/>
            <div className="flex items-center gap-2 flex-wrap">
                {
                    plans.map((item, index) => (
                        <Card 
                            className={cn("min-w-[130px] h-[70px] flex justify-center items-center gap-2 cursor-pointer hover:border-main-color duration-700", selected === item ? "border-main-color": "")}
                            onClick={() => setSelected(item)}
                            key={index}
                        >
                            <Heading3 className="text-sm lg:text-md capitalize">{item}</Heading3>
                        </Card>
                    ))
                }
            </div>
        </>
    )
}