// nav component 
import Logo from "@/components/utils/logo"; 
import Links from "./links"; 
import NavButtons from "./buttons"; 

import {dimensions} from "@/constants";
import {cn} from "@/lib/utils"; 

const Nav = () => {
     
    return (
            <nav
                className={
                    cn(
                        dimensions.public_width, 
                        "z-[50] sticky top-0 rounded-lg bg-background border-[.02rem]  shadow-md flex items-center justify-between space-x-4 px-8 py-3 my-2"
                    )
                }
            >
                <Logo showText={true}/>
                <Links />
                <NavButtons />
            </nav>
        
    )
};

export default Nav; 