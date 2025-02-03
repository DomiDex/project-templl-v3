import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: keyof typeof containerSizes;
  flex?: boolean;
  direction?: keyof typeof flexDirections;
  items?: keyof typeof alignItems;
  justify?: keyof typeof justifyContent;
  noPadding?: boolean;
}

const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
} as const;

const flexDirections = {
  row: 'flex-row',
  col: 'flex-col',
} as const;

const alignItems = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  between: 'items-between',
} as const;

const justifyContent = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
} as const;

export function Container({
  as: Component = 'div',
  size = 'lg',
  flex = false,
  direction = 'row',
  items = 'start',
  justify = 'start',
  noPadding = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full',
        !noPadding && 'px-4 sm:px-6 lg:px-8',
        containerSizes[size],
        flex && 'flex',
        flex && flexDirections[direction],
        flex && alignItems[items],
        flex && justifyContent[justify],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
