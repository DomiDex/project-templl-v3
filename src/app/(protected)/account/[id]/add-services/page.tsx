import { Metadata } from 'next';
import AddServicesClient from './client';

export const metadata: Metadata = {
  title: 'Add Services | Account | Templl',
  description:
    'Offer your development services to clients. Create and manage your service listings, set pricing, and grow your business.',
};

export default function AddServicesPage() {
  return <AddServicesClient />;
}
