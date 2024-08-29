// edit domain signature 

"use client"; 

import React from "react"; 

import {Button} from "@/components/ui/button"; 
import {Modal} from "./modal";
import FormTitle from "@/components/forms/components/form-title"; 
import AppInput from "@/components/common/app-input"; 
import {useSearch} from "@/hooks";

interface EditSignatureModalProps {
    isOpen: boolean; 
    onClose: () => void; 
    address: string; 
    title: string; 
    slogan: string; 
    setAddress: React.Dispatch<string>;
    setTitle: React.Dispatch<string>; 
    setSlogan: React.Dispatch<string>; 
}; 


const EditSignatureModal: React.FC<EditSignatureModalProps> = (
    {isOpen, onClose, address, title, slogan, setAddress, setTitle, setSlogan}
) => {
    const searchParams = useSearch(); 
    const d = searchParams?.get("d") || ""; 

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Customise ${d} mail signature`}
            description="With each mail that is sent through the domain, a professional touch highlighting your details will be included"
        >
            <FormTitle title="Company Name"/>
            <AppInput 
                value={title}
                setValue={setTitle}
                placeholder="Vuteer"
                containerClassName="my-2"
            />
            <FormTitle title="Address"/>
            <AppInput 
                value={address}
                setValue={setAddress}
                placeholder="5222, 00100 - Nairobi, Kenya"
                containerClassName="my-2"
            />
            <FormTitle title="Company Slogan"/>
            <AppInput 
                value={slogan}
                setValue={setSlogan}
                placeholder="Efficient Business Communication"
                containerClassName="my-2"
                textarea={true}
            />
            <div className="w-full flex justify-end">
                <Button onClick={onClose}>Close to update</Button>
            </div>
        </Modal>
    )
};


export default EditSignatureModal; 