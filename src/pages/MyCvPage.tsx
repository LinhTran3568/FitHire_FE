import { Badge, Button, SurfaceCard } from '@components/ui';
import { FilePenLine, FileText, Plus, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@lib/utils';

const cvVersions = [
  {
    id: 'cv-01',
    title: 'CV Backend Intern - Techify',
    updatedAt: '04/03/2026',
    status: 'Đang dùng',
    score: 82,
    color: 'from-blue-500 to-[var(--color-primary)]',
  },
  {
    id: 'cv-02',
    title: 'CV Frontend Fresher - NextGen',
    updatedAt: '28/02/2026',
    status: 'Lưu trữ',
    score: 74,
    color: 'from-blue-500 to-cyan-600',
  },
];

export default function MyCvPage() {
  return (
    <div className="space-y-6">
      {/* Gradient banner */}
      <div className="bg-gradient-brand relative overflow-hidden rounded-2xl p-6 text-white shadow-xl">
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/5 opacity-60 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-white/5 opacity-60 blur-xl" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">CV của tôi</h1>
            <p className="mt-1 text-sm font-medium text-slate-300">
              Quản lý phiên bản CV, tối ưu bằng AI và dùng để lọc việc phù hợp.
            </p>
          </div>
          <Link to="/cv-builder">
            <button className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:opacity-90">
              <Plus size={16} />
              Tạo CV mới
            </button>
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          {[
            { v: '2', l: 'CV đã tạo', c: 'bg-white/10' },
            { v: '82%', l: 'Điểm tốt nhất', c: 'bg-[var(--color-primary-muted)]' },
            { v: '24', l: 'JD phù hợp', c: 'bg-[var(--color-info-light)]' },
          ].map(s => (
            <div
              key={s.l}
              className={cn('rounded-2xl border border-white/5 px-5 py-3 backdrop-blur-sm', s.c)}
            >
              <p className="text-xl font-black text-white">{s.v}</p>
              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        {/* CV list */}
        <SurfaceCard className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-[var(--color-primary)]" />
            <h3 className="font-semibold text-slate-900">Danh sách CV</h3>
          </div>
          <div className="space-y-3">
            {cvVersions.map(cv => (
              <article
                key={cv.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 transition-all hover:scale-[1.01] hover:shadow-md"
                style={{
                  borderColor: 'var(--color-border)',
                  background: 'var(--color-surface-raised)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cv.color}`}
                  >
                    <FileText size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: 'var(--color-text)' }}>
                      {cv.title}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      Cập nhật: {cv.updatedAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-lg font-black" style={{ color: 'var(--color-text)' }}>
                      {cv.score}%
                    </p>
                    <p
                      className="text-[10px] font-bold tracking-wider uppercase transition-colors"
                      style={{ color: 'var(--color-text-subtle)' }}
                    >
                      Điểm CV
                    </p>
                  </div>
                  <Badge variant={cv.status === 'Đang dùng' ? 'success' : 'default'}>
                    {cv.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <FilePenLine size={14} />
                    <span>Chỉnh sửa</span>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </SurfaceCard>

        {/* Side panel */}
        <div className="space-y-4">
          <SurfaceCard className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-amber-500" />
              <h3 className="font-semibold text-slate-900">Gợi ý AI</h3>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{
                background: 'var(--color-primary-muted)',
                borderColor: 'var(--color-primary)/20',
              }}
            >
              <p
                className="text-sm leading-relaxed font-medium"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                CV thiếu số liệu định lượng trong phần kinh nghiệm. Bổ sung KPI và kết quả cụ thể để
                tăng điểm lọc hồ sơ.
              </p>
            </div>
            <Link to="/cv-builder">
              <Button className="w-full">Tối ưu CV ngay</Button>
            </Link>
            <Link to="/jobs">
              <Button variant="outline" className="w-full">
                Tìm việc từ CV của tôi
              </Button>
            </Link>
          </SurfaceCard>

          <SurfaceCard className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-600" />
              <h3 className="font-semibold text-slate-900">Mẹo cải thiện</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              {[
                {
                  num: '1',
                  text: 'Thêm kết quả định lượng cho mỗi dự án',
                  color: 'bg-emerald-100 text-emerald-700',
                },
                {
                  num: '2',
                  text: 'Bổ sung chứng chỉ kỹ thuật liên quan',
                  color: 'bg-blue-100 text-blue-700',
                },
                {
                  num: '3',
                  text: 'Dùng từ khóa từ mô tả công việc mục tiêu',
                  color: 'bg-blue-100 text-blue-700',
                },
              ].map(item => (
                <li key={item.num} className="flex items-start gap-2">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${item.color}`}
                  >
                    {item.num}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}
