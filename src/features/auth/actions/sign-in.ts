'use server';

import { createClient } from '@/utils/supabase/server';
import { SignInFormData, SignInSchema } from '../types';
import { authRateLimiter, checkRateLimit } from '@/lib/rate-limit';
import { validateCSRFToken } from '@/lib/csrf';
import { headers } from 'next/headers';

export async function signIn(formData: SignInFormData & { _csrf?: string }) {
  try {
    // Validate CSRF token
    const isValidCSRF = await validateCSRFToken(formData._csrf);
    if (!isValidCSRF) {
      return { error: 'Invalid security token. Please refresh the page and try again.' };
    }
    
    const validatedData = SignInSchema.parse(formData);
    
    // Get IP address for rate limiting
    const headersList = headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const identifier = forwardedFor || realIp || 'anonymous';
    
    // Check rate limit
    const rateLimitResult = await checkRateLimit(authRateLimiter, identifier);
    
    if (!rateLimitResult.success) {
      return { 
        error: 'Too many sign-in attempts. Please try again later.',
        rateLimitExceeded: true,
        resetAt: rateLimitResult.reset
      };
    }
    
    const supabase = await createClient();

    const {
      data: { user },
      error: signInError,
    } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (signInError) {
      return { error: signInError.message };
    }

    if (!user) {
      return { error: 'No user found' };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single();

    return {
      success: true,
      redirectTo: `/account/${profile?.username || user.id}`,
      user,
    };
  } catch (error) {
    console.error('Sign in error:', error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unexpected error occurred' };
  }
}
