'use server';

import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';

const ResetPasswordSchema = z.object({
  email: z.string().email(),
});

export async function resetPassword(formData: { email: string }) {
  try {
    const validatedData = ResetPasswordSchema.parse(formData);
    const supabase = await createClient();

    // Ensure we have the site URL
    if (!process.env.NEXT_PUBLIC_APP_URL) {
      throw new Error('App URL is not configured');
    }

    // Construct the redirect URL
    const redirectTo = new URL(
      '/auth/callback',
      process.env.NEXT_PUBLIC_APP_URL
    ).toString();

    const { error } = await supabase.auth.resetPasswordForEmail(
      validatedData.email,
      {
        redirectTo,
      }
    );

    if (error) {
      console.error('Supabase reset password error:', error);

      // Handle rate limiting error specifically
      if (error.message.toLowerCase().includes('rate limit')) {
        return {
          error:
            'Please wait a few minutes before requesting another password reset email.',
        };
      }

      return { error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Reset password error:', error);
    if (error instanceof Error) {
      // Check for rate limit in caught errors as well
      if (error.message.toLowerCase().includes('rate limit')) {
        return {
          error:
            'Please wait a few minutes before requesting another password reset email.',
        };
      }
      return { error: error.message };
    }
    return { error: 'An unexpected error occurred' };
  }
}
