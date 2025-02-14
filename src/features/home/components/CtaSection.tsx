import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import { MarqueeBackground } from './MarqueeBackground';

export function CtaSection() {
  return (
    <Section padding='lg' className='relative min-h-[80vh] overflow-hidden'>
      <MarqueeBackground />
      <Container size='lg' className='relative z-20'>
        <div className='flex flex-col items-center justify-center min-h-[70vh] text-center'>
          <div className='max-w-4xl mx-auto space-y-8'>
            <h2 className='text-6xl sm:text-7xl font-bold text-white leading-tight'>
              Find Your Perfect Developer Today
            </h2>
            <p className='text-xl text-purple-100 max-w-2xl mx-auto'>
              Join our directory to connect with top talent.
            </p>
            <div className='flex flex-col sm:flex-row gap-6 justify-center pt-8'>
              <Link
                href='/talents'
                className='px-8 py-4 bg-purple-100 hover:bg-white text-purple-900 rounded-lg font-semibold text-lg transition-colors duration-200'
              >
                See Our Talents
              </Link>
              <Link
                href='/register'
                className='group px-8 py-4 border-2 border-purple-100 text-purple-100 hover:bg-purple-100 hover:text-purple-900 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center gap-2'
              >
                Register as an expert
                <span className='group-hover:translate-x-1 transition-transform'>→</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
