import { forwardRef } from 'react';

import { cn } from '@lib/utils';
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
  sm: 'h-8 px-2.5 text-sm',
  md: 'h-10 px-3 text-sm',
  lg: 'h-12 px-4 text-base',
};

/**
 * Input component with optional label, addons, and error state.
 *
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="you@example.com"
 *   errorMessage={errors.email}
 * />
 */
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
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftAddon && <span className="absolute left-3 text-gray-400">{leftAddon}</span>}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-md border bg-white outline-none',
              'transition-colors duration-150',
              'placeholder:text-gray-400',
              'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
              'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
              hasError
                ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300',
              leftAddon && 'pl-9',
              rightAddon && 'pr-9',
              sizeStyles[inputSize],
              className,
            )}
            {...props}
          />

          {rightAddon && <span className="absolute right-3 text-gray-400">{rightAddon}</span>}
        </div>

        {(helperText ?? errorMessage) && (
          <p className={cn('text-xs', hasError ? 'text-red-500' : 'text-gray-500')}>
            {errorMessage ?? helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
