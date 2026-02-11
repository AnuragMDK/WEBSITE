import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseSection />
      <IndustriesSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
