'use client';

import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <Section padding='lg' className='bg-gray-50 dark:bg-purple-600 '>
      <Container size='lg'>
        <div className='w-full flex flex-col md:flex-row items-center justify-between rounded-2xl p-8 md:p-12 bg-white dark:bg-purple-900   border border-gray-100 dark:border-gray-800'>
          <div className='w-full md:w-1/2 relative order-2 md:order-1'>
            <div className='relative aspect-square overflow-hidden w-full max-w-[600px]'>
              <Image
                src='/images/cta@2x.webp'
                alt='Transform Your Digital Experience'
                fill
                className='object-cover object-bottom rounded-lg'
                priority
              />
            </div>
          </div>

          <div className='flex flex-col space-y-6 w-full md:w-1/2 md:pl-12 order-1 md:order-2 mb-8 md:mb-0'>
            <div className='space-y-2'>
              <h2 className='text-sm font-semibold text-purple-500 dark:text-purple-100 tracking-wide uppercase'>
                Ready to Get Started?
              </h2>
              <h2 className='text-4xl md:text-4xl font-bold  text-purple-500 dark:text-purple-100'>
                Transform Your Digital Experience Today
              </h2>
            </div>
            <p className='text-lg text-gray-600 dark:text-gray-300'>
              Join thousands of satisfied users who have already taken their
              digital presence to the next level. Start your journey with us and
              see the difference.
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button size='lg' variant='default' className='group'>
                Get Started Now
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
