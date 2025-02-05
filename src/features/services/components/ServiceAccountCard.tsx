import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ServiceAccountCardProps {
  service: {
    id: string;
    service_name: string;
    stack_name: string;
    user_username: string;
    og_image_url: string;
    price: number;
  };
  onEdit: (service: ServiceAccountCardProps['service']) => void;
  onDelete: () => void;
}

export default function ServiceAccountCard({
  service,
  onEdit,
  onDelete,
}: ServiceAccountCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div className='relative overflow-hidden bg-gray-200 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 group rounded-lg p-2 h-full border-shadow-sm border-gray-300 dark:border-gray-700'>
      <div className='relative w-full h-48'>
        <Image
          className='object-cover rounded-md'
          src={service.og_image_url || '/placeholder-service.jpg'}
          alt={service.service_name || 'Service'}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <div className='flex flex-row justify-between items-center gap-2 p-2'>
        <h3 className='text-gray-900 dark:text-gray-100 text-xl font-bold'>
          {service.service_name}
        </h3>
        <p className='text-lg font-semibold text-purple-600 dark:text-purple-400'>
          ${service.price}
        </p>
      </div>
      <div className='flex flex-row justify-between items-center gap-2 p-2'>
        <p className='text-gray-600 dark:text-gray-400'>
          by {service.user_username}
        </p>
        <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
          {service.stack_name}
        </p>
      </div>

      <div
        className={cn(
          'absolute bottom-0 left-0 w-full h-full flex flex-col justify-center items-center',
          'translate-y-full group-hover:translate-y-0 transition-all duration-200',
          'rounded-md gap-2'
        )}
      >
        <button
          className='relative z-10 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 py-2 px-4 rounded transition-colors duration-200 w-32'
          onClick={(e) => {
            e.stopPropagation();
            onEdit(service);
          }}
        >
          Edit
        </button>
        <button
          className='bg-purple-500 hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-300 text-white py-2 px-4 rounded transition-colors duration-200 w-32'
          onClick={handleDelete}
        >
          Delete
        </button>
        <div className='absolute -z-10 bottom-0 left-0 w-full h-full bg-gray-900 dark:bg-gray-800 opacity-30'></div>
      </div>
    </div>
  );
}
