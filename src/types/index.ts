import { SupabaseClient } from '@supabase/supabase-js';

export type Profile = {
  id: string;
  username: string | null;
  path: string | null;
  description: string | null;
  profile_image_url: string | null;
  email: string | null;
  phone: string | null;
  website_url: string | null;
  linkedin_url: string | null;
  x_url: string | null;
  github_url: string | null;
  updated_at: string;
  created_at: string;
};

export type Tables = {
  profiles: {
    Row: Profile;
    Insert: Omit<Profile, 'created_at' | 'updated_at'>;
    Update: Partial<Omit<Profile, 'id'>>;
  };
};

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
  ? Exclude<U, null>
  : never;

export type Schema = {
  public: {
    Tables: Tables;
  };
};

export type SupabaseDatabase = SupabaseClient<Schema>;

// Helper type for form inputs
export type ProfileFormData = Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
