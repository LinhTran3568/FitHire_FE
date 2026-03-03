import { cn } from '@lib/utils';

interface ScoreCardProps {
  label: string;
  score: number;
  className?: string;
}

export function ScoreCard({ label, score, className }: ScoreCardProps) {
  return (
    <article
      className={cn('rounded-2xl border border-slate-200 bg-white p-5 shadow-sm', className)}
    >
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900">{score}/100</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
          style={{ width: `${Math.max(0, Math.min(100, score))}%` }}
        />
      </div>
    </article>
  );
}
