// section container

import { Heading2, Paragraph } from "@/components/ui/typography";
import { dimensions } from "@/constants";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
    title?: string; 
    titleClassName?: string; 
    subtitle?: string; 
    subtitleClassName?: string; 
    className?: string; 
    children: React.ReactNode; 
}; 

const SectionContainer: React.FC<SectionContainerProps> = ({
    title, titleClassName, subtitle, subtitleClassName, className, fullWidth, children
}) => {


    return (
        <section className={cn(dimensions.public_width, dimensions.padding, dimensions.margin_vertical, className)}>
            {title && <Heading2 className={cn(titleClassName, "uppercase")}>{title}</Heading2>}
            {subtitle && <Paragraph className={cn("text-gray-500", subtitleClassName)}>{subtitle}</Paragraph>}
            <>
                {children}
            </>
        </section>
    )
};

export default SectionContainer; 