// faqs
import SectionContainer from "../../components/section-container";
import FAQMORE from "./faq-more";
import FAQITEMS from "./faq-items";

const FAQS = () => (
    <SectionContainer
        title="Frequently Asked Questions."
        titleClassName="text-center mb-5"
        className="py-4"
    >
        <div className="flex gap-3">
            <FAQITEMS />
            <FAQMORE />
        </div>
    </SectionContainer>
); 

export default FAQS; 

 