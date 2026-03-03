import { cn } from '@lib/utils';
import type { ReactNode } from 'react';


interface SectionTitleProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionTitle({ title, subtitle, action, className }: SectionTitleProps) {
  return (
    <div className={cn('flex flex-wrap items-start justify-between gap-3', className)}>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
