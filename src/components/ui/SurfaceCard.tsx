import { cn } from '@lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

interface SurfaceCardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function SurfaceCard({ children, className, ...props }: SurfaceCardProps) {
  return (
    <section
      {...props}
      className={cn(
        'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60',
        className,
      )}
    >
      {children}
    </section>
  );
}
