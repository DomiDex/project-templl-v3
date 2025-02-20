import AccountHeader from '@/components/layout/AccountHeader';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Dashboard | Templl',
  description:
    'Manage your developer profile, projects, templates, and services. Showcase your work and connect with potential clients.',
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AccountHeader />
      <main className='container mx-auto py-6'>{children}</main>
      <Footer />
    </>
  );
}
