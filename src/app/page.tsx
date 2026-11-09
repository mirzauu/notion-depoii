import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LeadPipelineFinder } from "@/components/LeadPipelineFinder";
// import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <LeadPipelineFinder />
      {/* <Testimonials /> */}
      <CTASection />
      <Footer />
    </main>
  );
}


