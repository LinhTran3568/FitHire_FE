import { Button, FeatureCard } from '@components/ui';
import { BriefcaseBusiness, FileText, ScanSearch } from 'lucide-react';
import { Link } from 'react-router-dom';


const FEATURES = [
  {
    icon: ScanSearch,
    title: 'AI Interview Preparation',
    description: 'Generate tailored questions and smart answers',
  },
  {
    icon: FileText,
    title: 'Smart CV Builder',
    description: 'Create and optimize CV with AI suggestions',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Intelligent Job Matching',
    description: 'Discover jobs aligned with your skills',
  },
] as const;

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-12 lg:px-10 lg:pt-16">
      <section className="grid gap-10 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-8">
          <span className="inline-flex rounded-2xl border border-blue-200/40 bg-gradient-to-r from-sky-100 to-blue-200 px-5 py-3 text-base font-medium text-slate-700">
            AI-powered Career Platform
          </span>

          <h1 className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-100 md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-indigo-700 via-slate-200 to-slate-100 bg-clip-text text-transparent">
              Build Smarter CVs.
            </span>{' '}
            Ace Interviews. Get Hired Faster.
          </h1>

          <p className="max-w-xl text-xl leading-relaxed text-slate-300 md:text-2xl">
            AI-powered platform to create optimized CVs, prepare for interviews, and discover
            best-fit jobs.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/cv-analyzer">
              <Button size="lg" className="rounded-xl px-7">
                Create CV Now
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl border-white/80 bg-white px-7"
              >
                Explore Jobs
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative rounded-3xl border border-white/45 bg-slate-100/90 p-10 shadow-2xl shadow-black/25">
          <div className="absolute -left-4 -top-4 z-10 flex h-24 w-24 items-center justify-center rounded-full border-4 border-blue-300 bg-gradient-to-br from-indigo-500 to-sky-400 text-5xl text-white">
            V
          </div>

          <div className="relative mx-auto mt-5 h-[30rem] w-[22rem] rounded-[3rem] border border-white/60 bg-gradient-to-br from-indigo-500 via-blue-400 to-violet-300 p-8 shadow-2xl shadow-blue-900/30">
            <div className="mx-auto mb-8 h-40 w-40 rounded-full border-4 border-white/65 bg-gradient-to-b from-white to-slate-200" />
            <div className="space-y-4">
              <div className="h-8 rounded-lg bg-white/80" />
              <div className="h-8 rounded-lg bg-white/80" />
              <div className="h-8 w-2/3 rounded-lg bg-white/70" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 py-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(feature => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>

      <section className="mx-auto mt-12 max-w-4xl rounded-3xl border border-white/45 bg-white/20 p-10 text-center shadow-xl shadow-black/20 backdrop-blur-md md:p-14">
        <h2 className="text-4xl font-semibold tracking-tight text-slate-100 md:text-5xl">
          Ready to level up your career?
        </h2>
        <p className="mt-4 text-xl text-slate-200 md:text-2xl">
          Join thousands of professionals optimizing their job search with AI.
        </p>
        <div className="mt-8">
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="rounded-xl border-white/85 bg-white px-9">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
