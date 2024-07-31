import Hero from "./components/hero";
import Explainer from "./components/explainer"; 
import Trusted from "./components/trusted";
import Advantages from "./components/advantage";
import Features from "./components/features"; 
import Testimonials from "./components/testimonials";
import FAQS from "./components/faqs"; 
import Banner from "../components/banner"; 

export default function Home() {
  return (
    <>
      <Hero />
      <Explainer />
      <Trusted />
      <Advantages />
      <Features />
      <Testimonials />
      <FAQS />
      <Banner text={"Let's give your business or brand a professional touch"}/>
    </>
  );
}
