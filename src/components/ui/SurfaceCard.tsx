import { cn } from '@lib/utils';
import type { ReactNode } from 'react';

interface SurfaceCardProps {
  children: ReactNode;
  className?: string;
}

export function SurfaceCard({ children, className }: SurfaceCardProps) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60',
        className,
      )}
    >
      {children}
    </section>
  );
}
