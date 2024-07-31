// nav button items
"use client"; 
import {useRouter} from "next/navigation"; 
import {UserRound} from "lucide-react"; 

import ThemeToggle from "@/components/utils/theme-toggle"; 
import AppLinkButton from "@/components/common/app-link-button";

const NavButtons = () => {
    const {push} = useRouter(); 
    return (
        <div className="flex items-center gap-2">
            <ThemeToggle />
            <AppLinkButton 
                className="flex items-center gap-2"
                size="sm"
                type="default"
                href="/auth/login"
            >
                <UserRound size={18}/> Account 
            </AppLinkButton>
        </div>
    )
};

export default NavButtons; 