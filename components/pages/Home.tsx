// Server component: only the product story, carousel, FAQ and stat count-up hydrate on the client.
import DeliveredWorkCarousel from "@/components/DeliveredWorkCarousel";
import ClosingCTA from "@/components/home/ClosingCTA";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";
import ProofBand from "@/components/home/ProofBand";
import Services from "@/components/home/Services";
import Statement from "@/components/home/Statement";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofBand />
      <Statement />
      <Products />
      <DeliveredWorkCarousel />
      <Services />
      <FAQ />
      <ClosingCTA />
    </>
  );
}
