import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/private/',
        '/sign-in',
        '/sign-up',
        '/dashboard/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
