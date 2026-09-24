import Hero from "@/components/sections/Hero";
import ServicesPreview from "@/components/sections/ServicesPreview";
import StorySection from "@/components/sections/StorySection";
import TeamPreview from "@/components/sections/TeamPreview";
import Testimonials from "@/components/sections/Testimonials";
import VisitSection from "@/components/sections/VisitSection";
import CtaBand from "@/components/sections/CtaBand";
import Gallery from "@/components/sections/Gallery"; 

export const metadata = {
  title: "Barbershop in Gardens, Cape Town",
  description:
    "Sage & Steel Barber Co. — precision cuts, fades, beard work and hot towel shaves on Kloof Street, Cape Town. Book online in under a minute.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <StorySection />
      <TeamPreview />
      <Testimonials />
      <Gallery />
      <VisitSection />
      <CtaBand />
    </>
  );
}
