// settings container
import { Heading2, Paragraph } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

interface SettingsContainerProps {
    title: string; 
    subtitle?: string; 
    headerComponent?: React.ReactNode; 
    children: React.ReactNode;
}


const SettingsContainer: React.FC<SettingsContainerProps> = ({
    title, subtitle, headerComponent, children
}) => {


    return (
        <div>
            <div className="flex justify-between items-center my-3">
                <div>
                    <Heading2 className="text-md lg:text-base">{title}</Heading2>
                    <Paragraph className="text-sm lg:text-md text-gray-500">{subtitle}</Paragraph>
                </div>
                {
                    headerComponent && headerComponent
                }
            </div> 
            <Separator className="my-3"/>
            {children}
        </div>
    )
}

export default SettingsContainer; 