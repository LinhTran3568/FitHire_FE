import { Badge, Button, CompanyModal } from '@components/ui';
import { useLocalStorage } from '@hooks/useLocalStorage';
import {
  formatPostedDate,
  formatSalaryVnd,
  getCompanyInfo,
  type CompanyInfo,
  mockJobs,
} from '@lib/mockJobs';
import { Bookmark, BookmarkX, BriefcaseBusiness, ExternalLink, MapPin, Clock, Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useLocalStorage<string[]>('saved_jobs', []);
  const [selectedCompany, setSelectedCompany] = useState<CompanyInfo | null>(null);

  const openCompany = (name: string) => {
    const info = getCompanyInfo(name);
    if (info) setSelectedCompany(info);
  };

  const jobs = mockJobs.filter(j => savedJobs.includes(j.id));
  const removeJob = (id: string) => setSavedJobs(prev => prev.filter(sid => sid !== id));

  return (
    <div className="space-y-5">
      {/* Header banner */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 text-white"
        style={{ background: 'var(--hero-bg)' }}
      >
        <div
          className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl"
          style={{ background: 'var(--hero-orb-a)' }}
        />
        <div className="relative z-10 flex items-center gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
          >
            <Bookmark size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Việc làm đã lưu</h1>
            <p className="mt-0.5 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Bạn đang lưu {jobs.length} công việc.
            </p>
          </div>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div
          className="flex flex-col items-center gap-5 rounded-2xl border-2 border-dashed py-16 text-center"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border-strong)',
          }}
        >
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
          >
            <Search size={28} />
          </div>
          <div>
            <p className="font-bold" style={{ color: 'var(--color-text)' }}>
              Chưa có việc làm nào được lưu
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Hãy khám phá và lưu những cơ hội phù hợp với bạn.
            </p>
          </div>
          <Link to="/jobs">
            <Button>
              <BriefcaseBusiness size={15} />
              Khám phá việc làm
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map(job => (
            <div
              key={job.id}
              className="group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: 'var(--color-primary)', color: '#fff' }}
                  >
                    <BriefcaseBusiness size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold transition-colors" style={{ color: 'var(--color-text)' }}>
                      {job.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => openCompany(job.company)}
                      className="mt-0.5 text-sm font-semibold hover:underline"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {job.company}
                    </button>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      <span className="flex items-center gap-1"><MapPin size={11} />{job.location}</span>
                      <span>•</span>
                      <span>{job.position}</span>
                      <span>•</span>
                      <span>{job.workMode}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{formatPostedDate(job.postedAt)}</span>
                    </div>
                  </div>
                </div>

                <div
                  className="flex flex-col items-center rounded-xl px-3 py-2"
                  style={{
                    background: job.matchScore >= 85 ? 'var(--color-success-light)' : 'var(--color-primary-muted)',
                    border: `1px solid ${job.matchScore >= 85 ? 'var(--color-success)' : 'var(--color-primary)'}`,
                  }}
                >
                  <p
                    className="text-xl font-extrabold"
                    style={{ color: job.matchScore >= 85 ? 'var(--color-success)' : 'var(--color-primary)' }}
                  >
                    {job.matchScore}%
                  </p>
                  <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                    Phù hợp
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {job.summary}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge variant="default">{job.field}</Badge>
                <Badge variant="default">{formatSalaryVnd(job.salaryMin, job.salaryMax)}</Badge>
                {job.skills.slice(0, 3).map(skill => (
                  <Badge key={skill} variant="default">{skill}</Badge>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link to={`/jobs/${job.id}`}>
                  <Button variant="outline" leftIcon={<ExternalLink size={14} />}>
                    Xem chi tiết
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  leftIcon={<BookmarkX size={14} />}
                  onClick={() => removeJob(job.id)}
                  className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Bỏ lưu
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCompany && (
        <CompanyModal company={selectedCompany} onClose={() => setSelectedCompany(null)} />
      )}
    </div>
  );
}
