export async function GET() {
  const robotsTxt = `
# *
User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard/
Disallow: /admin/

# Host
Host: https://templl.dev

# Sitemaps
Sitemap: https://templl.dev/sitemap.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
