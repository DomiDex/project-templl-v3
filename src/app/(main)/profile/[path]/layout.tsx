import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface ProfileLayoutProps {
  children: React.ReactNode;
  params: { path: string };
}

// Generate dynamic metadata based on profile data
export async function generateMetadata({
  params,
}: ProfileLayoutProps): Promise<Metadata> {
  const supabase = await createClient();

  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select(
        `
        username,
        description,
        profile_image_url,
        website_url,
        linkedin_url,
        x_url,
        github_url,
        email
      `
      )
      .eq('path', params.path)
      .single();

    if (error || !profile) {
      return {
        title: 'Profile Not Found - Templl.dev',
        description: 'The requested profile could not be found.',
      };
    }

    const title = `${profile.username} - Developer Profile | Templl.dev`;
    const description =
      profile.description ||
      `Check out ${profile.username}'s developer profile on Templl.dev. Browse their templates, projects, and services.`;

    return {
      title,
      description,
      openGraph: {
        type: 'profile',
        locale: 'en_US',
        url: `https://templl.dev/profile/${params.path}`,
        siteName: 'Templl.dev',
        title,
        description,
        images: profile.profile_image_url
          ? [
              {
                url: profile.profile_image_url,
                width: 400,
                height: 400,
                alt: `${profile.username}'s profile picture`,
              },
            ]
          : undefined,
      },
      twitter: {
        card: 'summary',
        title,
        description,
        images: profile.profile_image_url
          ? [profile.profile_image_url]
          : undefined,
        creator: profile.x_url ? profile.x_url.split('/').pop() : '@templl_dev',
        site: '@templl_dev',
      },
      alternates: {
        canonical: `https://templl.dev/profile/${params.path}`,
      },
    };
  } catch (error) {
    console.error('Error generating profile metadata:', error);
    return {
      title: 'Developer Profile - Templl.dev',
      description: 'View developer profile on Templl.dev',
    };
  }
}

// Generate JSON-LD schema for the profile
async function generateProfileJsonLd(path: string) {
  const supabase = await createClient();

  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select(
        `
        username,
        description,
        profile_image_url,
        website_url,
        linkedin_url,
        x_url,
        github_url,
        email,
        templates (count),
        projects (count),
        services (count)
      `
      )
      .eq('path', path)
      .single();

    if (error || !profile) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `https://templl.dev/profile/${path}#person`,
      name: profile.username,
      description: profile.description,
      image: profile.profile_image_url,
      url: `https://templl.dev/profile/${path}`,
      email: profile.email,
      sameAs: [
        profile.website_url,
        profile.linkedin_url,
        profile.x_url,
        profile.github_url,
      ].filter(Boolean),
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://templl.dev/#organization',
      },
      mainEntityOfPage: {
        '@type': 'ProfilePage',
        '@id': `https://templl.dev/profile/${path}#webpage`,
        name: `${profile.username}'s Profile - Templl.dev`,
        description: profile.description,
        url: `https://templl.dev/profile/${path}`,
        isPartOf: {
          '@id': 'https://templl.dev/#website',
        },
      },
    };
  } catch (error) {
    console.error('Error generating profile JSON-LD:', error);
    return null;
  }
}

export default async function ProfileLayout({
  children,
  params,
}: ProfileLayoutProps) {
  const supabase = await createClient();

  // Fetch profile data
  const { data: profile, error } = await supabase
    .from('profiles')
    .select(
      `
      username,
      description,
      profile_image_url,
      website_url,
      linkedin_url,
      x_url,
      github_url,
      email,
      isPro
    `
    )
    .eq('path', params.path)
    .single();

  if (error || !profile) {
    notFound();
  }

  const jsonLd = await generateProfileJsonLd(params.path);

  return (
    <Section padding='lg'>
      {jsonLd && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      )}
      <Container size='lg'>
        <div className='max-w-5xl mx-auto'>
          {/* Profile Header */}
          <div className='mb-12'>
            <div className='flex flex-col md:flex-row items-center md:items-start gap-8'>
              {/* Profile Image */}
              <div className='relative w-32 h-32 md:w-40 md:h-40'>
                {profile.profile_image_url ? (
                  <Image
                    src={profile.profile_image_url}
                    alt={`${profile.username}'s profile picture`}
                    fill
                    className='rounded-full object-cover'
                  />
                ) : (
                  <div className='w-full h-full rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center'>
                    <span className='text-4xl text-gray-500 dark:text-gray-400'>
                      {profile.username?.[0]?.toUpperCase()}
                    </span>
                  </div>
                )}
                {profile.isPro && (
                  <div className='absolute -bottom-2 -right-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
                    PRO
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className='flex-1 text-center md:text-left'>
                <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4'>
                  {profile.username}
                </h1>
                {profile.description && (
                  <p className='text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl'>
                    {profile.description}
                  </p>
                )}

                {/* Social Links */}
                <div className='flex flex-wrap justify-center md:justify-start gap-4'>
                  {profile.website_url && (
                    <a
                      href={profile.website_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors'
                    >
                      <span className='sr-only'>Website</span>
                      <svg
                        className='w-6 h-6'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' />
                      </svg>
                    </a>
                  )}
                  {profile.github_url && (
                    <a
                      href={profile.github_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors'
                    >
                      <span className='sr-only'>GitHub</span>
                      <svg
                        className='w-6 h-6'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' />
                      </svg>
                    </a>
                  )}
                  {profile.linkedin_url && (
                    <a
                      href={profile.linkedin_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors'
                    >
                      <span className='sr-only'>LinkedIn</span>
                      <svg
                        className='w-6 h-6'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' />
                      </svg>
                    </a>
                  )}
                  {profile.x_url && (
                    <a
                      href={profile.x_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors'
                    >
                      <span className='sr-only'>X (Twitter)</span>
                      <svg
                        className='w-6 h-6'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Pills */}
          <nav className='flex flex-wrap justify-center md:justify-start gap-2 mb-12'>
            <a
              href={`/profile/${params.path}`}
              className='px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors'
            >
              Overview
            </a>
            <a
              href={`/profile/${params.path}/templates`}
              className='px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors'
            >
              Templates
            </a>
            <a
              href={`/profile/${params.path}/projects`}
              className='px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors'
            >
              Projects
            </a>
            <a
              href={`/profile/${params.path}/services`}
              className='px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors'
            >
              Services
            </a>
          </nav>

          {/* Main Content */}
          <div className='min-h-[50vh]'>{children}</div>
        </div>
      </Container>
    </Section>
  );
}
