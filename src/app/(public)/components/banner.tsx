// banner 

import { ArrowRight } from "lucide-react";
import { Heading3, Paragraph } from "@/components/ui/typography";
import SectionContainer from "./section-container";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";

const Banner = ({text, subtitle}: {text: string, subtitle?: string}) => (
    <SectionContainer className="my-2">
        <div className="relative bg-dark-color antiliased w-full h-[300px]  flex flex-col items-center justify-center rounded-lg">
            <Heading3 className="text-white z-10 my-3 max-w-[500px] text-center text-xl lg:text-3xl capitalize font-bold">
                {text}
            </Heading3>
            {
                subtitle && (
                    <Paragraph className="text-white text-md lg:text-base my-2 mx-auto text-center lg:max-w-[40%]">{subtitle}</Paragraph>
                )
            }
            <Button className="z-10 gap-2 items-center text-white rounded-full bg-main-color hover:bg-gray-100 duration-700 border-none" variant="outline">
                Get Started <ArrowRight size={20}/>
            </Button>
            <BackgroundBeams />
        </div>
    </SectionContainer>
);

export default Banner; 