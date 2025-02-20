import { MetadataRoute } from 'next';
import { staticPages, getDynamicRoutes } from '@/lib/sitemap.config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  // Get all dynamic routes
  const dynamicRoutes = await getDynamicRoutes();

  // Combine all routes
  const routes = [
    ...staticPages,
    ...dynamicRoutes.profiles,
    ...dynamicRoutes.projects,
    ...dynamicRoutes.services,
    ...dynamicRoutes.templates,
    ...dynamicRoutes.categories,
    ...dynamicRoutes.stacks,
  ];

  // Add base URL to all routes and format according to Next.js sitemap requirements
  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: route.lastMod,
    changeFrequency: route.changeFreq,
    priority: route.priority,
  })) as MetadataRoute.Sitemap;
}
