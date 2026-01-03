import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";

// Lazy load below-the-fold components
const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  loading: () => <div className="min-h-[400px] bg-[#0a1628] animate-pulse" />,
});
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"), {
  loading: () => <div className="min-h-[400px] bg-[#0a1628] animate-pulse" />,
});
const BlogSection = dynamic(() => import("@/components/BlogSection"), {
  loading: () => <div className="min-h-[400px] bg-white animate-pulse" />,
});
const FAQSection = dynamic(() => import("@/components/FAQSection"), {
  loading: () => <div className="min-h-[400px] bg-[#0a1628] animate-pulse" />,
});
const CTASection = dynamic(() => import("@/components/CTASection"), {
  loading: () => <div className="min-h-[300px] bg-[#d4af37] animate-pulse" />,
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
