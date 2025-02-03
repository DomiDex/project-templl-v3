'use server';

import { createClient } from '@/utils/supabase/server';
import { SignInFormData, SignInSchema } from '../types';

export async function signIn(formData: SignInFormData) {
  try {
    const validatedData = SignInSchema.parse(formData);
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
      .select('profile_username')
      .eq('id', user.id)
      .single();

    return {
      success: true,
      redirectTo: `account/${profile?.profile_username || user.id}`,
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
