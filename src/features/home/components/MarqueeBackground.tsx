'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  '/images/developers/dev1.webp',
  '/images/developers/dev1.webp',
  '/images/developers/dev1.webp',
  '/images/developers/dev1.webp',
  '/images/developers/dev1.webp',
  '/images/developers/dev1.webp',
];

export function MarqueeBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 300], [0.2, 0.15]);

  return (
    <>
      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-purple-900/90 via-purple-800/85 to-purple-900/90 z-10' />

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] z-20" />

      {/* Image Grid */}
      <motion.div
        style={{ opacity }}
        className='absolute inset-0 overflow-hidden'
      >
        <div className='relative h-full w-full flex gap-6 px-6'>
          <motion.div
            style={{ y: y1 }}
            className='flex-1 min-w-0 flex flex-col gap-6'
          >
            {images.map((src, i) => (
              <motion.div
                key={i}
                className='relative h-80 w-full'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Image
                  src={src}
                  alt=''
                  fill
                  className='object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500'
                  sizes='(max-width: 768px) 50vw, 33vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent rounded-2xl' />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            className='flex-1 min-w-0 flex flex-col gap-6 pt-20'
          >
            {[...images].reverse().map((src, i) => (
              <motion.div
                key={i}
                className='relative h-80 w-full'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: (i + images.length) * 0.1 }}
              >
                <Image
                  src={src}
                  alt=''
                  fill
                  className='object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500'
                  sizes='(max-width: 768px) 50vw, 33vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent rounded-2xl' />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Radial Gradient */}
      <div className='absolute inset-0 bg-gradient-radial from-transparent via-purple-900/50 to-purple-900/80 z-30' />
    </>
  );
}
