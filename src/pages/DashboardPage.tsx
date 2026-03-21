import { Badge, Button, SectionTitle, SurfaceCard } from '@components/ui';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Clock3,
  FileText,
  MicVocal,
  Sparkles,
  Target,
  TrendingUp,
  CheckCircle2,
  Circle,
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
  { to: '/cv-builder', label: 'Tạo CV', icon: FileText },
  { to: '/jobs', label: 'Tìm việc', icon: BriefcaseBusiness },
  { to: '/interview', label: 'Phỏng vấn AI', icon: MicVocal },
  { to: '/culture/tests', label: 'Test tính cách', icon: BookOpen },
];

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
              className="card-hover rounded-2xl p-5 text-center transition-all"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: 'var(--color-primary)', color: '#fff' }}
              >
                <link.icon size={20} />
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
          { icon: Target, label: 'Hoàn thành hồ sơ', value: '68%', accent: '--color-primary' },
          { icon: BriefcaseBusiness, label: 'Việc phù hợp', value: '24', accent: '--color-accent-2' },
          { icon: TrendingUp, label: 'Trung bình phỏng vấn', value: '82/100', accent: '--color-success' },
        ].map(stat => (
          <SurfaceCard key={stat.label} className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ background: `var(${stat.accent})`, color: '#fff' }}
            >
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-extrabold" style={{ color: 'var(--color-text)' }}>
                {stat.value}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {stat.label}
              </p>
            </div>
          </SurfaceCard>
        ))}
      </div>

      {/* CV Progress + Goals */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SurfaceCard>
          <div className="mb-4 flex items-center gap-2">
            <Target size={16} style={{ color: 'var(--color-primary)' }} />
            <h3 className="font-bold" style={{ color: 'var(--color-text)' }}>
              Tiến độ hồ sơ
            </h3>
            <span
              className="ml-auto text-sm font-bold"
              style={{ color: 'var(--color-primary)' }}
            >
              68%
            </span>
          </div>
          <div
            className="mb-5 h-2.5 w-full overflow-hidden rounded-full"
            style={{ background: 'var(--color-border)' }}
          >
            <div
              className="h-full w-[68%] rounded-full transition-all"
              style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent-2))' }}
            />
          </div>
          <ul className="space-y-2.5">
            {PROGRESS_ITEMS.map(item => (
              <li key={item.label} className="flex items-center gap-2.5 text-sm">
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
                <span style={{ color: item.done ? 'var(--color-text)' : 'var(--color-text-subtle)' }}>
                  {item.label}
                </span>
                {!item.done && (
                  <span
                    className="ml-auto rounded-full px-2 py-0.5 text-xs font-bold"
                    style={{ background: 'var(--color-warning-light)', color: 'var(--color-warning)' }}
                  >
                    Chưa xong
                  </span>
                )}
              </li>
            ))}
          </ul>
        </SurfaceCard>

        <SurfaceCard>
          <div className="mb-4 flex items-center gap-2">
            <Sparkles size={16} style={{ color: 'var(--color-warning)' }} />
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
                className="flex items-start gap-3 rounded-xl p-3 text-sm"
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: 'var(--color-primary)' }}
                >
                  {i + 1}
                </span>
                <span style={{ color: 'var(--color-text-secondary)' }}>{goal}</span>
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
          {recommendedJobs.map(job => (
            <div
              key={job.id}
              className="card-hover flex items-center justify-between gap-3 rounded-xl p-4 transition-colors"
              style={{
                background: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
                  {job.title}
                </p>
                <p className="mt-0.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {job.company}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-bold"
                  style={{
                    background: job.match >= 85 ? 'var(--color-success-light)' : 'var(--color-primary-muted)',
                    color: job.match >= 85 ? 'var(--color-success)' : 'var(--color-primary)',
                  }}
                >
                  {job.match}%
                </span>
                <Link to={`/jobs/${job.id}`}>
                  <button
                    className="flex items-center gap-1 text-xs font-semibold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Xem <ArrowRight size={11} />
                  </button>
                </Link>
              </div>
            </div>
          ))}
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
          {interviewHistory.map(session => (
            <div
              key={session.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl p-4"
              style={{
                background: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
                  {session.role}
                </p>
                <p className="mt-0.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {session.time}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-2 w-16 overflow-hidden rounded-full"
                    style={{ background: 'var(--color-border)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${session.score}%`,
                        background: session.score >= 80
                          ? 'linear-gradient(90deg, var(--color-success), var(--color-accent-2))'
                          : 'linear-gradient(90deg, var(--color-warning), var(--color-danger))',
                      }}
                    />
                  </div>
                  <span
                    className="text-sm font-bold"
                    style={{ color: session.score >= 80 ? 'var(--color-success)' : 'var(--color-warning)' }}
                  >
                    {session.score}/100
                  </span>
                </div>
                <Button variant="ghost" size="sm">Xem chi tiết</Button>
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  );
}
