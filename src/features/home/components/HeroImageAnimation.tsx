'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function HeroImageAnimation(): JSX.Element {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = clientX - innerWidth / 2;
      const y = clientY - innerHeight / 2;
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
          rotateX: useTransform(springY, [-300, 300], [5, -5]),
          rotateY: useTransform(springX, [-300, 300], [-5, 5]),
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        className='relative w-full h-full'
      >
        <Image
          src='/images/hero-image.webp'
          alt='Hero Image'
          width={500}
          height={500}
          className='w-full h-full object-cover rounded-lg'
        />
      </motion.div>

      <motion.div
        className='absolute top-[-15%] left-[45%] z-10'
        style={{
          x: useTransform(springX, [-300, 300], [-30, 30]),
          y: useTransform(springY, [-300, 300], [-15, 15]),
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
          width={55}
          height={55}
          className='drop-shadow-xl'
        />
      </motion.div>

      <motion.div
        className='absolute top-[10%] left-[-10%] z-10'
        style={{
          x: useTransform(springX, [-300, 300], [-10, 40]),
          y: useTransform(springY, [-300, 300], [-25, 25]),
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.08, 1],
        }}
        transition={{
          rotate: { duration: 35, repeat: Infinity, ease: 'linear' },
          scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          delay: 1,
        }}
      >
        <Image
          src='/images/react.svg'
          alt='React'
          width={60}
          height={60}
          className='drop-shadow-xl'
        />
      </motion.div>

      <motion.div
        className='absolute bottom-[15%] right-[20%] z-10'
        style={{
          x: useTransform(springX, [-300, 300], [20, -35]),
          y: useTransform(springY, [-300, 300], [30, -20]),
        }}
        animate={{
          rotate: [360, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          rotate: { duration: 45, repeat: Infinity, ease: 'linear' },
          scale: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          delay: 2,
        }}
      >
        <Image
          src='/images/Framer.svg'
          alt='Framer'
          width={50}
          height={50}
          className='drop-shadow-xl'
        />
      </motion.div>

      <motion.div
        className='absolute top-[30%] right-[-5%] z-10'
        style={{
          x: useTransform(springX, [-300, 300], [35, -15]),
          y: useTransform(springY, [-300, 300], [-20, 35]),
        }}
        animate={{
          rotate: [0, -360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 50, repeat: Infinity, ease: 'linear' },
          scale: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
          delay: 1.5,
        }}
      >
        <Image
          src='/images/next.svg'
          alt='Next.js'
          width={45}
          height={45}
          className='drop-shadow-xl'
        />
      </motion.div>
    </div>
  );
}
