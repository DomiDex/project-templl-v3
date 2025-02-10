'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Stack } from '@/types';
import StackCard from '@/features/stacks/components/StackCard';
import { toast } from 'sonner';

const breadcrumbItems = [{ label: 'Stacks', href: '/stacks' }];

export default function StacksPage() {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchStacks = async () => {
      const { data, error } = await supabase
        .from('stacks')
        .select('*')
        .order('stack_name');

      if (error) {
        console.error('Error fetching stacks:', error);
        toast.error('Failed to load stacks');
        return;
      }

      setStacks(data);
      setLoading(false);
    };

    fetchStacks();
  }, [supabase]);

  if (loading) {
    return (
      <Section padding='lg'>
        <Container size='lg'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[...Array(8)].map((_, i) => (
              <div key={i} className='animate-pulse'>
                <div className='bg-gray-200 dark:bg-gray-700 h-48 rounded-md mb-4' />
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2' />
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2' />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section padding='lg'>
      <Container size='lg'>
        <Breadcrumb items={breadcrumbItems} className='mb-8' />
        <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8'>
          Technology Stacks
        </h1>

        <p className='text-gray-600 dark:text-gray-400 mb-8'>
          Explore different technology stacks used by our community.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {stacks.map((stack) => (
            <StackCard key={stack.id} stack={stack} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
