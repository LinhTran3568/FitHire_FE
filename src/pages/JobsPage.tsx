import { Badge, Button, SurfaceCard } from '@components/ui';
import { useDebounce } from '@hooks/useDebounce';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { formatPostedDate, formatSalaryVnd, type JobPost, mockJobs } from '@lib/mockJobs';
import { cn } from '@lib/utils';
import {
  BookmarkCheck,
  BookmarkPlus,
  BriefcaseBusiness,
  Filter,
  MapPin,
  RotateCcw,
  Search,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const FIELD_OPTIONS = [
  'Tất cả',
  'Công nghệ thông tin',
  'Dữ liệu',
  'Kiểm thử phần mềm',
  'Sản phẩm',
] as const;
const POSITION_OPTIONS = ['Tất cả', 'Intern', 'Fresher', 'Junior'] as const;
const WORK_MODE_OPTIONS = ['Tất cả', 'Onsite', 'Hybrid', 'Remote'] as const;
const SALARY_OPTIONS = [0, 5000000, 8000000, 12000000] as const;

type FieldFilter = (typeof FIELD_OPTIONS)[number];
type PositionFilter = (typeof POSITION_OPTIONS)[number];
type WorkModeFilter = (typeof WORK_MODE_OPTIONS)[number];

const LOCATION_OPTIONS = ['Tất cả', ...Array.from(new Set(mockJobs.map(job => job.location)))];

function isValidEnum<T extends string>(value: string | null, options: readonly T[]): value is T {
  return Boolean(value && options.includes(value as T));
}

function parseSalaryMin(raw: string | null): number {
  const parsed = Number(raw);
  return SALARY_OPTIONS.includes(parsed as (typeof SALARY_OPTIONS)[number]) ? parsed : 0;
}

function formatSalaryOption(value: number): string {
  if (value === 0) return 'Không giới hạn';
  return `Từ ${Math.round(value / 1000000)} triệu`;
}

function renderSkeletonCards() {
  return Array.from({ length: 3 }).map((_, index) => (
    <SurfaceCard key={`skeleton-${index}`} className="animate-pulse space-y-3">
      <div className="h-5 w-2/5 rounded bg-slate-200" />
      <div className="h-4 w-3/5 rounded bg-slate-200" />
      <div className="h-4 w-full rounded bg-slate-200" />
      <div className="h-10 w-40 rounded bg-slate-200" />
    </SurfaceCard>
  ));
}

export default function JobsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [keywordInput, setKeywordInput] = useState(searchParams.get('q') ?? '');
  const [field, setField] = useState<FieldFilter>(
    isValidEnum(searchParams.get('field'), FIELD_OPTIONS)
      ? (searchParams.get('field') as FieldFilter)
      : 'Tất cả',
  );
  const [position, setPosition] = useState<PositionFilter>(
    isValidEnum(searchParams.get('position'), POSITION_OPTIONS)
      ? (searchParams.get('position') as PositionFilter)
      : 'Tất cả',
  );
  const [workMode, setWorkMode] = useState<WorkModeFilter>(
    isValidEnum(searchParams.get('mode'), WORK_MODE_OPTIONS)
      ? (searchParams.get('mode') as WorkModeFilter)
      : 'Tất cả',
  );
  const [location, setLocation] = useState<string>(
    LOCATION_OPTIONS.includes(searchParams.get('location') ?? '')
      ? (searchParams.get('location') as string)
      : 'Tất cả',
  );
  const [salaryMin, setSalaryMin] = useState(parseSalaryMin(searchParams.get('salary_min')));
  const [useCvFilter, setUseCvFilter] = useState(searchParams.get('cv_match') !== '0');

  const [savedJobs, setSavedJobs] = useLocalStorage<string[]>('saved_jobs', []);
  const [recentJobs] = useLocalStorage<string[]>('recent_jobs', []);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const debouncedKeyword = useDebounce(keywordInput.trim(), 300);
  const isLoading = keywordInput.trim() !== debouncedKeyword;

  useEffect(() => {
    const next = new URLSearchParams();

    if (debouncedKeyword) next.set('q', debouncedKeyword);
    if (field !== 'Tất cả') next.set('field', field);
    if (position !== 'Tất cả') next.set('position', position);
    if (workMode !== 'Tất cả') next.set('mode', workMode);
    if (location !== 'Tất cả') next.set('location', location);
    if (salaryMin > 0) next.set('salary_min', String(salaryMin));
    if (!useCvFilter) next.set('cv_match', '0');

    setSearchParams(next, { replace: true });
  }, [
    debouncedKeyword,
    field,
    location,
    position,
    salaryMin,
    setSearchParams,
    useCvFilter,
    workMode,
  ]);

  const filteredJobs = useMemo(() => {
    let jobs = mockJobs.filter(job => {
      if (debouncedKeyword) {
        const haystack = [job.title, job.company, job.summary, ...job.skills]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(debouncedKeyword.toLowerCase())) return false;
      }

      if (useCvFilter && job.matchScore < 75) return false;
      if (field !== 'Tất cả' && job.field !== field) return false;
      if (position !== 'Tất cả' && job.position !== position) return false;
      if (workMode !== 'Tất cả' && job.workMode !== workMode) return false;
      if (location !== 'Tất cả' && job.location !== location) return false;
      if (salaryMin > 0 && job.salaryMax < salaryMin) return false;

      return true;
    });

    jobs = [...jobs].sort((a, b) => b.matchScore - a.matchScore);

    return jobs;
  }, [debouncedKeyword, field, location, position, salaryMin, useCvFilter, workMode]);

  const recentViewedJobs = useMemo(
    () =>
      recentJobs.map(jobId => mockJobs.find(job => job.id === jobId)).filter(Boolean) as JobPost[],
    [recentJobs],
  );

  const hasActiveFilters =
    debouncedKeyword.length > 0 ||
    field !== 'Tất cả' ||
    position !== 'Tất cả' ||
    workMode !== 'Tất cả' ||
    location !== 'Tất cả' ||
    salaryMin > 0 ||
    !useCvFilter;

  const resetAllFilters = () => {
    setKeywordInput('');
    setField('Tất cả');
    setPosition('Tất cả');
    setWorkMode('Tất cả');
    setLocation('Tất cả');
    setSalaryMin(0);
    setUseCvFilter(true);
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId],
    );
  };

  return (
    <div className="space-y-5">
      {/* Gradient banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 px-6 py-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Tìm việc</h1>
            <p className="mt-1 text-sm text-slate-300">
              Lọc công việc theo CV, lĩnh vực, vị trí, địa điểm và mức lương phù hợp.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="rounded-xl bg-white/10 px-4 py-2 text-center">
              <p className="text-lg font-bold">{filteredJobs.length}</p>
              <p className="text-xs text-slate-300">Việc phù hợp</p>
            </div>
          </div>
        </div>
      </div>

      <SurfaceCard className="space-y-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setFiltersOpen(prev => !prev)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 md:hidden"
          >
            <Filter size={16} />
            Bộ lọc
          </button>
        </div>

        <div
          className={cn(
            'grid gap-3 md:grid-cols-2 xl:grid-cols-6',
            !filtersOpen && 'hidden md:grid',
          )}
        >
          <label className="space-y-2 text-sm xl:col-span-2">
            <span className="font-medium text-slate-700">Từ khóa</span>
            <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2">
              <Search size={16} className="text-slate-400" />
              <input
                value={keywordInput}
                onChange={event => setKeywordInput(event.target.value)}
                placeholder="Vị trí, công ty, kỹ năng..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Lĩnh vực</span>
            <select
              value={field}
              onChange={event => setField(event.target.value as FieldFilter)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
            >
              {FIELD_OPTIONS.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Vị trí</span>
            <select
              value={position}
              onChange={event => setPosition(event.target.value as PositionFilter)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
            >
              {POSITION_OPTIONS.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Địa điểm</span>
            <select
              value={location}
              onChange={event => setLocation(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
            >
              {LOCATION_OPTIONS.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Mức lương tối thiểu</span>
            <select
              value={salaryMin}
              onChange={event => setSalaryMin(Number(event.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
            >
              {SALARY_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {formatSalaryOption(option)}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Hình thức làm việc</span>
            <select
              value={workMode}
              onChange={event => setWorkMode(event.target.value as WorkModeFilter)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
            >
              {WORK_MODE_OPTIONS.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <div className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Độ phù hợp</span>
            <button
              type="button"
              onClick={() => setUseCvFilter(prev => !prev)}
              className="flex h-[42px] w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 text-slate-700"
            >
              <span>Ưu tiên theo độ phù hợp</span>
              <Badge variant={useCvFilter ? 'success' : 'default'}>
                {useCvFilter ? 'Bật' : 'Tắt'}
              </Badge>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {debouncedKeyword && (
            <button
              type="button"
              onClick={() => setKeywordInput('')}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
            >
              Từ khóa: {debouncedKeyword} ×
            </button>
          )}
          {field !== 'Tất cả' && (
            <button
              type="button"
              onClick={() => setField('Tất cả')}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
            >
              Lĩnh vực: {field} ×
            </button>
          )}
          {position !== 'Tất cả' && (
            <button
              type="button"
              onClick={() => setPosition('Tất cả')}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
            >
              Vị trí: {position} ×
            </button>
          )}
          {workMode !== 'Tất cả' && (
            <button
              type="button"
              onClick={() => setWorkMode('Tất cả')}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
            >
              Work mode: {workMode} ×
            </button>
          )}
          {location !== 'Tất cả' && (
            <button
              type="button"
              onClick={() => setLocation('Tất cả')}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
            >
              Địa điểm: {location} ×
            </button>
          )}
          {salaryMin > 0 && (
            <button
              type="button"
              onClick={() => setSalaryMin(0)}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
            >
              Lương: {formatSalaryOption(salaryMin)} ×
            </button>
          )}
          {!useCvFilter && (
            <button
              type="button"
              onClick={() => setUseCvFilter(true)}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
            >
              Không ưu tiên độ phù hợp ×
            </button>
          )}

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetAllFilters} className="ml-auto">
              <RotateCcw size={14} />
              <span>Đặt lại bộ lọc</span>
            </Button>
          )}
        </div>
      </SurfaceCard>

      {recentViewedJobs.length > 0 && (
        <SurfaceCard className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">Việc đã xem gần đây</h3>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {recentViewedJobs.map(job => (
              <Link
                key={`recent-${job.id}`}
                to={`/jobs/${job.id}`}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3 transition hover:bg-white"
              >
                <p className="text-sm font-semibold text-slate-900">{job.title}</p>
                <p className="mt-1 text-xs text-slate-500">{job.company}</p>
              </Link>
            ))}
          </div>
        </SurfaceCard>
      )}

      <div className="grid gap-4">
        {isLoading && renderSkeletonCards()}

        {!isLoading && filteredJobs.length === 0 && (
          <SurfaceCard className="space-y-3">
            <p className="text-sm text-slate-600">
              Không tìm thấy công việc phù hợp với bộ lọc hiện tại.
            </p>
            <Button variant="outline" onClick={resetAllFilters}>
              Nới điều kiện lọc
            </Button>
          </SurfaceCard>
        )}

        {!isLoading &&
          filteredJobs.map(job => {
            const isSaved = savedJobs.includes(job.id);

            return (
              <div
                key={job.id}
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white p-2 shadow-sm ring-1 ring-slate-200/50 transition group-hover:border-indigo-100 group-hover:shadow-md">
                      {job.logoUrl ? (
                        <img
                          src={job.logoUrl}
                          alt={job.company}
                          className="h-full w-full object-contain"
                          onError={e => {
                            (e.target as HTMLImageElement).src =
                              'https://ui-avatars.com/api/?name=' +
                              encodeURIComponent(job.company) +
                              '&background=6366f1&color=fff';
                          }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-600">
                          <BriefcaseBusiness size={28} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-indigo-700">
                        {job.title}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-indigo-600">{job.company}</p>
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
                    <p className="text-xs text-slate-500">Độ phù hợp</p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">{job.summary}</p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <Badge variant="default">{job.field}</Badge>
                  <Badge variant="default">{formatSalaryVnd(job.salaryMin, job.salaryMax)}</Badge>
                  <Badge variant="default">Kỹ năng: {job.skills.slice(0, 2).join(', ')}</Badge>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Vì sao phù hợp: yêu cầu chính có {job.skills.slice(0, 3).join(', ')}.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline">Xem chi tiết</Button>
                  <Button
                    variant="ghost"
                    onClick={e => {
                      e.stopPropagation();
                      toggleSaveJob(job.id);
                    }}
                  >
                    {isSaved ? <BookmarkCheck size={16} /> : <BookmarkPlus size={16} />}
                    <span>{isSaved ? 'Đã lưu' : 'Lưu việc'}</span>
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
