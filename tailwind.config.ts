import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Gray Scale
        gray: {
          50: '#F9F9F9',
          100: '#F2F2F2', // existing lightGray
          200: '#E6E5E8', // existing darkerGray
          300: '#D1D0D4',
          400: '#B6B6B6', // existing darkGray
          500: '#9B9B9B',
          600: '#767676',
          700: '#595959',
          800: '#3B3B3B',
          900: '#242424',
        },

        // Purple Scale
        purple: {
          50: '#F5F3F5',
          100: '#EBE7EA',
          200: '#D7CFD6',
          300: '#9A8E99',
          400: '#726170', // existing lightPurple
          500: '#4F394C', // existing purple
          600: '#474554', // existing darkPurple
          700: '#3A2F3D',
          800: '#2D252F',
          900: '#201B22',
        },

        // Hover States
        hover: {
          light: '#DADADD', // existing hoverGray
          dark: '#363040', // new dark hover
          purple: '#5A4257', // new purple hover
        },

        // Status/Accent Colors
        error: {
          light: '#FF4332', // existing red-500
          dark: '#CC3629',
        },
        success: {
          light: '#4CAF50',
          dark: '#3D8C40',
        },
        warning: {
          light: '#FFC107',
          dark: '#CC9A06',
        },
        info: {
          light: '#1976D2',
          dark: '#145EA8',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-site)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
