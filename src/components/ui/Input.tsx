import { cn } from '@lib/utils';
import { forwardRef } from 'react';

import type { Size } from '@/types/index';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  inputSize?: Size;
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-8 text-sm',
  md: 'h-11 text-sm',
  lg: 'h-13 text-base',
};

const paddingStyles: Record<
  Size,
  { left: string; right: string; leftWithAddon: string; rightWithAddon: string }
> = {
  sm: {
    left: 'pl-2.5',
    right: 'pr-2.5',
    leftWithAddon: 'pl-8',
    rightWithAddon: 'pr-8',
  },
  md: {
    left: 'pl-3.5',
    right: 'pr-3.5',
    leftWithAddon: 'pl-10',
    rightWithAddon: 'pr-10',
  },
  lg: {
    left: 'pl-4',
    right: 'pr-4',
    leftWithAddon: 'pl-11',
    rightWithAddon: 'pr-11',
  },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      leftAddon,
      rightAddon,
      inputSize = 'md',
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    const hasError = Boolean(errorMessage);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftAddon && (
            <span
              className="pointer-events-none absolute left-3.5"
              style={{ color: 'var(--color-text-subtle)' }}
            >
              {leftAddon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-xl border outline-none',
              'transition-all duration-200',
              'placeholder:text-[var(--color-text-subtle)]',
              'disabled:cursor-not-allowed disabled:opacity-50',
              hasError
                ? 'border-[var(--color-danger)] bg-[var(--color-danger-light)] focus:ring-2 focus:ring-[var(--color-danger)]/20'
                : 'border-[var(--color-border)] bg-[var(--color-surface)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-muted)]',
              'text-[var(--color-text)]',
              sizeStyles[inputSize],
              leftAddon
                ? paddingStyles[inputSize].leftWithAddon
                : paddingStyles[inputSize].left,
              rightAddon
                ? paddingStyles[inputSize].rightWithAddon
                : paddingStyles[inputSize].right,
              className,
            )}
            {...props}
          />

          {rightAddon && (
            <span
              className="pointer-events-none absolute right-3.5"
              style={{ color: 'var(--color-text-subtle)' }}
            >
              {rightAddon}
            </span>
          )}
        </div>

        {(helperText ?? errorMessage) && (
          <p
            className={cn(
              'text-xs font-medium',
              hasError ? 'text-[var(--color-danger)]' : 'text-[var(--color-text-muted)]',
            )}
          >
            {errorMessage ?? helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
