// api settings
import { Heading3, Paragraph } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

import SettingsContainer from "./settings-container"; 

const API = ({domain}: {domain: string}) => {


    return (
        <SettingsContainer
            title="API"
            subtitle="Automate your transactional and marketing emails with a few lines of code."
        >
            <Heading3 className="text-sm lg:text-md">API Keys</Heading3>
            <Paragraph className=""><span className="text-extrabold">NB:</span> Make certain that you protect your API Keys with your life. They are encrypted before they are stored in our database.</Paragraph>
            <Separator className="my-3"/>
        </SettingsContainer>
    )
};

export default API; 