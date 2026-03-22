import { cn } from '@lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-[var(--color-surface-raised)] text-[var(--color-text-muted)] border border-[var(--color-border)]',
  primary:
    'bg-[var(--color-primary-muted)] text-[var(--color-primary)] border border-[var(--color-primary)]/20 font-bold',
  success:
    'bg-[var(--color-success-light)] text-[var(--color-success)] border border-[var(--color-success)]/20',
  warning:
    'bg-[var(--color-warning-light)] text-[var(--color-warning)] border border-[var(--color-warning)]/20',
  danger:
    'bg-[var(--color-danger-light)] text-[var(--color-danger)] border border-[var(--color-danger)]/20',
  info: 'bg-[var(--color-info-light)] text-[var(--color-info)] border border-[var(--color-info)]/20',
};

export function Badge({ variant = 'default', children, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        'transition-colors duration-200',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
