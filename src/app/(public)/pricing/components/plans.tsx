// plans 

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading2, Heading3, Paragraph } from "@/components/ui/typography";
import SectionContainer from "../../components/section-container";
import plans, {common_items} from "./features"
import { numberWithCommas } from '@/utils/format-numbers';
import { CircleCheck } from "lucide-react";

const Plans = () => (

    <SectionContainer className="grid grid-cols-1 gap-2 lg:grid-cols-4 my-5">
        {
            plans.map((item, index) => (
                <PlanItem key={index} {...item}/>
            ))
        }
    </SectionContainer>
); 

export default Plans; 


const PlanItem = ({title, description, features, price}: {title: string, description: string, features: string[], price: number}) => {
    return (
        <Card className="p-2 px-3 flex flex-col gap-2 min-h-[40vh] pb-5">
            <Paragraph>{title}</Paragraph>
            <Heading3>KES: {price === 5000 ? "To Be Discussed" :numberWithCommas(price)}</Heading3>
            <Paragraph >{description}</Paragraph>
            <Separator />
            <ul className="flex flex-col gap-2">
                {
                    features.map((item, index) => (
                        <li key={index} className="text-sm lg:text-md flex items-center gap-2">
                            <CircleCheck size={18} className="text-green-500"/>
                            <span>{item}</span>
                        </li>
                    ))
                }
                <Separator />
                {
                    common_items.map((item, index) => (
                        <li key={index} className="text-sm lg:text-md flex items-center gap-2">
                            <CircleCheck size={18} className="text-green-500"/>
                            <span>{item}</span>
                        </li>
                    ))
                }
                {
                    price === 5000 && (
                        <>
                            <Separator />
                            <li className="text-sm lg:text-md flex items-center gap-2"><CircleCheck size={18} className="text-green-500"/> and more...</li>
                        </>
                    )
                }
            </ul>
        </Card>

    )
}