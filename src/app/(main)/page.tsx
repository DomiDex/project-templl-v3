import HomeHero from '@/features/home/components/HomeHero';
import { Features } from '@/features/home/components/Features';
import { InputsSection } from '@/features/home/components/InputsSection';
import { TemplateSection } from '@/features/home/components/TemplateSection';
import { ServiceSection } from '@/features/home/components/ServiceSection';
import { Testimonials } from '@/features/home/components/Testimonials';
import CtaSection from '@/features/home/components/CtaSection';

export default function Home() {
  return (
    <main>
      <HomeHero />
      <Features />
      <InputsSection />
      <TemplateSection />
      <Testimonials />
      <ServiceSection />
      <CtaSection />
    </main>
  );
}
