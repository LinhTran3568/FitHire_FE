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
        'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100',
        hover && 'card-hover cursor-pointer',
        className,
      )}
    >
      {children}
    </section>
  );
}
