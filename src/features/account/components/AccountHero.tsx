'use client';

import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function AccountHero() {
  const [username, setUsername] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', session.user.id)
          .single();

        setUsername(profile?.username || null);
      }
    };

    fetchProfile();
  }, [supabase]);

  return (
    <Section padding='lg'>
      <Container size='lg'>
        <div className='flex flex-col items-start gap-4'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50'>
            Welcome back, {username || 'User'}! 👋
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            Manage your account and view your dashboard
          </p>
        </div>
      </Container>
    </Section>
  );
}
