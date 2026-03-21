import { cn } from '@lib/utils';

interface ProgressBarProps {
  value: number;
  label?: string;
  className?: string;
}

export function ProgressBar({ value, label = 'Hoàn thiện hồ sơ', className }: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
          {label}
        </span>
        <span className="font-bold" style={{ color: 'var(--color-primary)' }}>
          {clampedValue}%
        </span>
      </div>
      <div
        className="h-2.5 overflow-hidden rounded-full"
        style={{ background: 'var(--color-border)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${clampedValue}%`,
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent-2))',
          }}
        />
      </div>
    </div>
  );
}
