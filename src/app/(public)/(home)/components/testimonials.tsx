// testimonials 

import SectionContainer from "../../components/section-container";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {testimonials} from "@/data"; 

const Testimonials = () => (
    <SectionContainer
         className="max-w-[100vw] w-full px-2 bg-secondary py-5"
        title="Testimonials"
        titleClassName="text-center"
        subtitle="Don't just trust our word. See what some of our customers say about our service then you can decide."
        subtitleClassName="lg:max-w-[500px] mb-4 mx-auto text-center"
    >
        <InfiniteMovingCards
            items={testimonials.slice(0, 10)}
            direction="right"
            speed="slow"
            type="testimonials"
        />
        <InfiniteMovingCards
            items={testimonials.slice(11, )}
            direction="left"
            speed="slow"
            type="testimonials"

        />
    </SectionContainer>
);

export default Testimonials; 

// testimonials