import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WorkspaceDemo } from "@/components/WorkspaceDemo";
import { AIEngineSection } from "@/components/AIEngineSection";
import { LeadPipelineFinder } from "@/components/LeadPipelineFinder";
import { PricingSection } from "@/components/PricingSection";
// import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { VisitorTracker } from "@/components/VisitorTracker";
import { GoogleOneTap } from "@/components/GoogleOneTap";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <GoogleOneTap />
      <VisitorTracker />
      <Navbar />
      <Hero />
      <WorkspaceDemo />
      <AIEngineSection />
      <LeadPipelineFinder />
      <PricingSection />
      {/* <FAQ /> */}
      <Footer />
    </main>
  );
}


