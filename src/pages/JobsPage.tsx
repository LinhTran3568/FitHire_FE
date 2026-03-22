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
  Clock,
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
    <SurfaceCard key={`skeleton-${index}`} className="animate-pulse space-y-3 p-6">
      <div className="h-5 w-2/5 rounded-full" style={{ background: 'var(--color-border)' }} />
      <div className="h-4 w-3/5 rounded-full" style={{ background: 'var(--color-border)' }} />
      <div className="h-4 w-full rounded-full" style={{ background: 'var(--color-border)' }} />
      <div className="mt-4 h-10 w-40 rounded-xl" style={{ background: 'var(--color-border)' }} />
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
    const jobs = mockJobs.filter(job => {
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
    return [...jobs].sort((a, b) => b.matchScore - a.matchScore);
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

  /* ── Shared inline styles helpers ── */
  const filterSelectStyle: React.CSSProperties = {
    background: 'var(--color-surface-raised)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    borderRadius: '0.75rem',
    padding: '0.55rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    outline: 'none',
    width: '100%',
    cursor: 'pointer',
    appearance: 'none' as React.CSSProperties['appearance'],
  };

  return (
    <div className="space-y-5">
      {/* ── HEADER BANNER ── */}
      <div
        className="relative overflow-hidden rounded-3xl px-8 py-8 text-white"
        style={{ background: 'var(--hero-bg)', boxShadow: 'var(--shadow-md)' }}
      >
        <div
          className="pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: 'var(--hero-orb-a)' }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/3 rounded-full blur-3xl"
          style={{ background: 'var(--hero-orb-b)' }}
        />

        <div className="relative z-10">
          <p
            className="mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <Search size={11} />
            Tìm việc làm
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Khám phá việc làm
          </h1>
          <p
            className="mt-2 max-w-xl text-base font-medium"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Công cụ AI sẽ lọc hàng nghìn đầu việc và gợi ý các vị trí phù hợp nhất với CV hiện tại
            của bạn.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold"
              style={{ background: 'var(--color-primary)', color: '#fff' }}
            >
              <BriefcaseBusiness size={14} />
              {filteredJobs.length} việc phù hợp
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <SlidersHorizontal size={11} />
              Được lọc theo CV của bạn
            </span>
          </div>
        </div>
      </div>

      {/* ── SEARCH & FILTER ── */}
      <div
        className="rounded-3xl p-3 transition-all"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div className="flex flex-col items-center gap-3 md:flex-row">
          {/* Search */}
          <div
            className="flex w-full flex-1 items-center gap-2 rounded-2xl px-4 py-3 transition-all"
            style={{
              background: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Search size={18} style={{ color: 'var(--color-text-subtle)', flexShrink: 0 }} />
            <input
              value={keywordInput}
              onChange={e => setKeywordInput(e.target.value)}
              placeholder="Nhập tên vị trí, công ty hoặc từ khóa kỹ năng..."
              className="w-full bg-transparent text-sm font-medium outline-none"
              style={{ color: 'var(--color-text)' }}
            />
          </div>

          <div className="flex w-full items-center gap-2 md:w-auto">
            <Button
              variant={filtersOpen ? 'primary' : 'secondary'}
              onClick={() => setFiltersOpen(prev => !prev)}
              className="w-full rounded-2xl md:w-auto"
            >
              <SlidersHorizontal size={16} />
              Lọc nâng cao
              <ChevronDown
                size={14}
                className={cn('transition-transform duration-300', filtersOpen && 'rotate-180')}
              />
            </Button>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                className="shrink-0 rounded-2xl px-3"
                onClick={resetAllFilters}
                title="Xóa tất cả bộ lọc"
              >
                <RotateCcw size={16} style={{ color: 'var(--color-danger)' }} />
              </Button>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        <div
          className={cn(
            'grid grid-rows-[0fr] opacity-0 transition-all duration-300',
            filtersOpen && 'mt-4 grid-rows-[1fr] opacity-100',
          )}
        >
          <div className="overflow-hidden">
            <div
              className="mt-2 grid gap-4 border-t px-1 pt-5 pb-2 sm:grid-cols-2 lg:grid-cols-5"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {[
                {
                  label: 'Lĩnh vực',
                  value: field,
                  onChange: (v: string) => setField(v as FieldFilter),
                  options: FIELD_OPTIONS,
                },
                {
                  label: 'Vị trí cấp bậc',
                  value: position,
                  onChange: (v: string) => setPosition(v as PositionFilter),
                  options: POSITION_OPTIONS,
                },
                {
                  label: 'Địa điểm',
                  value: location,
                  onChange: (v: string) => setLocation(v),
                  options: LOCATION_OPTIONS,
                },
                {
                  label: 'Mức lương',
                  value: salaryMin,
                  onChange: (v: string) => setSalaryMin(Number(v)),
                  options: SALARY_OPTIONS.map(o => ({ value: o, label: formatSalaryOption(o) })),
                },
              ].map(filter => (
                <label key={filter.label} className="space-y-1.5 text-sm">
                  <span className="ml-1 font-bold" style={{ color: 'var(--color-text-secondary)' }}>
                    {filter.label}
                  </span>
                  <select
                    value={filter.value}
                    onChange={e => filter.onChange(e.target.value)}
                    style={filterSelectStyle}
                  >
                    {Array.isArray(filter.options)
                      ? filter.options.map(item =>
                          typeof item === 'object' ? (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ) : (
                            <option key={item}>{item}</option>
                          ),
                        )
                      : null}
                  </select>
                </label>
              ))}

              {/* CV Match Toggle */}
              <div className="space-y-1.5 text-sm">
                <span className="ml-1 font-bold" style={{ color: 'var(--color-text-secondary)' }}>
                  Ưu tiên phù hợp CV
                </span>
                <button
                  type="button"
                  onClick={() => setUseCvFilter(prev => !prev)}
                  className="flex h-[42px] w-full cursor-pointer items-center justify-between rounded-xl px-4 font-bold transition-all"
                  style={{
                    background: useCvFilter
                      ? 'var(--color-primary-muted)'
                      : 'var(--color-surface-raised)',
                    color: useCvFilter ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    border: `1px solid ${useCvFilter ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  }}
                >
                  <span>Mức độ phù hợp</span>
                  <div
                    className="flex h-4 w-8 items-center rounded-full px-0.5 transition-colors"
                    style={{
                      background: useCvFilter
                        ? 'var(--color-primary)'
                        : 'var(--color-border-strong)',
                    }}
                  >
                    <div
                      className="h-3 w-3 rounded-full bg-white shadow-sm transition-transform"
                      style={{ transform: useCvFilter ? 'translateX(16px)' : 'translateX(0)' }}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div
            className="mt-2 flex flex-wrap items-center gap-2 border-t px-1 pt-3"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <span
              className="mr-2 text-xs font-bold tracking-wide uppercase"
              style={{ color: 'var(--color-text-subtle)' }}
            >
              Đang lọc theo:
            </span>
            {[
              {
                condition: debouncedKeyword,
                label: `Từ khóa: ${debouncedKeyword}`,
                onRemove: () => setKeywordInput(''),
              },
              {
                condition: field !== 'Tất cả',
                label: `Lĩnh vực: ${field}`,
                onRemove: () => setField('Tất cả'),
              },
              {
                condition: position !== 'Tất cả',
                label: `Vị trí: ${position}`,
                onRemove: () => setPosition('Tất cả'),
              },
              {
                condition: location !== 'Tất cả',
                label: `Địa điểm: ${location}`,
                onRemove: () => setLocation('Tất cả'),
              },
              {
                condition: salaryMin > 0,
                label: `Lương: ${formatSalaryOption(salaryMin)}`,
                onRemove: () => setSalaryMin(0),
              },
            ]
              .filter(f => f.condition)
              .map(f => (
                <button
                  key={f.label}
                  type="button"
                  onClick={f.onRemove}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all hover:opacity-80"
                  style={{
                    background: 'var(--color-surface-raised)',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {f.label} <span>×</span>
                </button>
              ))}
          </div>
        )}
      </div>

      {/* ── RECENTLY VIEWED ── */}
      {recentViewedJobs.length > 0 && (
        <SurfaceCard className="space-y-4 p-5">
          <div className="flex items-center gap-2">
            <RotateCcw size={16} style={{ color: 'var(--color-primary)' }} />
            <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
              Việc đã xem gần đây
            </h3>
          </div>
          <div className="grid gap-2.5 md:grid-cols-2 lg:grid-cols-4">
            {recentViewedJobs.map(job => (
              <Link
                key={`recent-${job.id}`}
                to={`/jobs/${job.id}`}
                className="rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--color-primary-muted)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-raised)';
                }}
              >
                <p
                  className="line-clamp-1 text-sm font-bold"
                  style={{ color: 'var(--color-text)' }}
                >
                  {job.title}
                </p>
                <p
                  className="mt-0.5 text-xs font-medium"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {job.company}
                </p>
              </Link>
            ))}
          </div>
        </SurfaceCard>
      )}

      {/* ── JOB LISTINGS ── */}
      <div className="grid gap-4">
        {isLoading && renderSkeletonCards()}

        {!isLoading && filteredJobs.length === 0 && (
          <div
            className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-14 text-center"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border-strong)',
            }}
          >
            <div
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{
                background: 'var(--color-surface-raised)',
                color: 'var(--color-text-subtle)',
              }}
            >
              <Search size={28} />
            </div>
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              Không tìm thấy kết quả
            </h3>
            <p className="mt-2 max-w-sm text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Rất tiếc, chưa có vị trí nào phù hợp với toàn bộ bộ lọc hiện tại của bạn.
            </p>
            <Button variant="outline" className="mt-6" onClick={resetAllFilters}>
              Xóa bộ lọc để xem tất cả
            </Button>
          </div>
        )}

        {!isLoading &&
          filteredJobs.map(job => {
            const isSaved = savedJobs.includes(job.id);
            return (
              <div
                key={job.id}
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="group cursor-pointer rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-primary)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                  <div className="flex w-full items-start gap-5">
                    {/* Logo */}
                    <div
                      className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl p-2 transition-all group-hover:scale-105"
                      style={{
                        background: 'var(--color-surface-raised)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {job.logoUrl ? (
                        <img
                          src={job.logoUrl}
                          alt={job.company}
                          className="h-full w-full object-contain"
                          onError={e => {
                            (e.target as HTMLImageElement).src =
                              'https://ui-avatars.com/api/?name=' +
                              encodeURIComponent(job.company) +
                              '&background=0d9488&color=fff';
                          }}
                        />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center rounded-xl"
                          style={{ background: 'var(--color-primary)', color: '#fff' }}
                        >
                          <BriefcaseBusiness size={26} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3
                        className="truncate text-xl font-bold tracking-tight transition-colors"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {job.title}
                      </h3>
                      <p
                        className="mt-0.5 text-sm font-semibold"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {job.company}
                      </p>
                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                        <Badge variant="info">
                          {formatSalaryVnd(job.salaryMin, job.salaryMax)}
                        </Badge>
                        <Badge variant="default">
                          <MapPin size={11} /> {job.location}
                        </Badge>
                        <Badge variant="default">{job.position}</Badge>
                        <Badge variant="default">{job.workMode}</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div
                    className="flex shrink-0 flex-row items-center gap-3 border-t pt-4 md:w-28 md:flex-col md:border-t-0 md:border-l md:pt-0 md:pl-5"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <div
                      className="flex w-full items-center gap-2 rounded-2xl p-3 md:w-auto md:flex-col"
                      style={{
                        background:
                          job.matchScore >= 85
                            ? 'var(--color-success-light)'
                            : 'var(--color-primary-muted)',
                        border: `1px solid ${job.matchScore >= 85 ? 'var(--color-success)' : 'var(--color-primary)'}30`,
                      }}
                    >
                      <p
                        className="text-2xl font-black"
                        style={{
                          color:
                            job.matchScore >= 85 ? 'var(--color-success)' : 'var(--color-primary)',
                        }}
                      >
                        {job.matchScore}%
                      </p>
                      <p
                        className="text-[11px] font-bold tracking-wider uppercase"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        Độ phù hợp
                      </p>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p
                  className="mt-5 border-t pt-4 text-sm leading-relaxed"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                >
                  {job.summary}
                </p>

                {/* Footer */}
                <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className="text-xs font-bold tracking-wide uppercase"
                        style={{ color: 'var(--color-text-subtle)' }}
                      >
                        KỸ NĂNG:
                      </span>
                      {job.skills.map(skill => (
                        <span
                          key={skill}
                          className="rounded-md px-2 py-0.5 text-xs font-semibold"
                          style={{
                            background: 'var(--color-surface-raised)',
                            color: 'var(--color-text-secondary)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    {useCvFilter && (
                      <p className="text-xs font-medium" style={{ color: 'var(--color-success)' }}>
                        💡 Bạn sở hữu {job.skills.slice(0, 3).join(', ')} phù hợp mong đợi.
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2.5">
                    <span
                      className="hidden items-center gap-1 text-xs font-medium whitespace-nowrap md:flex"
                      style={{ color: 'var(--color-text-subtle)' }}
                    >
                      <Clock size={11} /> {formatPostedDate(job.postedAt)}
                    </span>
                    <Button variant="primary" className="h-10 shrink-0 rounded-xl px-5">
                      Ứng tuyển
                    </Button>
                    <Button
                      variant="outline"
                      className="h-10 w-10 shrink-0 rounded-xl p-0"
                      style={
                        isSaved
                          ? {
                              color: 'var(--color-primary)',
                              borderColor: 'var(--color-primary)',
                              background: 'var(--color-primary-muted)',
                            }
                          : {}
                      }
                      onClick={e => {
                        e.stopPropagation();
                        toggleSaveJob(job.id);
                      }}
                    >
                      {isSaved ? <BookmarkCheck size={18} /> : <BookmarkPlus size={18} />}
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
