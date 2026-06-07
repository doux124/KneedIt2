import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { StatBar } from "@/components/sections/StatBar";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Caregiver } from "@/components/sections/Caregiver";
import { Differentiation } from "@/components/sections/Differentiation";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatBar />
        <Problem />
        <HowItWorks />
        <Caregiver />
        <Differentiation />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
