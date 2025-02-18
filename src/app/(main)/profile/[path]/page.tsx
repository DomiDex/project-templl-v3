import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ProfileSidebar from '@/features/profile/components/ProfileSidebar';
import ProfileContent from '@/features/profile/components/ProfileContent';
import { Profile } from '@/types';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

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
    <Section padding='lg'>
      <Container size='lg'>
        <Breadcrumb items={breadcrumbItems} className='mb-6' />
        <h1 className='text-4xl font-bold mb-20'>
          Welcome to <br className='hidden md:block' /> {profile.username}
          &apos;s Profile
        </h1>
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Sidebar */}
          <div className='w-full md:w-1/4'>
            <ProfileSidebar profile={profile as Profile} />
          </div>
          {/* Main Content */}
          <div className='w-full md:w-3/4'>
            <ProfileContent userId={profile.id} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
