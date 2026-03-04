import { Badge, Button, SectionTitle, SurfaceCard } from '@components/ui';
import { FilePenLine, FileText, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const cvVersions = [
  {
    id: 'cv-01',
    title: 'CV Backend Intern - Techify',
    updatedAt: '04/03/2026',
    status: 'Đang dùng',
  },
  {
    id: 'cv-02',
    title: 'CV Frontend Fresher - NextGen',
    updatedAt: '28/02/2026',
    status: 'Lưu trữ',
  },
];

export default function MyCvPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title="Hồ sơ người dùng - CV của tôi"
        subtitle="Quản lý phiên bản CV, cập nhật nhanh bằng AI và dùng để lọc việc làm phù hợp."
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_20rem]">
        <SurfaceCard className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900">
            <FileText size={18} />
            <h3 className="font-semibold">Danh sách CV</h3>
          </div>

          <div className="space-y-3">
            {cvVersions.map(cv => (
              <article
                key={cv.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-4"
              >
                <div>
                  <p className="font-medium text-slate-900">{cv.title}</p>
                  <p className="text-sm text-slate-500">Cập nhật: {cv.updatedAt}</p>
                </div>
                <div className="flex items-center gap-2">
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

        <SurfaceCard className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900">
            <Sparkles size={18} className="text-blue-600" />
            <h3 className="font-semibold">Gợi ý AI</h3>
          </div>
          <p className="text-sm leading-relaxed text-slate-700">
            CV hiện tại thiếu số liệu định lượng trong phần kinh nghiệm. Hãy bổ sung KPI, kết quả
            trước và sau khi triển khai để tăng điểm lọc hồ sơ.
          </p>
          <Link to="/cv-builder">
            <Button className="w-full">Tạo hoặc tối ưu CV ngay</Button>
          </Link>
          <Link to="/jobs">
            <Button variant="outline" className="w-full">
              Tìm việc từ CV của tôi
            </Button>
          </Link>
        </SurfaceCard>
      </div>
    </div>
  );
}
