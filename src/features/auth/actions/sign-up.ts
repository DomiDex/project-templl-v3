'use server';

import { createClient } from '@/utils/supabase/server';
import { SignUpFormData, SignUpSchema } from '../types';
import { authRateLimiter, checkRateLimit } from '@/lib/rate-limit';
import { validateCSRFToken } from '@/lib/csrf';
import { headers } from 'next/headers';

const isDevelopment = process.env.NODE_ENV === 'development';

export async function signUp(formData: SignUpFormData & { _csrf?: string }) {
  try {
    // Validate CSRF token
    const isValidCSRF = await validateCSRFToken(formData._csrf);
    if (!isValidCSRF) {
      return { error: 'Invalid security token. Please refresh the page and try again.' };
    }
    
    const validatedData = SignUpSchema.parse(formData);
    
    // Get IP address for rate limiting
    const headersList = headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const identifier = forwardedFor || realIp || 'anonymous';
    
    // Check rate limit
    const rateLimitResult = await checkRateLimit(authRateLimiter, identifier);
    
    if (!rateLimitResult.success) {
      return { 
        error: 'Too many sign-up attempts. Please try again later.',
        rateLimitExceeded: true,
        resetAt: rateLimitResult.reset
      };
    }
    
    const supabase = await createClient();

    // Check if username already exists
    const { data: existingUsername, error: usernameError } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', validatedData.username)
      .single();

    if (usernameError && usernameError.code !== 'PGRST116') {
      console.error('Username check error:', usernameError);
      return { error: 'Error checking username availability' };
    }

    if (existingUsername) {
      return { error: 'Username already taken' };
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
        data: {
          username: validatedData.username,
        },
      },
    });

    if (authError) {
      console.error('Auth error:', authError);
      
      // Handle specific email-related errors
      if (authError.message.includes('email') || authError.status === 500) {
        if (isDevelopment) {
          return { 
            error: 'Email service not configured. In development, you can:\n' +
                   '1. Configure SMTP in Supabase dashboard\n' +
                   '2. Use Supabase Inbucket for local testing\n' +
                   '3. Check spam folder for verification emails',
            isEmailError: true 
          };
        }
        return { 
          error: 'Unable to send verification email. Please try again later or contact support.',
          isEmailError: true 
        };
      }
      
      return { error: authError.message };
    }

    if (!authData.user) {
      return { error: 'Failed to create user' };
    }

    // Manually create the profile since trigger might not exist
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        username: validatedData.username,
        email: validatedData.email,
        path: validatedData.username.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        description: null,
        profile_image_url: null,
        phone: null,
        website_url: null,
        linkedin_url: null,
        x_url: null,
        github_url: null,
        isPro: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Note: We cannot delete the auth user from client-side
      // The user will need to try signing up again or contact support
      return { error: 'Failed to create profile. Please try again.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Sign up error:', error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unexpected error occurred' };
  }
}
