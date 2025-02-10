import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BuyTemplateCardProps {
  price: number;
  templateLink: string | null;
}

export default function BuyTemplateCard({
  price,
  templateLink,
}: BuyTemplateCardProps) {
  return (
    <div className='bg-white dark:bg-purple-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-purple-700'>
      <div className='space-y-6'>
        <div>
          <h3 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
            Buy Template
          </h3>
          <p className='text-gray-600 dark:text-gray-200 mt-2'>
            Get instant access to this template
          </p>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-3xl font-bold text-purple-600 dark:text-purple-200 mb-2'>
            ${price}
          </span>
        </div>

        {templateLink ? (
          <Link href={templateLink} target='_blank' rel='noopener noreferrer'>
            <Button className='w-full' size='lg'>
              Buy Now
            </Button>
          </Link>
        ) : (
          <Button className='w-full' size='lg' disabled>
            Currently Unavailable
          </Button>
        )}

        <div className='text-sm text-gray-500 dark:text-gray-400'>
          <p>✓ Full source code</p>
          <p>✓ Documentation included</p>
          <p>✓ Lifetime updates</p>
        </div>
      </div>
    </div>
  );
}
