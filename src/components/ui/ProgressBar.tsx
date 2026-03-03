import { cn } from '@lib/utils';

interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">Hoàn thiện hồ sơ</span>
        <span className="font-semibold text-blue-600">{clampedValue}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
