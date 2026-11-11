import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowDepoiiThinks } from "@/components/HowDepoiiThinks";
import { LeadPipelineFinder } from "@/components/LeadPipelineFinder";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { VisitorTracker } from "@/components/VisitorTracker";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <VisitorTracker />
      <Navbar />
      <Hero />
      <HowDepoiiThinks />
      <LeadPipelineFinder />
      <CTASection />
      <FAQ />
      <Footer />
    </main>
  );
}


