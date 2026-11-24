import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { UploadPredictionSection } from "@/components/sections/UploadPredictionSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <HowItWorksSection />
        <UploadPredictionSection />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}