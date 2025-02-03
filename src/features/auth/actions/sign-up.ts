'use server';

import { createClient } from '@/utils/supabase/server';
import { SignUpFormData, SignUpSchema } from '../types';

export async function signUp(formData: SignUpFormData) {
  try {
    const validatedData = SignUpSchema.parse(formData);
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

    // Create auth user - profile will be created automatically via trigger
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        data: {
          username: validatedData.username,
        },
      },
    });

    if (authError) {
      console.error('Auth error:', authError);
      return { error: authError.message };
    }

    if (!authData.user) {
      return { error: 'Failed to create user' };
    }

    // Wait a moment for the trigger to complete
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Verify profile was created
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profile) {
      console.error('Profile verification error:', profileError);
      // Clean up the auth user if profile wasn't created
      await supabase.auth.admin.deleteUser(authData.user.id);
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
