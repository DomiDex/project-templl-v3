import localFont from 'next/font/local';

export const siteFont = localFont({
  src: [
    {
      path: '../../public/fonts/PPMori-Book.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPMori-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPMori-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPMori-ExtraBold.woff',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-site',
});
