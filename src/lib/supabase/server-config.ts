import 'server-only';

export const getServiceRoleKey = () => {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set in environment variables');
  }
  
  return key;
};

export const getOptionalServiceRoleKey = () => {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || null;
};

export const serverConfig = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  get supabaseServiceRoleKey() {
    return getServiceRoleKey();
  },
  supabaseServiceRoleKeyOptional: getOptionalServiceRoleKey(),
};