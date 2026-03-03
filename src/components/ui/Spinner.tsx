import { cn } from '@lib/utils';

import type { Size } from '@/types/index';

interface SpinnerProps {
  size?: Size;
  className?: string;
  label?: string;
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-[3px]',
};

/**
 * Loading spinner.
 *
 * @example
 * <Spinner size="md" label="Loading data..." />
 */
export function Spinner({ size = 'md', label = 'Loading…', className }: SpinnerProps) {
  return (
    <div role="status" className="inline-flex flex-col items-center gap-2">
      <span
        className={cn(
          'animate-spin rounded-full border-gray-200 border-t-blue-600',
          sizeStyles[size],
          className,
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
