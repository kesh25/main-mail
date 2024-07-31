// domains
import Protected from "../components/protected"; 
import Domains from "../components/domains"; 
import Hero from "./components/hero";

const Page = () => {

    return (
        <Protected
            title="Domains"
        >
            <Hero />
            <Domains 
                limit={20}
                search={true}
            />
        </Protected>
    )
};

export default Page; 

