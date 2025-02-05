import { cn } from '@/lib/utils';
import Image from 'next/image';

interface TemplateAccountCardProps {
  template: {
    id: string;
    template_name: string;
    stack_name: string;
    user_username: string;
    thumbnail_url: string;
    price: number;
  };
  onEdit: (template: TemplateAccountCardProps['template']) => void;
  onDelete: () => void;
}

export default function TemplateAccountCard({
  template,
  onEdit,
  onDelete,
}: TemplateAccountCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div className='relative overflow-hidden bg-gray-200 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 group rounded-lg p-2 h-full border-shadow-sm border-gray-300 dark:border-gray-700'>
      <div className='relative w-full h-48'>
        <Image
          className='object-cover rounded-md'
          src={template.thumbnail_url || '/placeholder-template.jpg'}
          alt={template.template_name || 'Template'}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <div className='flex flex-row justify-between items-center gap-2 p-2'>
        <h3 className='text-gray-900 dark:text-gray-100 text-xl font-bold'>
          {template.template_name}
        </h3>
        <p className='text-lg font-semibold text-purple-600 dark:text-purple-400'>
          ${template.price}
        </p>
      </div>
      <div className='flex flex-row justify-between items-center gap-2 p-2'>
        <p className='text-gray-600 dark:text-gray-400'>
          by {template.user_username}
        </p>
        <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
          {template.stack_name}
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
            onEdit(template);
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
