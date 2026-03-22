import { Badge, Button, SectionTitle, SurfaceCard } from '@components/ui';
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  FileText,
  MicVocal,
  Target,
  TrendingUp,
  CheckCircle2,
  Circle,
  Flame,
  ScanSearch,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PROGRESS_ITEMS = [
  { label: 'Thông tin cơ bản', done: true },
  { label: 'Kỹ năng & công nghệ', done: true },
  { label: 'Kinh nghiệm dự án', done: false },
  { label: 'Chứng chỉ & giải thưởng', done: false },
];

const recommendedJobs = [
  { id: 'jd-01', title: 'Frontend Developer Intern', company: 'Techify Vietnam', match: 86 },
  { id: 'jd-02', title: 'Backend Java Intern', company: 'NextGen Solutions', match: 81 },
  { id: 'jd-03', title: 'QA Engineer Fresher', company: 'FinStack', match: 78 },
  { id: 'jd-04', title: 'Product Analyst Intern', company: 'GrowthLab', match: 74 },
];

const interviewHistory = [
  { id: 'iv-01', role: 'Java Backend Intern', score: 82, time: 'Hôm qua, 20:15' },
  { id: 'iv-02', role: 'Frontend Intern', score: 76, time: '2 ngày trước, 19:45' },
  { id: 'iv-03', role: 'QA Intern', score: 88, time: '4 ngày trước, 21:10' },
];

const QUICK_LINKS = [
  {
    to: '/cv-builder',
    label: 'Tạo CV',
    icon: FileText,
    color: '#0d9488',
    bg: 'rgba(13,148,136,0.1)',
  },
  {
    to: '/cv-scoring',
    label: 'Chấm điểm CV',
    icon: ScanSearch,
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.1)',
  },
  {
    to: '/interview',
    label: 'Phỏng vấn AI',
    icon: MicVocal,
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
  },
  {
    to: '/jobs',
    label: 'Tìm việc',
    icon: BriefcaseBusiness,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
  },
];

function getScoreColor(score: number) {
  if (score >= 85) return { main: 'var(--color-success)', light: 'var(--color-success-light)' };
  if (score >= 75) return { main: 'var(--color-info)', light: 'var(--color-info-light)' };
  return { main: 'var(--color-warning)', light: 'var(--color-warning-light)' };
}

export default function DashboardPage() {
  return (
    <div className="space-y-6" style={{ color: 'var(--color-text)' }}>
      <SectionTitle
        title="Tổng quan hành trình"
        subtitle="Theo dõi tiến độ hồ sơ, việc làm phù hợp và chất lượng luyện phỏng vấn."
      />

      {/* Quick action cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {QUICK_LINKS.map(link => (
          <Link key={link.to} to={link.to}>
            <div
              className="card-hover group rounded-2xl p-5 text-center transition-all"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="mx-auto mb-3.5 flex h-13 w-13 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                style={{ background: link.bg, color: link.color }}
              >
                <link.icon size={22} />
              </div>
              <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                {link.label}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            icon: Target,
            label: 'Hoàn thành hồ sơ',
            value: '68%',
            color: '#0d9488',
            bg: 'rgba(13,148,136,0.1)',
          },
          {
            icon: BriefcaseBusiness,
            label: 'Việc phù hợp',
            value: '24',
            color: '#3b82f6',
            bg: 'rgba(59,130,246,0.1)',
          },
          {
            icon: TrendingUp,
            label: 'Trung bình phỏng vấn',
            value: '82/100',
            color: '#10b981',
            bg: 'rgba(16,185,129,0.1)',
          },
        ].map(stat => (
          <SurfaceCard key={stat.label} className="flex items-center gap-4">
            <div
              className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl"
              style={{ background: stat.bg, color: stat.color }}
            >
              <stat.icon size={22} />
            </div>
            <div>
              <p
                className="text-3xl font-black"
                style={{
                  color: stat.color,
                  fontFamily: 'Outfit, sans-serif',
                  letterSpacing: '-0.03em',
                }}
              >
                {stat.value}
              </p>
              <p className="mt-0.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {stat.label}
              </p>
            </div>
          </SurfaceCard>
        ))}
      </div>

      {/* CV Progress + Goals */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SurfaceCard>
          <div className="mb-5 flex items-center gap-2">
            <Target size={16} style={{ color: 'var(--color-primary)' }} />
            <h3 className="font-bold" style={{ color: 'var(--color-text)' }}>
              Tiến độ hồ sơ
            </h3>
            <span
              className="ml-auto rounded-full px-3 py-0.5 text-sm font-black"
              style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
            >
              68%
            </span>
          </div>

          {/* Progress bar */}
          <div
            className="mb-6 h-2.5 w-full overflow-hidden rounded-full"
            style={{ background: 'var(--color-border)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: '68%',
                background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent-2))',
              }}
            />
          </div>

          <ul className="space-y-3">
            {PROGRESS_ITEMS.map(item => (
              <li key={item.label} className="flex items-center gap-3">
                {item.done ? (
                  <CheckCircle2
                    size={18}
                    className="shrink-0"
                    style={{ color: 'var(--color-success)' }}
                  />
                ) : (
                  <Circle
                    size={18}
                    className="shrink-0"
                    style={{ color: 'var(--color-border-strong)' }}
                  />
                )}
                <span
                  className="flex-1 text-sm font-medium"
                  style={{ color: item.done ? 'var(--color-text)' : 'var(--color-text-subtle)' }}
                >
                  {item.label}
                </span>
                {!item.done && (
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                    style={{
                      background: 'var(--color-warning-light)',
                      color: 'var(--color-warning)',
                    }}
                  >
                    Chưa xong
                  </span>
                )}
              </li>
            ))}
          </ul>
        </SurfaceCard>

        <SurfaceCard>
          <div className="mb-5 flex items-center gap-2">
            <Flame size={16} style={{ color: 'var(--color-warning)' }} />
            <h3 className="font-bold" style={{ color: 'var(--color-text)' }}>
              Mục tiêu tuần này
            </h3>
          </div>
          <ul className="space-y-3">
            {[
              'Hoàn tất tối ưu CV cho JD Backend Intern',
              'Luyện 2 buổi phỏng vấn AI',
              'Nộp tối thiểu 5 vị trí phù hợp',
            ].map((goal, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl p-3.5 text-sm"
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <span
                  className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black"
                  style={{ background: 'var(--color-primary)', color: 'var(--color-background)' }}
                >
                  {i + 1}
                </span>
                <span className="font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  {goal}
                </span>
              </li>
            ))}
          </ul>
        </SurfaceCard>
      </div>

      {/* Recommended jobs */}
      <SurfaceCard>
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={16} style={{ color: 'var(--color-primary)' }} />
            <h3 className="font-bold" style={{ color: 'var(--color-text)' }}>
              Việc làm gợi ý
            </h3>
          </div>
          <Badge variant="primary">4 vị trí mới</Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {recommendedJobs.map(job => {
            const { main, light } = getScoreColor(job.match);
            return (
              <div
                key={job.id}
                className="card-hover flex items-center justify-between gap-3 rounded-xl p-4 transition-all"
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="min-w-0">
                  <p
                    className="truncate text-sm font-semibold"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {job.title}
                  </p>
                  <p className="mt-0.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {job.company}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-black"
                    style={{ background: light, color: main }}
                  >
                    {job.match}%
                  </span>
                  <Link to={`/jobs/${job.id}`}>
                    <button
                      className="flex items-center gap-1 text-xs font-semibold"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      Xem <ArrowRight size={10} />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </SurfaceCard>

      {/* Interview history */}
      <SurfaceCard>
        <div className="mb-5 flex items-center gap-2">
          <Clock3 size={16} style={{ color: 'var(--color-text-muted)' }} />
          <h3 className="font-bold" style={{ color: 'var(--color-text)' }}>
            Lịch sử luyện tập gần đây
          </h3>
        </div>
        <div className="space-y-3">
          {interviewHistory.map(session => {
            const { main, light } = getScoreColor(session.score);
            return (
              <div
                key={session.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl p-4"
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                    {session.role}
                  </p>
                  <p className="mt-0.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {session.time}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="rounded-full px-3 py-1 text-sm font-black"
                    style={{ background: light, color: main }}
                  >
                    {session.score}/100
                  </span>
                  <Button variant="ghost" size="sm">
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </SurfaceCard>
    </div>
  );
}
