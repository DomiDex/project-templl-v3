import React from 'react';
import TestimonialCard from './TestimonialCard';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';

export default function TestimonialSection() {
  return (
    <Section padding='lg'>
      <Container size='md'>
        <TestimonialCard />
      </Container>
    </Section>
  );
}
