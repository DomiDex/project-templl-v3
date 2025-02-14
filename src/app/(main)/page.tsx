import HomeHero from '@/features/home/components/HomeHero';
import { Features } from '@/features/home/components/Features';
import { InputsSection } from '@/features/home/components/InputsSection';
import { Testimonials } from '@/features/home/components/Testimonials';
import { CtaSection } from '@/features/home/components/CtaSection';

export default function Home() {
  return (
    <>
      <HomeHero />
      <InputsSection />
      <Features />
      <Testimonials />
      <CtaSection />
    </>
  );
}
