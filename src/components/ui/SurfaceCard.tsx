import { cn } from '@lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

interface SurfaceCardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  hover?: boolean;
}

export function SurfaceCard({ children, className, hover = false, ...props }: SurfaceCardProps) {
  return (
    <section
      {...props}
      className={cn(
        'rounded-2xl border p-5',
        'border-[var(--color-border)] bg-[var(--color-surface)]',
        'shadow-[var(--shadow-sm)]',
        'transition-colors duration-300',
        hover && 'card-hover cursor-pointer',
        className,
      )}
    >
      {children}
    </section>
  );
}
