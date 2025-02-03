'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { GoogleIcon } from '@/components/icons/google';
import Link from 'next/link';
import { AuthError } from '../components/auth-error';
import { signIn } from '../actions/sign-in';
import { useAuthStore } from '../stores/useAuthStore';

export default function SignInForm() {
  const router = useRouter();
  const { signIn: storeSignIn } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn({
        email,
        password,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.success && result.user) {
        // Update Zustand store with user data
        storeSignIn({
          id: result.user.id,
          email: result.user.email!,
          profile_username: result.user.user_metadata?.profile_username,
        });

        router.push(`/${result.redirectTo}`);
        router.refresh();
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-4'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {error && <AuthError message={error} />}
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <div className='space-y-2'>
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <div className='flex justify-end'>
            <Link
              href='/forgot-password'
              className='text-sm text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 transition-colors'
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <Button type='submit' fullWidth size='lg' disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-gray-300 dark:border-gray-700' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-2 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-500'>
            Or continue with
          </span>
        </div>
      </div>

      <Button
        type='button'
        variant='outline'
        fullWidth
        size='lg'
        disabled={loading}
        onClick={() => {
          // Add Google sign-in logic here
          console.log('Google sign-in clicked');
        }}
      >
        <GoogleIcon className='w-5 h-5 mr-2' />
        <span>Sign in with Google</span>
      </Button>
    </div>
  );
}
