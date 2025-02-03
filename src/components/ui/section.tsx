import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  padding?: keyof typeof paddingSizes;
  background?: BackgroundColor;
  darkBackground?: BackgroundColor;
  fullHeight?: boolean;
  noPadding?: boolean;
}

const paddingSizes = {
  none: '',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-24',
} as const;

type ColorScale = Record<string, string>;

type BackgroundColors = {
  background: string;
  foreground: string;
  gray: ColorScale;
  purple: ColorScale;
  hover: {
    light: string;
    dark: string;
    purple: string;
  };
  white: string;
};

type BackgroundColor =
  | keyof BackgroundColors
  | `${keyof BackgroundColors & string}.${string}`;

const backgroundColors: BackgroundColors = {
  background: 'bg-background',
  foreground: 'bg-foreground',
  gray: {
    50: 'bg-gray-50',
    100: 'bg-gray-100',
    200: 'bg-gray-200',
    300: 'bg-gray-300',
    400: 'bg-gray-400',
    500: 'bg-gray-500',
    600: 'bg-gray-600',
    700: 'bg-gray-700',
    800: 'bg-gray-800',
    900: 'bg-gray-900',
  },
  purple: {
    50: 'bg-purple-50',
    100: 'bg-purple-100',
    200: 'bg-purple-200',
    300: 'bg-purple-300',
    400: 'bg-purple-400',
    500: 'bg-purple-500',
    600: 'bg-purple-600',
    700: 'bg-purple-700',
    800: 'bg-purple-800',
    900: 'bg-purple-900',
  },
  hover: {
    light: 'bg-hover-light',
    dark: 'bg-hover-dark',
    purple: 'bg-hover-purple',
  },
  white: 'bg-white',
} as const;

function getBackgroundColor(color: BackgroundColor): string {
  const [category, shade] = color.split('.') as [
    keyof BackgroundColors,
    string | undefined
  ];

  if (!shade) {
    return backgroundColors[category] as string;
  }

  const scale = backgroundColors[category];
  if (typeof scale === 'string') return scale;
  if ('light' in scale)
    return (scale as typeof backgroundColors.hover)[
      shade as keyof typeof backgroundColors.hover
    ];
  return (scale as ColorScale)[shade] || '';
}

export function Section({
  as: Component = 'section',
  padding = 'md',
  background,
  darkBackground,
  fullHeight = false,
  noPadding = false,
  className,
  children,
  ...props
}: SectionProps) {
  const bgClass = background ? getBackgroundColor(background) : '';
  const darkBgClass = darkBackground
    ? getBackgroundColor(darkBackground).replace('bg-', 'dark:bg-')
    : '';

  return (
    <Component
      className={cn(
        !noPadding && paddingSizes[padding],
        bgClass,
        darkBgClass,
        fullHeight && 'h-screen',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
