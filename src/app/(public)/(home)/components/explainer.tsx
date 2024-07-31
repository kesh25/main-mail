// image explainer

import { Card } from "@/components/ui/card";
import SectionContainer from "../../components/section-container";

const Explainer = () => (

    <SectionContainer>
        <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-2 -mt-[7rem] z-10">
            <Card className="flex-1 h-[300px] rounded-2xl" />
            <Card className="flex-1 h-[300px] rounded-2xl" />
            <Card className="flex-1 h-[300px] rounded-2xl" />
            <Card className="flex-1 h-[300px] rounded-2xl" />
        </div>
    </SectionContainer>
);

export default Explainer; 