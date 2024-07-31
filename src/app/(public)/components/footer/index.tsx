// footer component

import Link from "next/link";
import { Copyright } from "lucide-react";

import SectionContainer from "../section-container";
import { Separator } from "@/components/ui/separator";
import { Heading3, Paragraph } from "@/components/ui/typography";
import Logo from "../../../../components/utils/logo";

const Footer = () => (
    <SectionContainer>
        <Separator className="my-2"/>

        <footer className="flex flex-col lg:flex-row justify-between">
            <div className="flex flex-col gap-2">
                <Logo />
                <Paragraph className="flex items-center gap-1">
                    <span>Copyright {new Date().getFullYear()}.</span>
                    <Copyright size={15}/>
                    <span>Vu.Mail</span>
                </Paragraph>
                <Paragraph>All Rights Reserved</Paragraph>
            </div> 
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                <FooterColumn list={row_one}/>
                <FooterColumn list={row_two}/>
                <FooterColumn list={row_four}/>
                <FooterColumn list={row_three}/>
            </div>          
        </footer>
    </SectionContainer>
);

export default Footer; 


type FooterType = {
    text: string; 
    href: string; 
}; 

interface FooterColumnProps {
    list:  FooterType[]; 
}; 

const FooterColumn: React.FC<FooterColumnProps> = ({list}) => (
    <div className="flex flex-col gap-2">
        {
            list.map((link, index) => (
                <Link key={index} href={link.href} className="text-sm lg:text-md hover:text-main-color duration-700">{link.text}</Link>
            ))
        }
    </div>
);

// items
const row_one: FooterType[] = [
    {text: "Home", href: "/"},
    {text: "Products", href: "/products"},
    {text: "Pricing", href: "/pricing"},
   
];

const row_two: FooterType[] = [
    
    {text: "Blog", href: "/blog"},
    {text: "Docs", href: "/docs"},
    {text: "Support", href: "/support"},
];

const row_three: FooterType[] = [
    {text: "Terms & Conditions", href: "/legal/terms"},
    {text: "Privacy Policy", href: "/legal/privacy"},
    {text: "Cookie Policy", href: "/legal/cookies"},
     
];

const row_four: FooterType[] = [
    {text: "Twitter", href: "/legal/terms"},
    {text: "LinkedIn", href: "/legal/privacy"},
    {text: "Github", href: "/legal/cookies"},
     
]