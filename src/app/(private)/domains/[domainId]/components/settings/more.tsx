// more settings
"use client"; 

import React from "react"; 
import { useRouter } from "next/navigation";

import AppInput from "@/components/common/app-input"; 
import AppImage from "@/components/common/app-image"; 
import {Button} from "@/components/ui/button"; 

import { Card } from "@/components/ui/card";
import FormTitle from "@/components/forms/components/form-title"; 
import SettingsContainer from "./settings-container"; 
import { Heading3, Paragraph } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import ImageUpload from "@/components/forms/components/image-upload";
import EditSignatureModal from "@/components/modals/edit-signature"; 

import { getBusinessDetails, updateDomain } from "@/lib/api-calls/domains"; 
import { useCustomEffect, useSearch } from "@/hooks"; 
import { cn } from "@/lib/utils";
import { createToast } from "@/utils/toast";
import { validateEmail, validatePhone } from "@/utils/validation";


type BusinessDetailsType = {
    id: string; 
    title: string; 
    contact_email: string; 
    contact_phone: string; 
    production: boolean; 
    slogan: string; 
    logo: string; 
    address: string; 
    plan: PlansType; 
};

const updatingDomain = async (
    domainId: string, 
    setLoading: React.Dispatch<boolean>,
    data: any,
    fn?: () => void
) => {
    setLoading(true); 
    let res = await updateDomain(domainId, data);
    if (res) {
        createToast("success", "Details have been updated!")
        if (fn) fn(); 
    };
    
    setLoading(false)
}

const More = ({domain}: {domain: string}) => {
    const [loading, setLoading] = React.useState<boolean>(false); 
    const [mounted, setMounted] = React.useState<boolean>(false); 
    const [data, setData] = React.useState<BusinessDetailsType>();

    React.useEffect(() => setMounted(true), []); 

    const fetchDetails = async () => {
        if (!mounted) return; 
        setLoading(true);

        let res = await getBusinessDetails(domain); 

        if (res) setData(res); 

        setLoading(false); 
    }

    useCustomEffect(fetchDetails, [mounted])

    return (
        <SettingsContainer
            title="More Settings"
        >
            <MoreSettings 
                domain={domain}
                email={data?.contact_email || ""}
                phone={data?.contact_phone || ""}
                production={data?.production || false}
                outerLoading={loading}
            />
           <Separator className="my-3"/>
            <LetterHead 
                domain={domain}
                title={data?.title || ""}
                address={data?.address || ""}
                logo={data?.logo || ""}
                slogan={data?.slogan || ""}
                outerLoading={loading}
            />
            <Separator className="my-3"/>
            <Upgrade 
                domain={domain}
                plan={data?.plan || "basic"}
            />
        </SettingsContainer>
    )
};

export default More; 

const MoreSettings = (
    {domain, email, phone, production, outerLoading}: 
    {
        domain: string; 
        email: string; 
        phone: string; 
        production: boolean; 
        outerLoading: boolean; 
    }
) => {
    const [loading, setLoading] = React.useState<boolean>(false); 
    const [currentEmail, setCurrentEmail] = React.useState<string>("")
    const [currentPhone, setCurrentPhone] = React.useState<string>("");
    const [currentProduction, setCurrentProduction] = React.useState<boolean>(false); 

    const [mounted, setMounted] = React.useState<boolean>(false); 
    const [edited, setEdited] = React.useState<boolean>(false); 

    React.useEffect(() => setMounted(true), []); 

    React.useEffect(() => {
        if (!mounted) return; 
        
        if (email) setCurrentEmail(email);
        if (phone) setCurrentPhone(phone); 
        setCurrentProduction(production); 
        setLoading(outerLoading)
    }, [mounted, email, phone, production]);

    React.useEffect(() => {
        if (!mounted) return; 
        if (
            email !== currentEmail || 
            phone !== currentPhone || 
            production !== currentProduction
        ) setEdited(true);
        else setEdited(false)
    }, [currentEmail, currentPhone, currentProduction])

    const handleUpdate = async () => {
        // validate the data

        if (email === currentEmail && phone === currentPhone && production === currentProduction) {
            createToast("error", "Nothing to update!");
            return; 
        };

        if (!validateEmail(currentEmail)) {
            createToast("error", "Invalid email provided!");
            return; 
        }

        if (!validatePhone(currentPhone)) {
            createToast("error", "Invalid phone number provided!");
            return; 
        };

        await updatingDomain(domain, setLoading, {
            contact_email: currentEmail, 
            contact_phone: currentPhone, 
            production: currentProduction
        }, () => setEdited(true))
    }
    return (
        <div className="flex flex-col gap-2">
            <Paragraph className="my-2 text-xs lg:text-sm font-bold text-destructive">To receive and send emails, the domain should be in production!</Paragraph>
            <FormTitle title="Environment"/>
            <div className="flex gap-2 border rounded-sm w-fit">
                <span 
                    className={cn(
                        "text-xs lg:text-sm p-2 cursor-pointer hover:text-main-color",
                        currentProduction ? "": "bg-secondary text-main-color"
                    )}
                    onClick={() => setCurrentProduction(!currentProduction)}
                >Development</span>
                <span 
                    className={cn(
                        "text-xs lg:text-sm p-2 cursor-pointer hover:text-main-color",
                        !currentProduction ? "": "bg-secondary text-main-color"
                    )}
                    onClick={() => setCurrentProduction(!currentProduction)}
                >Production</span>
            </div>
            <FormTitle title="Contact Email"/>
            <AppInput 
                value={currentEmail}
                setValue={setCurrentEmail}
                placeholder="name@domain.com"
                disabled={loading}
            />
            <FormTitle title="Contact Phone"/>
            <AppInput 
                value={currentPhone}
                setValue={setCurrentPhone}
                placeholder="254700111222"
                disabled={loading}
            />
            
            <Button 
                className="my-2 w-[200px]"
                disabled={!edited || loading}
                onClick={handleUpdate}
            >
                Update
            </Button>
              
        </div>
    )
}


const LetterHead = (
    {domain, title, address, logo, outerLoading, slogan}: 
    {
        domain: string;
        title: string; 
        address: string; 
        logo: string; 
        outerLoading: boolean; 
        slogan: string; 
    }
) => {
    const [loading, setLoading] = React.useState<boolean>(false); 
    const [currentLogo, setCurrentLogo] = React.useState<string>("");
    const [currentTitle, setCurrentTitle] = React.useState<string>(""); 
    const [currentAddress, setCurrentAddress] = React.useState<string>(""); 
    const [currentSlogan, setCurrentSlogan] = React.useState<string>(""); 

    const [mounted, setMounted] = React.useState<boolean>(false); 
    const [edited, setEdited] = React.useState<boolean>(false); 
    const [openEditModal, setOpenEditModal] = React.useState<boolean>(false); 

    React.useEffect(() => setMounted(true), []); 

    React.useEffect(() => {
        if (!mounted) return; 
        
        if (title) setCurrentTitle(title);
        if (address) setCurrentAddress(address); 
        if (logo) setCurrentLogo(logo); 
        if (slogan) setCurrentSlogan(slogan)
         
        setLoading(outerLoading)
    }, [mounted, title, address, logo, slogan]);

    React.useEffect(() => {
        if (!mounted) return; 
        if (
            title !== currentTitle || 
            address !== currentAddress || 
            logo !== currentLogo ||
            slogan !== currentSlogan 
        ) setEdited(true);
        else setEdited(false)
    }, [currentTitle, currentAddress, currentLogo, currentSlogan]);


    const handleUpdate = async () => {
        if (!currentTitle || !currentAddress || !currentLogo || !currentSlogan) {
            createToast("error", "Kindly fill in all details!");
            return; 
        }

        await updatingDomain(domain, setLoading, {
            title: currentTitle, 
            address: currentAddress, 
            logo: currentLogo, 
            slogan: currentSlogan
        }, () => setEdited(true))
    }

    return (
        <>
            <EditSignatureModal 
                isOpen={openEditModal}
                onClose={() => setOpenEditModal(false)}
                address={currentAddress}
                title={currentTitle}
                slogan={currentSlogan}
                setTitle={setCurrentTitle}
                setAddress={setCurrentAddress}
                setSlogan={setCurrentSlogan}
            />
            <Heading3 className="text-sm lg:text-base">Mail Signature</Heading3>
            <Paragraph className="">Make each mail professional with customized letter signatures</Paragraph>
            <Separator className="my-3"/>
            
            <Card className="w-full lg:max-w-[700px] p-2">
                <Heading3 className="text-sm lg:text-md text-center">Sample Mail</Heading3>
                <Separator className="my-2"/>
                <div className="w-full h-[15vh] p-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-7 h-7 rounded-full"/>
                        <div>
                            <Skeleton className="w-[150px] rounded-full h-[10px]"/>
                            <Skeleton className="mt-1 w-[100px] rounded-full h-[10px]"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 my-3">
                        <Skeleton className="w-full h-[10px] rounded-full"/>
                        <Skeleton className="w-full h-[10px] rounded-full"/>
                        <Skeleton className="w-full h-[10px] rounded-full"/>
                        <Skeleton className="w-full h-[10px] rounded-full"/>
                        <Skeleton className="w-full h-[10px] rounded-full"/>
                        <Skeleton className="w-full h-[10px] rounded-full"/>
                        <Skeleton className="w-[50%] h-[10px] rounded-full"/>
                    </div>
                </div>
                <Separator className="my-2"/>
                <div className={"flex gap-2 items-center h-[75px] py-2 "}>

                    {
                        currentLogo ? (
                            <AppImage 
                                src={currentLogo}
                                alt="company logo"
                                title="company logo"
                                width={70}
                                height={75}
                                nonBlur={true}
                                cls="rounded-lg"
                            />
                        ): (
                            <Card className="w-[70px] h-full"/>
                        )
                    }
                    <div className="flex flex-col justify-between">
                        <Heading3 className="text-sm lg:text-md">Person's Name</Heading3>
                        <Paragraph className="text-xs lg:text-xs">{currentTitle || "Company"} | Position</Paragraph>
                        <Paragraph className="text-xs lg:text-xs">{currentSlogan || "Slogan"}</Paragraph>
                        <Paragraph className="text-xs lg:text-xs">{currentAddress || "Address"}</Paragraph>
                    </div>
                </div>
            </Card>

            <div className="items-center my-3">
                <div className="flex gap-2">
                    <Button
                        disabled={loading}
                        variant="outline"
                        onClick={() => setOpenEditModal(true)}
                    >
                        Edit Details
                    </Button>
                    <ImageUpload 
                        disabled={loading}
                        onChange={(val: string) => setCurrentLogo(val)}
                        onRemove={(val: string) => setCurrentLogo(logo)}
                        path={`domain/${domain}`}
                        images={[currentLogo]}
                        text="Upload Logo"
                        outer={true}
                    />
                </div>
                <Button 
                    className="w-[200px] my-3"
                    disabled={!edited || loading}
                    onClick={handleUpdate}
                >
                    Update
                </Button>
            </div>
           
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
    const [selected, setSelected] = React.useState<PlansType>(plan);
    const [loading, setLoading] = React.useState<boolean>(false); 
    const [mounted, setMounted] = React.useState<boolean>(false); 
    const [edited, setEdited] = React.useState<boolean>(false);
    
    const searchParams = useSearch(); 
    const d = searchParams?.get("d"); 

    const { push } = useRouter(); 
    
    React.useEffect(() => setMounted(true), []); 

    React.useEffect(() => {
        if (!mounted) return; 

        setSelected(plan)
    }, [mounted, plan])

    React.useEffect(() => {
        if (!mounted) return; 

        if (selected !== plan) setEdited(true)
    }, [selected, mounted]);

    const handleUpdating = async () => {
        if (selected === "custom") {
            createToast("success", "Contact support for the custom upgrade!");
            return; 
        }
        await updatingDomain(domain, setLoading, {
            plan: selected
        }, () => {
            setEdited(true);
            push(`/domains/${domain}?d=${d}&tab=payment`); 
        })
    };

    return (
        <>
            <Heading3 className="text-sm lg:text-base">Upgrade plan</Heading3>
            <Paragraph className="text-xs lg:text-sm">Current Plan: {plan?.charAt(0).toUpperCase()}{plan.slice(1)}</Paragraph>
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
            <Button 
                className="w-[200px] my-3"
                disabled={!edited || loading}
                onClick={handleUpdating}
            >
                Upgrade
            </Button>
        </>
    )
}