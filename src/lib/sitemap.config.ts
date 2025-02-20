import { createClient } from '@supabase/supabase-js';

type ChangeFreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

interface SitemapRoute {
  url: string;
  lastMod: string;
  changeFreq: ChangeFreq;
  priority: number;
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Static pages that don't need to be fetched from the database
export const staticPages: SitemapRoute[] = [
  {
    url: '/',
    lastMod: new Date().toISOString(),
    changeFreq: 'daily',
    priority: 1.0,
  },
  {
    url: '/about',
    lastMod: new Date().toISOString(),
    changeFreq: 'monthly',
    priority: 0.8,
  },
  {
    url: '/sign-in',
    lastMod: new Date().toISOString(),
    changeFreq: 'yearly',
    priority: 0.5,
  },
  {
    url: '/sign-up',
    lastMod: new Date().toISOString(),
    changeFreq: 'yearly',
    priority: 0.5,
  },
  {
    url: '/privacy',
    lastMod: new Date().toISOString(),
    changeFreq: 'monthly',
    priority: 0.3,
  },
  {
    url: '/terms',
    lastMod: new Date().toISOString(),
    changeFreq: 'monthly',
    priority: 0.3,
  },
];

// Function to fetch all dynamic routes from Supabase
export async function getDynamicRoutes(): Promise<{
  profiles: SitemapRoute[];
  projects: SitemapRoute[];
  services: SitemapRoute[];
  templates: SitemapRoute[];
  categories: SitemapRoute[];
  stacks: SitemapRoute[];
}> {
  try {
    // Fetch all profiles
    const { data: profiles } = await supabase
      .from('profiles')
      .select('path, updated_at')
      .not('path', 'is', null);

    // Fetch all projects
    const { data: projects } = await supabase
      .from('projects')
      .select('path, updated_at')
      .not('path', 'is', null);

    // Fetch all services
    const { data: services } = await supabase
      .from('services')
      .select('path, updated_at')
      .not('path', 'is', null);

    // Fetch all templates
    const { data: templates } = await supabase
      .from('templates')
      .select('path, updated_at')
      .not('path', 'is', null);

    // Fetch all categories
    const { data: categories } = await supabase
      .from('categories')
      .select('path, updated_at')
      .not('path', 'is', null);

    // Fetch all stacks
    const { data: stacks } = await supabase
      .from('stacks')
      .select('path, updated_at')
      .not('path', 'is', null);

    return {
      profiles:
        profiles?.map((profile) => ({
          url: `/profile/${profile.path}`,
          lastMod: profile.updated_at,
          changeFreq: 'weekly' as ChangeFreq,
          priority: 0.7,
        })) || [],
      projects:
        projects?.map((project) => ({
          url: `/projects/${project.path}`,
          lastMod: project.updated_at,
          changeFreq: 'weekly' as ChangeFreq,
          priority: 0.6,
        })) || [],
      services:
        services?.map((service) => ({
          url: `/services/${service.path}`,
          lastMod: service.updated_at,
          changeFreq: 'weekly' as ChangeFreq,
          priority: 0.6,
        })) || [],
      templates:
        templates?.map((template) => ({
          url: `/templates/${template.path}`,
          lastMod: template.updated_at,
          changeFreq: 'daily' as ChangeFreq,
          priority: 0.8,
        })) || [],
      categories:
        categories?.map((category) => ({
          url: `/categories/${category.path}`,
          lastMod: category.updated_at,
          changeFreq: 'weekly' as ChangeFreq,
          priority: 0.5,
        })) || [],
      stacks:
        stacks?.map((stack) => ({
          url: `/stacks/${stack.path}`,
          lastMod: stack.updated_at,
          changeFreq: 'weekly' as ChangeFreq,
          priority: 0.5,
        })) || [],
    };
  } catch (error) {
    console.error('Error fetching dynamic routes:', error);
    return {
      profiles: [],
      projects: [],
      services: [],
      templates: [],
      categories: [],
      stacks: [],
    };
  }
}
