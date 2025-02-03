'use client';
import { useThemeStore } from '@/features/theme/stores/theme-store';
import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number;
}

export function Logo({ className, width = '100%', height = 36 }: LogoProps) {
  const { theme } = useThemeStore();
  const fillColor = theme === 'dark' ? '#DEDEDE' : '#1F2937';

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 2481 719'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('transition-colors duration-300', className)}
    >
      <path
        d='M200.651 459.826H556.345L611.176 593.593L66.8837 585.233V267.535H0V142.128H66.8837V0H200.651V142.128H319.37V267.535H200.651V459.826Z'
        fill={fillColor}
      />
      <path
        d='M611.176 593.593C413.869 593.593 382.099 456.481 382.099 365.352C382.099 240.781 433.934 133.767 581.914 133.767C724.878 133.767 776.713 234.929 776.713 355.32V405.483H520.883C530.08 451.465 557.669 468.186 627.897 468.186C644.618 468.186 687.256 468.186 748.288 457.317V581.052C683.076 593.593 642.946 593.593 611.176 593.593ZM516.703 321.878H642.11C637.93 277.567 618.7 259.174 579.406 259.174C540.112 259.174 520.883 277.567 516.703 321.878Z'
        fill={fillColor}
      />
      <path
        d='M1119.29 267.535H993.883V585.233H860.115V142.128H1512.23V585.233H1378.46V267.535H1253.06V585.233H1119.29V267.535Z'
        fill={fillColor}
      />
      <path
        d='M1867.04 133.767C1989.94 133.767 2054.32 240.781 2054.32 363.68C2054.32 486.579 1989.94 593.593 1867.04 593.593C1821.06 593.593 1778.42 579.38 1746.65 530.89V719H1612.88V142.128H1746.65V196.471C1778.42 147.98 1821.06 133.767 1867.04 133.767ZM1833.6 468.186C1890.45 468.186 1920.55 434.744 1920.55 363.68C1920.55 292.616 1890.45 259.174 1833.6 259.174C1776.75 259.174 1746.65 292.616 1746.65 363.68C1746.65 434.744 1776.75 468.186 1833.6 468.186Z'
        fill={fillColor}
      />
      <path d='M2121.53 0H2255.3V585.233H2121.53V0Z' fill={fillColor} />
      <path d='M2346.87 0H2480.64V585.233H2346.87V0Z' fill={fillColor} />
    </svg>
  );
}
