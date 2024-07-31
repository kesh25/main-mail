// more settings

import { Heading3, Paragraph } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

import SettingsContainer from "./settings-container"; 

const More = ({domain}: {domain: string}) => {


    return (
        <SettingsContainer
            title="More Settings"
        >
            <Heading3 className="text-sm lg:text-md">Letter Heads</Heading3>
            <Paragraph className="">Make each mail professional with customized letter heads</Paragraph>
            <Separator className="my-3"/>

            <div className="h-[40vh]"/>

            <Heading3 className="text-md lg:text-base">Upgrade</Heading3>
            <Separator className="my-3"/>
        </SettingsContainer>
    )
};

export default More; 