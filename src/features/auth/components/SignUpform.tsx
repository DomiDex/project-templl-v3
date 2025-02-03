'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { GoogleIcon } from '@/components/icons/google-icon';
import { AuthError } from '../components/auth-error';
import { signUp } from '../actions/sign-up';
import { useAuthStore } from '../stores/useAuthStore';

export default function SignUpForm() {
  const router = useRouter();
  const setLoading = useAuthStore((state) => state.setLoading);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLocalLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLocalLoading(true);
    setLoading(true);

    try {
      const result = await signUp({
        username,
        email,
        password,
        confirmPassword,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.success) {
        router.push('/verify-email');
        router.refresh();
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Sign up error:', error);
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  };

  return (
    <div className='space-y-4'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {error && <AuthError message={error} />}
        <Input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
        />
        <Button type='submit' fullWidth size='lg' disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-gray-300 dark:border-gray-700' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-2 bg-gray-50 dark:bg-purple-800 text-gray-600 dark:text-gray-400'>
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
          // Will implement Google sign-up in a separate PR
          console.log('Google sign-up clicked');
        }}
      >
        <GoogleIcon className='w-5 h-5 mr-2' />
        <span>Sign up with Google</span>
      </Button>
    </div>
  );
}
