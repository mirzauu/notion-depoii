import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WorkspaceDemo } from "@/components/WorkspaceDemo";
import { AIEngineSection } from "@/components/AIEngineSection";
import { LeadPipelineFinder } from "@/components/LeadPipelineFinder";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { VisitorTracker } from "@/components/VisitorTracker";
import { GoogleOneTap } from "@/components/GoogleOneTap";
import { getLandingJsonLd } from "@/lib/seo";

export default function Home() {
  const jsonLd = getLandingJsonLd();

  return (
    <main className="min-h-[100svh] bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GoogleOneTap />
      <VisitorTracker />
      <Navbar />
      <Hero />
      <WorkspaceDemo />
      <AIEngineSection />
      <LeadPipelineFinder />
      <PricingSection />
      <Footer />
    </main>
  );
}
