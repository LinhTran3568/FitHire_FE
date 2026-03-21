import { Badge, Button, SurfaceCard } from '@components/ui';
import { FilePenLine, FileText, Plus, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const cvVersions = [
  {
    id: 'cv-01',
    title: 'CV Backend Intern - Techify',
    updatedAt: '04/03/2026',
    status: 'Đang dùng',
    score: 82,
    color: 'from-blue-500 to-indigo-600',
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
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">CV của tôi</h1>
            <p className="mt-1 text-sm text-slate-300">
              Quản lý phiên bản CV, tối ưu bằng AI và dùng để lọc việc phù hợp.
            </p>
          </div>
          <Link to="/cv-builder">
            <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400">
              <Plus size={16} />
              Tạo CV mới
            </button>
          </Link>
        </div>
        <div className="mt-5 flex flex-wrap gap-4">
          <div className="rounded-xl bg-white/10 px-4 py-3">
            <p className="text-xl font-bold">2</p>
            <p className="text-xs text-slate-300">CV đã tạo</p>
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-3">
            <p className="text-xl font-bold">82%</p>
            <p className="text-xs text-slate-300">Điểm tốt nhất</p>
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-3">
            <p className="text-xl font-bold">24</p>
            <p className="text-xs text-slate-300">JD phù hợp</p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        {/* CV list */}
        <SurfaceCard className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-indigo-600" />
            <h3 className="font-semibold text-slate-900">Danh sách CV</h3>
          </div>
          <div className="space-y-3">
            {cvVersions.map(cv => (
              <article
                key={cv.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/30"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cv.color}`}
                  >
                    <FileText size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{cv.title}</p>
                    <p className="text-xs text-slate-500">Cập nhật: {cv.updatedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900">{cv.score}%</p>
                    <p className="text-xs text-slate-500">Điểm CV</p>
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
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
              <p className="text-sm leading-relaxed text-amber-900">
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
