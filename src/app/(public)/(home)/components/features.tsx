// site features
import { Bot, Calendar, ChevronDown, Database, Contact, Server } from "lucide-react";
import { Card } from "@/components/ui/card"; 
import { Heading3, Paragraph } from "@/components/ui/typography";
import SectionContainer from "../../components/section-container";
import FeatureItem, {FeatureItemType} from "./feature-item"; 

const Features = () => (

    <SectionContainer
        title="All Features"
        titleClassName="text-center"
        subtitle="It is not just our mailing services. Get to explore a suit of tools that will make your business even more productive"
        subtitleClassName="lg:max-w-[500px] mx-auto mb-4 text-center"
    >
        <div className="my-3 flex flex-col lg:flex-row gap-2 lg:h-[430px]" id="features">
            <FeatureItems />
            <div className="flex-1  lg:h-full border rounded-xl"/>
        </div>
    </SectionContainer>
);

export default Features; 

// features items 

const FeatureItems = () => {

    return (
        <div className="flex flex-col gap-2 overflow-auto lg:h-full">
            {
                features.map((feature, index) => (
                    <FeatureItem 
                        key={index} 
                        icon={feature.icon} 
                        title={feature.title} 
                        description={feature.description} 
                        index={index}/>
                ))
            }
        </div>
    )
};

 



const features: FeatureItemType[] = [
    {
        title: "Private & Shared Calender",
        icon: <Calendar size={18}/>,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        title: "Contact Manager",
        icon: <Contact size={18}/>,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        title: "Private & Shared Cloud Storage",
        icon: <Database size={18}/>,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        title: "A.I. Assistance",
        icon: <Bot size={18}/>,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        title: "API Access",
        icon: <Server size={18}/>,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
]