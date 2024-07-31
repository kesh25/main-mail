// hero section 

import HeroButtons from "./hero-buttons"; 

import { Heading1, Paragraph } from "@/components/ui/typography";
import {dimensions} from "@/constants";
import {cn} from "@/lib/utils"; 

const Hero = () => {

    return (
        <section className="[mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)] z-0 -mt-[80px] h-[45rem] w-full   dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative flex flex-col items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className={cn(dimensions.public_width, "flex flex-col gap-5 items-center justify-center w-full h-full")}>
                <div className="bg-green-100 rounded-full flex gap-2 items-center px-2 py-[.03rem]  border-[.01rem] border-gray-500">
                    <span className="block w-2 h-2 rounded-full bg-green-500"/> 
                    <span className="text-[.7rem] font-bold uppercase text-black">Online</span>
                </div>
                <Heading1 className="text-center bg-clip-text leading-loose py-4">
                    Seamless & Secure Mail Solutions <br/> Delivered!
                </Heading1>
                <Paragraph className="text-center text-md lg:text-base my-4 lg:max-w-[600px]">
                    Experience reliable, fast, and user friendly email service tailored to your business needs. 
                    Empower your business communications with our state of the art mailing platform
                </Paragraph>
                <HeroButtons />
            </div>
        </section>
    )
};

export default Hero; 