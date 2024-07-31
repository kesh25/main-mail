"use client"; 

// theme toggle
import React from "react";
import { useTheme } from "next-themes"
import { Moon, Sun, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ThemeToggle({className, size, variant}: {className?: string, size?: string, variant?: any}) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => { setMounted(true) }, []);

    if (!mounted) return <Button size="sm" variant="ghost" className="rounded-full"><SunMedium size={18} /></Button>;
   

    return (
        <Button
            variant={variant || "ghost"}
            size={size || "sm"}
            className={cn(theme === "light" ? "bg-background": "", "rounded-full hover:bg-background duration-700 hover:text-main-color", className)}
            onClick={() => setTheme(theme === "light" ? "dark": "light")}

        >
            {
                theme === "dark" ? <SunMedium size={18} />: <Moon size={18} />
            }
        </Button>
    )
}