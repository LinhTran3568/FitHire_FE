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
    'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-[var(--shadow-primary)] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] font-bold',
  secondary:
    'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] hover:scale-[1.02] active:scale-[0.98]',
  danger:
    'bg-[var(--color-danger-light)] text-[var(--color-danger)] hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-200 dark:border-red-500/30 active:scale-[0.98]',
  ghost:
    'bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-primary-muted)] hover:text-[var(--color-primary)] active:scale-[0.98]',
  outline:
    'border-2 border-[var(--color-border-strong)] bg-transparent text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-muted)] active:scale-[0.98]',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5 rounded-xl',
  md: 'h-11 px-6 text-sm gap-2 rounded-xl',
  lg: 'h-14 px-8 text-base gap-2.5 rounded-2xl',
};

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
          'transition-all duration-200 ease-out',
          'focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',
          'focus-visible:ring-offset-[var(--color-background)] focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none',
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
