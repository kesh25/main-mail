// tab containers
// import React from "react";
import { Card } from "@/components/ui/card";
import { Heading2, Paragraph } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

interface TabContainerProps {
    title: string; 
    children: React.ReactNode; 
    headerComponent?: React.ReactNode; 
    subtitle?: string; 
};

const TabContainer: React.FC<TabContainerProps> = ({
    title, children, headerComponent, subtitle
}) => {

    return (
        <Card className="px-6 py-4 h-[87vh] overflow-hidden">
            <div className="flex items-center justify-between">
                <div className="">
                    <Heading2 className="text-lg lg:text-xl my-2">{title}</Heading2>
                    {subtitle && <Paragraph className="text-xs lg:text-sm text-gray-500 my-2">{subtitle}</Paragraph>}
                </div>
                {headerComponent && headerComponent}
            </div>
            <Separator className="my-2"/>

            {children}
        </Card>
    )
};

export default TabContainer; 