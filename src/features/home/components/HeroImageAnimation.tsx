'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function HeroImageAnimation(): JSX.Element {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) * 0.5;
      const y = (clientY - innerHeight / 2) * 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className='relative w-full h-full'>
      <motion.div
        style={{
          rotateX: useTransform(springY, [-300, 300], [2, -2]),
          rotateY: useTransform(springX, [-300, 300], [-2, 2]),
          transformStyle: 'preserve-3d',
          perspective: 1200,
        }}
        className='relative w-full h-full'
      >
        <Image
          src='/images/hero-image.webp'
          alt='Hero Image'
          width={500}
          height={500}
          className='w-full h-full object-cover rounded-lg'
          priority
        />
      </motion.div>

      <motion.div
        className='absolute top-[-8%] left-[50%] transform -translate-x-1/2 z-10'
        style={{
          x: useTransform(springX, [-300, 300], [-20, 20]),
          y: useTransform(springY, [-300, 300], [-10, 10]),
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <Image
          src='/images/webflow.svg'
          alt='Webflow'
          width={65}
          height={65}
          className='drop-shadow-xl'
        />
      </motion.div>

      <motion.div
        className='absolute top-[20%] left-[-15%] z-10'
        style={{
          x: useTransform(springX, [-300, 300], [-15, 25]),
          y: useTransform(springY, [-300, 300], [-15, 15]),
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.08, 1],
        }}
        transition={{
          rotate: { duration: 35, repeat: Infinity, ease: 'linear' },
          scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <Image
          src='/images/react.svg'
          alt='React'
          width={70}
          height={70}
          className='drop-shadow-xl'
        />
      </motion.div>

      <motion.div
        className='absolute bottom-[10%] right-[-10%] z-10'
        style={{
          x: useTransform(springX, [-300, 300], [15, -25]),
          y: useTransform(springY, [-300, 300], [20, -15]),
        }}
        animate={{
          rotate: [360, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          rotate: { duration: 45, repeat: Infinity, ease: 'linear' },
          scale: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <Image
          src='/images/framer-icon.svg'
          alt='Framer'
          width={60}
          height={60}
          className='drop-shadow-xl'
        />
      </motion.div>

      <motion.div
        className='absolute bottom-[12%] left-[-5%] z-10'
        style={{
          x: useTransform(springX, [-300, 300], [-20, 15]),
          y: useTransform(springY, [-300, 300], [15, -20]),
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <Image
          src='/images/Svelte.svg'
          alt='Svelte'
          width={65}
          height={65}
          className='drop-shadow-xl'
        />
      </motion.div>

      <motion.div
        className='absolute top-[25%] right-[-12%] z-10'
        style={{
          x: useTransform(springX, [-300, 300], [25, -20]),
          y: useTransform(springY, [-300, 300], [-15, 25]),
        }}
        animate={{
          rotate: [0, -360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 50, repeat: Infinity, ease: 'linear' },
          scale: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <Image
          src='/images/next.svg'
          alt='Next.js'
          width={55}
          height={55}
          className='drop-shadow-xl'
        />
      </motion.div>
    </div>
  );
}
