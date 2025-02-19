import Link from 'next/link';
import Image from 'next/image';

interface ServiceCardProps {
  service: {
    id: string;
    path: string;
    og_image_url: string;
    service_name: string;
    price: number;
    user_username: string;
    stack_name: string;
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  if (!service) return null;

  const { path, og_image_url, service_name, price, user_username, stack_name } =
    service;

  return (
    <Link href={`/services/${path}`} className='block group'>
      <div className='bg-gray-50 dark:bg-purple-900/50  transition-colors duration-200 rounded-lg p-2 h-full'>
        <div className='aspect-[16/9] overflow-hidden rounded-md'>
          <Image
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
            src={og_image_url || '/placeholder-service.jpg'}
            alt={service_name}
            width={500}
            height={280}
          />
        </div>
        <div className='flex flex-row justify-between items-center gap-2 p-2'>
          <h3 className='text-gray-900 dark:text-gray-100 text-xl font-bold truncate'>
            {service_name}
          </h3>
          <p className='text-purple-600 dark:text-purple-400 font-semibold'>
            ${price}
          </p>
        </div>
        <div className='flex flex-row justify-between items-center gap-2 p-2'>
          <p className='text-gray-600 dark:text-gray-400 text-sm'>
            by {user_username}
          </p>
          <p className='text-gray-500 dark:text-gray-500 text-xs sm:text-sm'>
            {stack_name}
          </p>
        </div>
      </div>
    </Link>
  );
}
