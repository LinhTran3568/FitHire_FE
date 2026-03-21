import { Badge, Button, SurfaceCard } from '@components/ui';
import { useDebounce } from '@hooks/useDebounce';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { formatPostedDate, formatSalaryVnd, type JobPost, mockJobs } from '@lib/mockJobs';
import { cn } from '@lib/utils';
import {
  BookmarkCheck,
  BookmarkPlus,
  BriefcaseBusiness,
  ChevronDown,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
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
  if (value === 0) return 'Mọi mức lương';
  return `Trên ${Math.round(value / 1000000)} triệu`;
}

function renderSkeletonCards() {
  return Array.from({ length: 3 }).map((_, index) => (
    <SurfaceCard key={`skeleton-${index}`} className="animate-pulse space-y-3 rounded-2xl p-6">
      <div className="h-5 w-2/5 rounded-full bg-slate-200" />
      <div className="h-4 w-3/5 rounded-full bg-slate-200" />
      <div className="h-4 w-full rounded-full bg-slate-200" />
      <div className="mt-4 h-10 w-40 rounded-xl bg-slate-200" />
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
    <div className="space-y-6">
      {/* ── HEADER BANNER ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-8 py-8 text-white shadow-lg">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/3 rounded-full bg-blue-500/20 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl text-white">Khám phá việc làm</h1>
            <p className="mt-2 text-base font-medium text-slate-300">
              Công cụ AI sẽ lọc hàng nghìn đầu việc và gợi ý các vị trí phù hợp nhất với CV hiện tại của bạn.
            </p>
          </div>
          <div className="flex shrink-0 items-center justify-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10 shadow-inner">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md">
              <CheckCircle2Icon />
            </div>
            <div>
              <p className="text-2xl font-black">{filteredJobs.length}</p>
              <p className="text-sm font-semibold text-slate-300">Việc phù hợp tìm thấy</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SEARCH & FILTER SECTION ── */}
      <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Main Search Input */}
          <div className="flex w-full items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 border border-slate-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white transition-all overflow-hidden flex-1">
            <Search size={20} className="text-slate-400 shrink-0" />
            <input
              value={keywordInput}
              onChange={event => setKeywordInput(event.target.value)}
              placeholder="Nhập tên vị trí, công ty hoặc từ khóa kỹ năng..."
              className="w-full bg-transparent text-base font-medium text-slate-800 outline-none placeholder:text-slate-400 placeholder:font-normal"
            />
          </div>

          <div className="flex w-full md:w-auto items-center gap-3">
            <Button
              variant={filtersOpen ? 'primary' : 'secondary'}
              onClick={() => setFiltersOpen(prev => !prev)}
              className="rounded-2xl h-[52px] px-5 w-full md:w-auto"
            >
              <SlidersHorizontal size={18} className="mr-2" />
              Lọc nâng cao
              <ChevronDown size={16} className={cn('ml-2 transition-transform duration-300', filtersOpen && 'rotate-180')} />
            </Button>
            
            {hasActiveFilters && (
              <Button variant="ghost" className="h-[52px] rounded-2xl px-4 text-slate-500 hover:text-red-500 shrink-0" onClick={resetAllFilters} title="Xóa tất cả bộ lọc">
                <RotateCcw size={18} />
              </Button>
            )}
          </div>
        </div>

        {/* Advanced Filters Expandable */}
        <div className={cn('grid transition-all duration-300 grid-rows-[0fr] opacity-0', filtersOpen && 'grid-rows-[1fr] opacity-100 mt-4')}>
          <div className="overflow-hidden">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 border-t border-slate-100 pt-5 mt-2 px-1 pb-2">
              <label className="space-y-1.5 text-sm">
                <span className="font-semibold text-slate-600 ml-1">Lĩnh vực</span>
                <select
                  value={field}
                  onChange={event => setField(event.target.value as FieldFilter)}
                  className="w-full rounded-xl bg-slate-50 px-4 py-2.5 font-medium border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 transition-shadow appearance-none cursor-pointer"
                >
                  {FIELD_OPTIONS.map(item => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="font-semibold text-slate-600 ml-1">Vị trí cấp bậc</span>
                <select
                  value={position}
                  onChange={event => setPosition(event.target.value as PositionFilter)}
                  className="w-full rounded-xl bg-slate-50 px-4 py-2.5 font-medium border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 transition-shadow appearance-none cursor-pointer"
                >
                  {POSITION_OPTIONS.map(item => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="font-semibold text-slate-600 ml-1">Địa điểm</span>
                <select
                  value={location}
                  onChange={event => setLocation(event.target.value)}
                  className="w-full rounded-xl bg-slate-50 px-4 py-2.5 font-medium border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 transition-shadow appearance-none cursor-pointer"
                >
                  {LOCATION_OPTIONS.map(item => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="font-semibold text-slate-600 ml-1">Mức lương</span>
                <select
                  value={salaryMin}
                  onChange={event => setSalaryMin(Number(event.target.value))}
                  className="w-full rounded-xl bg-slate-50 px-4 py-2.5 font-medium border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 transition-shadow appearance-none cursor-pointer"
                >
                  {SALARY_OPTIONS.map(option => (
                    <option key={option} value={option}>
                      {formatSalaryOption(option)}
                    </option>
                  ))}
                </select>
              </label>

              <div className="space-y-1.5 text-sm">
                <span className="font-semibold text-slate-600 ml-1">Sắp xếp ưu tiên CV</span>
                <button
                  type="button"
                  onClick={() => setUseCvFilter(prev => !prev)}
                  className={cn(
                    "flex h-[42px] px-4 w-full items-center justify-between rounded-xl ring-1 transition-all cursor-pointer font-bold",
                    useCvFilter ? "bg-indigo-50 text-indigo-700 ring-indigo-300 shadow-inner" : "bg-slate-50 text-slate-600 ring-slate-200 hover:bg-slate-100"
                  )}
                >
                  <span>Mức độ phù hợp</span>
                  <div className={cn("h-4 w-8 rounded-full transition-colors flex items-center px-0.5", useCvFilter ? "bg-indigo-500" : "bg-slate-300")}>
                    <div className={cn("h-3 w-3 rounded-full bg-white transition-transform shadow-sm", useCvFilter ? "translate-x-4" : "translate-x-0")} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 px-1 pt-3 border-t border-slate-100 mt-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mr-2">Đang lọc theo:</span>
            {debouncedKeyword && (
              <button type="button" className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-2.5 py-1 text-xs font-medium cursor-pointer gap-1.5 hover:bg-slate-200 transition-colors" onClick={() => setKeywordInput('')}>
                Từ khóa: {debouncedKeyword} <span>×</span>
              </button>
            )}
            {field !== 'Tất cả' && (
              <button type="button" className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-2.5 py-1 text-xs font-medium cursor-pointer gap-1.5 hover:bg-slate-200 transition-colors" onClick={() => setField('Tất cả')}>
                Lĩnh vực: {field} <span>×</span>
              </button>
            )}
            {position !== 'Tất cả' && (
              <button type="button" className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-2.5 py-1 text-xs font-medium cursor-pointer gap-1.5 hover:bg-slate-200 transition-colors" onClick={() => setPosition('Tất cả')}>
                Vị trí: {position} <span>×</span>
              </button>
            )}
            {location !== 'Tất cả' && (
              <button type="button" className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-2.5 py-1 text-xs font-medium cursor-pointer gap-1.5 hover:bg-slate-200 transition-colors" onClick={() => setLocation('Tất cả')}>
                Địa điểm: {location} <span>×</span>
              </button>
            )}
            {salaryMin > 0 && (
              <button type="button" className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-2.5 py-1 text-xs font-medium cursor-pointer gap-1.5 hover:bg-slate-200 transition-colors" onClick={() => setSalaryMin(0)}>
                Lương: {formatSalaryOption(salaryMin)} <span>×</span>
              </button>
            )}
          </div>
        )}
      </div>

      {recentViewedJobs.length > 0 && (
        <SurfaceCard className="space-y-4 rounded-3xl p-6">
          <div className="flex items-center gap-2">
            <RotateCcw size={18} className="text-indigo-500" />
            <h3 className="text-base font-bold text-slate-900">Việc đã xem gần đây</h3>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {recentViewedJobs.map(job => (
              <Link
                key={`recent-${job.id}`}
                to={`/jobs/${job.id}`}
                className="group rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4 transition-all hover:bg-white hover:border-indigo-200 hover:shadow-md"
              >
                <p className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600">{job.title}</p>
                <p className="mt-1-5 text-xs font-medium text-slate-500">{job.company}</p>
              </Link>
            ))}
          </div>
        </SurfaceCard>
      )}

      {/* ── JOB LISTINGS ── */}
      <div className="grid gap-5">
        {isLoading && renderSkeletonCards()}

        {!isLoading && filteredJobs.length === 0 && (
          <SurfaceCard className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border-dashed border-2 border-slate-200">
            <div className="h-16 w-16 mb-4 flex items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Không tìm thấy kết quả</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-sm">
              Rất tiếc, chưa có vị trí nào phù hợp với toàn bộ bộ lọc hiện tại của bạn.
            </p>
            <Button variant="outline" className="mt-6 rounded-xl" onClick={resetAllFilters}>
              Xóa bộ lọc để xem tất cả
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
                className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
                  <div className="flex items-start gap-5 w-full">
                    <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-sm transition-all group-hover:shadow-md group-hover:scale-105">
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
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl">
                          <BriefcaseBusiness size={32} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight transition-colors group-hover:text-blue-700">
                        {job.title}
                      </h3>
                      <p className="mt-1 text-base font-semibold text-slate-600">{job.company}</p>
                      
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Badge variant="info" className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-2.5 py-1">
                          {formatSalaryVnd(job.salaryMin, job.salaryMax)}
                        </Badge>
                        <Badge variant="default" className="px-2.5 py-1 bg-slate-100 font-medium">
                           <MapPin size={12} className="mr-1" /> {job.location}
                        </Badge>
                        <Badge variant="default" className="px-2.5 py-1 bg-slate-100 font-medium">{job.position}</Badge>
                        <Badge variant="default" className="px-2.5 py-1 bg-slate-100 font-medium">{job.workMode}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-center justify-between gap-4 md:w-32 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-5">
                    <div
                      className={`flex w-full md:w-auto items-center md:flex-col gap-3 rounded-2xl p-3 ${
                        job.matchScore >= 85
                          ? 'bg-emerald-50/80 ring-1 ring-emerald-200/60'
                          : 'bg-indigo-50/80 ring-1 ring-indigo-200/60'
                      }`}
                    >
                      <div className="flex flex-col md:items-center w-full">
                        <p
                          className={`text-2xl font-black ${
                            job.matchScore >= 85 ? 'text-emerald-600' : 'text-indigo-600'
                          }`}
                        >
                          {job.matchScore}%
                        </p>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">Độ phù hợp</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4 text-sm text-slate-600 leading-relaxed font-medium">
                  {job.summary}
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-xs font-semibold text-slate-400 mr-1">KỸ NĂNG:</span>
                      {job.skills.map(skill => (
                        <span key={skill} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                    {useCvFilter && (
                       <p className="text-xs font-medium text-emerald-600">
                         💡 Bạn sở hữu {job.skills.slice(0, 3).join(', ')} phù hợp mong đợi.
                       </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-400 font-medium whitespace-nowrap hidden md:block">
                      Đăng {formatPostedDate(job.postedAt)}
                    </span>
                    <Button variant="primary" className="rounded-xl px-5 h-11 shrink-0">Ứng tuyển</Button>
                    <Button
                      variant="outline"
                      className={`rounded-xl h-11 w-11 p-0 shrink-0 ${isSaved ? 'text-indigo-600 border-indigo-200 bg-indigo-50' : 'text-slate-400'}`}
                      onClick={e => {
                        e.stopPropagation();
                        toggleSaveJob(job.id);
                      }}
                    >
                      {isSaved ? <BookmarkCheck size={20} className="fill-indigo-100" /> : <BookmarkPlus size={20} />}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

// Stub function to prevent React build error if icon not imported directly
function CheckCircle2Icon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle-2" {...props}>
      <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
