import Link from 'next/link';
import Image from 'next/image';

interface PublicTemplateCardProps {
  template: {
    id: string;
    template_name: string;
    stack_name: string;
    user_username: string;
    thumbnail_image_url: string;
    price: number;
    path: string;
  };
}

export default function PublicTemplateCard({
  template,
}: PublicTemplateCardProps) {
  if (!template) return null;

  const {
    path,
    thumbnail_image_url,
    template_name,
    price,
    user_username,
    stack_name,
  } = template;

  return (
    <Link href={`/templates/${path}`} className='block group'>
      <div className='bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-purple-800 transition-colors duration-200 rounded-lg p-2 h-full'>
        <div className='aspect-[16/9] overflow-hidden rounded-md'>
          <Image
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
            src={thumbnail_image_url || '/placeholder-template.jpg'}
            alt={template_name}
            width={1000}
            height={1000}
          />
        </div>
        <div className='p-4'>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-50 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200'>
            {template_name}
          </h3>
          <p className='text-purple-600 dark:text-purple-400 font-semibold'>
            ${price}
          </p>
        </div>
        <div className='flex flex-row justify-between items-center gap-2 px-4 pb-4'>
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
