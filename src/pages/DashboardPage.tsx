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
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
  },
  {
    to: '/jobs',
    label: 'Tìm việc',
    icon: BriefcaseBusiness,
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    to: '/interview',
    label: 'Phỏng vấn AI',
    icon: MicVocal,
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  {
    to: '/culture/tests',
    label: 'Test tính cách',
    icon: BookOpen,
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-7">
      <SectionTitle
        title="Tổng quan hành trình"
        subtitle="Theo dõi tiến độ hồ sơ, việc làm phù hợp và chất lượng luyện phỏng vấn."
      />

      {/* Quick action cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {QUICK_LINKS.map(link => (
          <Link key={link.to} to={link.to}>
            <div
              className={`card-hover rounded-2xl border ${link.border} ${link.bg} p-5 text-center`}
            >
              <div
                className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${link.color}`}
              >
                <link.icon size={22} className="text-white" />
              </div>
              <p className="text-sm font-semibold text-slate-800">{link.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid gap-4 md:grid-cols-3">
        <SurfaceCard className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600">
            <Target size={20} className="text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">68%</p>
            <p className="text-sm text-slate-500">Hoàn thành hồ sơ</p>
          </div>
        </SurfaceCard>

        <SurfaceCard className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
            <BriefcaseBusiness size={20} className="text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">24</p>
            <p className="text-sm text-slate-500">Việc phù hợp</p>
          </div>
        </SurfaceCard>

        <SurfaceCard className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">82/100</p>
            <p className="text-sm text-slate-500">Trung bình phỏng vấn</p>
          </div>
        </SurfaceCard>
      </div>

      {/* CV Progress + Goals */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SurfaceCard>
          <div className="mb-4 flex items-center gap-2">
            <Target size={17} className="text-indigo-600" />
            <h3 className="font-semibold text-slate-800">Tiến độ hồ sơ</h3>
            <span className="ml-auto text-sm font-bold text-indigo-600">68%</span>
          </div>
          <div className="mb-5 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all" />
          </div>
          <ul className="space-y-2.5">
            {PROGRESS_ITEMS.map(item => (
              <li key={item.label} className="flex items-center gap-2.5 text-sm">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                    item.done ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {item.done ? '✓' : '—'}
                </span>
                <span className={item.done ? 'text-slate-700' : 'text-slate-400'}>
                  {item.label}
                </span>
                {!item.done && (
                  <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                    Chưa xong
                  </span>
                )}
              </li>
            ))}
          </ul>
        </SurfaceCard>

        <SurfaceCard>
          <div className="mb-4 flex items-center gap-2">
            <Sparkles size={17} className="text-amber-500" />
            <h3 className="font-semibold text-slate-800">Mục tiêu tuần này</h3>
          </div>
          <ul className="space-y-3">
            {[
              'Hoàn tất tối ưu CV cho JD Backend Intern',
              'Luyện 2 buổi phỏng vấn AI',
              'Nộp tối thiểu 5 vị trí phù hợp',
            ].map((goal, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                  {i + 1}
                </span>
                {goal}
              </li>
            ))}
          </ul>
        </SurfaceCard>
      </div>

      {/* Recommended jobs */}
      <SurfaceCard>
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={17} className="text-blue-600" />
            <h3 className="font-semibold text-slate-800">Việc làm gợi ý</h3>
          </div>
          <Badge variant="info">4 vị trí mới</Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {recommendedJobs.map(job => (
            <div
              key={job.id}
              className="card-hover flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <div>
                <p className="font-semibold text-slate-900">{job.title}</p>
                <p className="mt-0.5 text-sm text-slate-500">{job.company}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    job.match >= 85
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {job.match}%
                </span>
                <Link to={`/jobs/${job.id}`}>
                  <button className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700">
                    Xem <ArrowRight size={12} />
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
          <Clock3 size={17} className="text-slate-600" />
          <h3 className="font-semibold text-slate-800">Lịch sử luyện tập gần đây</h3>
        </div>
        <div className="space-y-3">
          {interviewHistory.map(session => (
            <div
              key={session.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <div>
                <p className="font-medium text-slate-900">{session.role}</p>
                <p className="mt-0.5 text-sm text-slate-500">{session.time}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className={`h-2 w-16 overflow-hidden rounded-full bg-slate-200`}>
                    <div
                      className={`h-full rounded-full ${
                        session.score >= 80
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                          : 'bg-gradient-to-r from-amber-400 to-orange-400'
                      }`}
                      style={{ width: `${session.score}%` }}
                    />
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      session.score >= 80 ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {session.score}/100
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  Xem chi tiết
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  );
}
