import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WorkspaceDemo } from "@/components/WorkspaceDemo";
import { AIEngineSection } from "@/components/AIEngineSection";
import { LeadPipelineFinder } from "@/components/LeadPipelineFinder";
// import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { VisitorTracker } from "@/components/VisitorTracker";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <VisitorTracker />
      <Navbar />
      <Hero />
      <AIEngineSection />
      <WorkspaceDemo />
      <LeadPipelineFinder />
      {/* <FAQ /> */}
      <Footer />
    </main>
  );
}


