import { createClient } from '@supabase/supabase-js';
import { Tables } from '@/types';

// Create a public Supabase client that doesn't require cookies
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(): Promise<Response> {
  try {
    // Fetch dynamic routes data
    const [templates, services, categories, profiles] = await Promise.all([
      supabase
        .from('templates')
        .select('path')
        .returns<Pick<Tables['templates']['Row'], 'path'>[]>(),
      supabase
        .from('services')
        .select('path')
        .returns<Pick<Tables['services']['Row'], 'path'>[]>(),
      supabase
        .from('categories')
        .select('path')
        .returns<Pick<Tables['categories']['Row'], 'path'>[]>(),
      supabase
        .from('profiles')
        .select('path')
        .returns<Pick<Tables['profiles']['Row'], 'path'>[]>(),
    ]);

    // Static routes that don't need database access
    const staticRoutes = [
      '',
      '/templates',
      '/services',
      '/categories',
      '/about',
      '/sign-in',
      '/sign-up',
    ].map((route) => ({
      url: `https://templl.dev${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }));

    // Dynamic routes
    const dynamicRoutes = [
      ...(templates.data?.map((t) => `/templates/${t.path}`) || []),
      ...(services.data?.map((s) => `/services/${s.path}`) || []),
      ...(categories.data?.map((c) => `/categories/${c.path}`) || []),
      ...(profiles.data?.map((p) => `/profile/${p.path}`) || []),
    ].map((route) => ({
      url: `https://templl.dev${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }));

    const routes = [...staticRoutes, ...dynamicRoutes];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
        .map(
          (route) => `
        <url>
          <loc>${route.url}</loc>
          <lastmod>${route.lastModified}</lastmod>
        </url>
      `
        )
        .join('')}
    </urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Fallback to static sitemap if database access fails
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://templl.dev</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      </url>
      <url>
        <loc>https://templl.dev/templates</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      </url>
      <url>
        <loc>https://templl.dev/services</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      </url>
      <url>
        <loc>https://templl.dev/categories</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      </url>
      <url>
        <loc>https://templl.dev/about</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      </url>
    </urlset>`;

    return new Response(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  }
}
