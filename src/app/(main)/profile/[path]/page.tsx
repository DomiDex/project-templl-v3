import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ProfileSidebar from '@/features/profile/components/ProfileSidebar';
import ProfileContent from '@/features/profile/components/ProfileContent';
import { Profile } from '@/types';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { path: string };
}): Promise<Metadata> {
  const supabase = await createClient();

  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('path', params.path)
      .single();

    if (error || !profile) {
      return {
        title: 'Profile Not Found - Templl.dev',
        description: 'The requested developer profile could not be found.',
      };
    }

    const title = `${profile.username}'s Profile - Templl.dev`;
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
        images: [
          {
            url: profile.profile_image_url || '/profile-og-image@2x.webp',
            width: 1200,
            height: 630,
            alt: `${profile.username}'s Profile`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [profile.profile_image_url || '/profile-og-image@2x.webp'],
        creator: '@domidex_dev',
        site: '@templl_dev',
      },
      alternates: {
        canonical: `https://templl.dev/profile/${params.path}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error('Error generating profile metadata:', error);
    return {
      title: 'Developer Profile - Templl.dev',
      description: 'Discover talented developers on Templl.dev',
    };
  }
}

export default async function ProfilePage({
  params,
}: {
  params: { path: string };
}) {
  const supabase = await createClient();

  // Fetch profile data
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('path', params.path)
    .single();

  if (error || !profile) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Profile', href: `/profile/${params.path}` },
  ];

  return (
    <Section padding='xl'>
      <Container size='lg'>
        {/* Header Section */}
        <div className='space-y-8 mb-12'>
          <Breadcrumb items={breadcrumbItems} />
          <div className='max-w-4xl'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50'>
              {profile.username}&apos;s Profile
            </h1>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* Sidebar */}
          <div className='lg:col-span-4'>
            <ProfileSidebar profile={profile as Profile} />
          </div>

          {/* Main Content */}
          <div className='lg:col-span-8'>
            <ProfileContent userId={profile.id} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
