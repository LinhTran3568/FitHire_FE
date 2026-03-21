import { cn } from '@lib/utils';
import { forwardRef } from 'react';

import type { Size, Variant } from '@/types/index';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]',
  secondary:
    'glass dark:glass-dark text-slate-800 dark:text-slate-100 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 hover:scale-[1.02] active:scale-[0.98]',
  danger:
    'bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30 active:scale-[0.98]',
  ghost:
    'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98]',
  outline:
    'border-2 border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 dark:hover:border-blue-500 active:scale-[0.98]',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5 rounded-lg',
  md: 'h-11 px-6 text-sm gap-2 rounded-xl',
  lg: 'h-14 px-8 text-base gap-2.5 rounded-2xl',
};

/**
 * Premium Button Component with smooth micro-interactions.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled ?? loading}
        className={cn(
          'inline-flex items-center justify-center font-semibold tracking-wide',
          'transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)',
          'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-none',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';
