import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Enable TypeScript error checking during builds
    ignoreBuildErrors: false,
  },
  eslint: {
    // Enable ESLint error checking during builds
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hocycivcjajujxsprvfg.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Security headers are now handled in middleware.ts
  // Performance optimizations
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
