import Link from 'next/link';

interface TemplateCardProps {
  template: {
    id: string;
    path: string;
    thumbnail_image_url: string;
    template_name: string;
    price: number;
    user_username: string;
    stack_name: string;
  };
}

export default function TemplateCard({ template }: TemplateCardProps) {
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
      <div className='bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 rounded-lg p-2 h-full'>
        <div className='aspect-[16/9] overflow-hidden rounded-md'>
          <img
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
            src={thumbnail_image_url || '/placeholder-template.jpg'}
            alt={template_name}
          />
        </div>
        <div className='flex flex-row justify-between items-center gap-2 p-2'>
          <h3 className='text-gray-900 dark:text-gray-100 text-xl font-bold truncate'>
            {template_name}
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
