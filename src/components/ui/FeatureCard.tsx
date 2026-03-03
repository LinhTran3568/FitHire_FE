import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <article className="rounded-2xl border border-white/60 bg-white/95 p-6 text-slate-900 shadow-lg shadow-black/10 backdrop-blur-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600">
        <Icon size={20} />
      </div>
      <h3 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{title}</h3>
      <p className="mt-2 text-xl text-slate-600 md:text-2xl">{description}</p>
    </article>
  );
}
