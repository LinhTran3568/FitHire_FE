import { cn } from '@lib/utils';
import { useId } from 'react';


interface CircularGaugeProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export function CircularGauge({
  value,
  size = 180,
  strokeWidth = 14,
  label = 'ATS Score',
  className,
}: CircularGaugeProps) {
  const gradientId = useId();
  const clampedValue = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedValue / 100) * circumference;

  return (
    <div className={cn('inline-flex flex-col items-center gap-3', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={`url(#${gradientId})`}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-semibold text-slate-900">{clampedValue}%</span>
          <span className="text-sm text-slate-500">{label}</span>
        </div>
      </div>
    </div>
  );
}
