import AccountHeader from '@/components/layout/AccountHeader';
import Footer from '@/components/layout/Footer';
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
