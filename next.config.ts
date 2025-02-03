import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['hocycivcjajujxsprvfg.supabase.co'], // Replace with your actual Supabase project domain
  },
};

export default nextConfig;
