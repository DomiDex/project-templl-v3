'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../stores/useAuthStore';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function SubmitAccountButton() {
  const router = useRouter();
  const { isAuthenticated, user, updateProfile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.id && !user.profile_username) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('profile_username')
            .eq('id', user.id)
            .single();

          if (profile?.profile_username) {
            updateProfile({ profile_username: profile.profile_username });
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    if (isAuthenticated && user?.id) {
      fetchProfile();
    }
  }, [isAuthenticated, user?.id, updateProfile, supabase]);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      if (isAuthenticated && user) {
        router.push(`/account/${user.profile_username || user.id}`);
      } else {
        router.push('/sign-up');
      }
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant='default'
      size='sm'
      disabled={isLoading}
      className='bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-400'
    >
      {isLoading ? 'Loading...' : isAuthenticated ? 'Account' : 'Submit Here'}
    </Button>
  );
}
