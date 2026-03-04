import { Badge, Button, CompanyModal } from '@components/ui';
import { useLocalStorage } from '@hooks/useLocalStorage';
import {
  formatPostedDate,
  formatSalaryVnd,
  getCompanyInfo,
  type CompanyInfo,
  mockJobs,
} from '@lib/mockJobs';
import { Bookmark, BookmarkX, BriefcaseBusiness, ExternalLink, MapPin } from 'lucide-react';
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

  const removeJob = (id: string) => {
    setSavedJobs(prev => prev.filter(sid => sid !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/30 ring-1 ring-indigo-400/40">
            <Bookmark size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Việc làm đã lưu</h1>
            <p className="mt-0.5 text-sm text-slate-300">Bạn đang lưu {jobs.length} công việc.</p>
          </div>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
            <Bookmark size={32} className="text-indigo-300" />
          </div>
          <div>
            <p className="font-semibold text-slate-700">Chưa có việc làm nào được lưu</p>
            <p className="mt-1 text-sm text-slate-500">
              Hãy khám phá và lưu những cơ hội phù hợp với bạn.
            </p>
          </div>
          <Link to="/jobs">
            <Button>Khám phá việc làm</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map(job => (
            <div
              key={job.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600">
                    <BriefcaseBusiness size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-indigo-700">
                      {job.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => openCompany(job.company)}
                      className="mt-0.5 text-sm font-medium text-indigo-600 underline-offset-2 transition hover:underline"
                    >
                      {job.company}
                    </button>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span>{job.position}</span>
                      <span>•</span>
                      <span>{job.workMode}</span>
                      <span>•</span>
                      <span>{formatPostedDate(job.postedAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Match score badge */}
                <div
                  className={`flex flex-col items-center rounded-xl px-3 py-2 ${
                    job.matchScore >= 85
                      ? 'bg-emerald-50 ring-1 ring-emerald-200'
                      : 'bg-blue-50 ring-1 ring-blue-200'
                  }`}
                >
                  <p
                    className={`text-xl font-bold ${
                      job.matchScore >= 85 ? 'text-emerald-700' : 'text-blue-700'
                    }`}
                  >
                    {job.matchScore}%
                  </p>
                  <p className="text-xs text-slate-500">Phù hợp</p>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">{job.summary}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="default">{job.field}</Badge>
                <Badge variant="default">{formatSalaryVnd(job.salaryMin, job.salaryMax)}</Badge>
                {job.skills.slice(0, 3).map(skill => (
                  <Badge key={skill} variant="default">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link to={`/jobs/${job.id}`}>
                  <Button variant="outline" leftIcon={<ExternalLink size={15} />}>
                    Xem chi tiết
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  leftIcon={<BookmarkX size={15} />}
                  onClick={() => removeJob(job.id)}
                  className="text-red-500 hover:bg-red-50"
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
