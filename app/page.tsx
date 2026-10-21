import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { StatBar } from "@/components/sections/StatBar";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Families } from "@/components/sections/Families";
import { Physios } from "@/components/sections/Physios";
import { Differentiation } from "@/components/sections/Differentiation";
import { Pricing } from "@/components/sections/Pricing";
import { SafetyNote } from "@/components/sections/SafetyNote";
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
        <Families />
        <Physios />
        <Differentiation />
        <Pricing />
        <SafetyNote />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
