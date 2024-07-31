// hero buttons 
"use client"; 

import {ChevronRight} from "lucide-react";

import {Button} from "@/components/ui/button"; 

const HeroButtons = () => {

    return (
        <div className="flex gap-2 items-center">
            <Button 
                className="items-center gap-2"
                variant="outline"
            >
                Get Started 
            </Button>
            <Button 
                className="items-center gap-2"
            >
                Contact Us <ChevronRight size={18}/>
            </Button>
        </div>
    )
};

export default HeroButtons; 