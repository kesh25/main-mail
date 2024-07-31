// faq items
"use client"; 

import React from "react"; 
import {X} from "lucide-react"; 

import { Heading3, Paragraph } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";


const FAQITEMS = () => (
    <div className="flex-1 lg:h-[350px] overflow-auto">
        {
            faqs.map((faq, index) => <FAQItem key={index} {...faq}/>)
        }
    </div>
);

export default FAQITEMS; 

interface FAQItemProps extends FAQItemType {}; 

const FAQItem: React.FC<FAQItemProps> = ({title, description}) => {
    const [opened, setOpened] = React.useState<boolean>(false)
    return (
        <div 
            className="my-1 cursor-pointer hover:bg-secondary px-1 pt-2 rounded-md "
            onClick={() => setOpened(!opened)}
        >
            <div className="w-full flex justify-between items-center mb-2">
                <Heading3 className="text-md lg:text-lg">{title}</Heading3>
                <X size={20} className={cn(opened ? "rotate-0": "rotate-45", "duration-700")}/>
            </div>
             
            <Paragraph className={cn(opened ? "block": "hidden", "duration-700 my-2")}>{description}</Paragraph>
              
            <Separator />
        </div>
    )
}


type FAQItemType = {
    title: string; 
    description: string; 
};

const faqs: FAQItemType[] = [
    {
        title: "Question 1",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }, 
    {
        title: "Question 1",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }, 
    {
        title: "Question 1",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }, 
    {
        title: "Question 1",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }, 
    {
        title: "Question 1",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }, 
    {
        title: "Question 1",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }, 
    {
        title: "Question 1",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }, 
]