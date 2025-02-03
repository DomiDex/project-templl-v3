'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../stores/useAuthStore';
import { useState } from 'react';

export default function LoginLogout() {
  const router = useRouter();
  const { isAuthenticated, signOut } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <Button
      onClick={isAuthenticated ? handleSignOut : handleSignIn}
      variant='ghost'
      size='sm'
      disabled={isLoading}
      className='text-purple-700 hover:text-purple-800 dark:text-purple-300 dark:hover:text-purple-200'
    >
      {isLoading ? 'Signing out...' : isAuthenticated ? 'Sign Out' : 'Sign In'}
    </Button>
  );
}
