import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm shadow-slate-200/70">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600">
        <Icon size={20} />
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-slate-600">{description}</p>
    </article>
  );
}
