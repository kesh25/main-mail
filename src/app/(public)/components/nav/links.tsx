// nav links
"use client"; 
import { usePathname } from "next/navigation";
import Link from "next/link"; 
import { cn } from "@/lib/utils";

const Links = () => {


    return (
        <span className="flex items-center justify-center gap-8">
            {
                menu_items.map((link, index) => (
                    <LinkItem key={index} link={link} />
                ))
            }
        </span>
    )
};

export default Links; 


type LinkType = {
    title: string; 
    href: string; 
};

 

const LinkItem = ({link}: {link: LinkType}) => {
    const pathname = usePathname(); 

    return (
        <Link
            href={link.href}
            title={link.title}
            className={cn(pathname === link.href ? "text-main-color": "", "text-xs lg:text-sm hover:text-main-color")}
        >
            {link.title}
        </Link>
    )
}; 

const menu_items: LinkType[] = [
    {
        title: "Home",
        href: "/"
    },
    {
        title: "Pricing",
        href: "/pricing"
    },
    {
        title: "Docs",
        href: "/docs"
    },
    {
        title: "Support",
        href: "/support"
    }
]