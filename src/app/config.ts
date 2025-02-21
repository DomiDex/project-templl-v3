import { unstable_noStore as noStore } from 'next/cache';

// Dynamic routes that should be statically generated at build time
export const dynamicParams = true;

// Enable static generation for routes that don't need dynamic data
export const dynamic = 'force-static';

// Revalidate static pages every hour (3600 seconds)
export const revalidate = 3600;

// Force dynamic rendering for routes that need real-time data
export function withDynamicRoute() {
  noStore();
}

// Configure static generation with ISR for specific routes
export const generateStaticParams = async () => {
  return [
    // Add your static paths here
    { slug: 'templates' },
    { slug: 'services' },
    { slug: 'projects' },
  ];
};
