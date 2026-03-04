import { Badge, Button, SectionTitle, SurfaceCard } from '@components/ui';
import { formatSalaryVnd, mockJobs } from '@lib/mockJobs';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const FIELDS = ['Tất cả', 'Công nghệ thông tin', 'Dữ liệu', 'Kiểm thử phần mềm', 'Sản phẩm'] as const;
const POSITIONS = ['Tất cả', 'Intern', 'Fresher', 'Junior'] as const;

export default function JobsPage() {
  const [useCvFilter, setUseCvFilter] = useState(true);
  const [field, setField] = useState<(typeof FIELDS)[number]>('Tất cả');
  const [position, setPosition] = useState<(typeof POSITIONS)[number]>('Tất cả');
  const [salaryMin, setSalaryMin] = useState(0);

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      if (useCvFilter && job.matchScore < 75) return false;
      if (field !== 'Tất cả' && job.field !== field) return false;
      if (position !== 'Tất cả' && job.position !== position) return false;
      if (salaryMin > 0 && job.salaryMax < salaryMin) return false;
      return true;
    });
  }, [field, position, salaryMin, useCvFilter]);

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Tìm việc"
        subtitle="Lọc công việc theo CV, lĩnh vực, vị trí và mức lương để chọn đúng cơ hội phù hợp."
      />

      <SurfaceCard className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Lĩnh vực</span>
            <select
              value={field}
              onChange={event => setField(event.target.value as (typeof FIELDS)[number])}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
            >
              {FIELDS.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Vị trí</span>
            <select
              value={position}
              onChange={event => setPosition(event.target.value as (typeof POSITIONS)[number])}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
            >
              {POSITIONS.map(item => (
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
              <option value={0}>Không giới hạn</option>
              <option value={5000000}>Từ 5 triệu</option>
              <option value={8000000}>Từ 8 triệu</option>
              <option value={12000000}>Từ 12 triệu</option>
            </select>
          </label>

          <div className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Lọc theo CV</span>
            <button
              onClick={() => setUseCvFilter(prev => !prev)}
              className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700"
            >
              <span>Ưu tiên việc khớp CV của tôi</span>
              <Badge variant={useCvFilter ? 'success' : 'default'}>
                {useCvFilter ? 'Đang bật' : 'Đang tắt'}
              </Badge>
            </button>
          </div>
        </div>
      </SurfaceCard>

      <div className="grid gap-4">
        {filteredJobs.length === 0 && (
          <SurfaceCard>
            <p className="text-sm text-slate-600">
              Chưa có công việc phù hợp với bộ lọc hiện tại. Hãy nới điều kiện để xem thêm kết quả.
            </p>
          </SurfaceCard>
        )}

        {filteredJobs.map(job => (
          <SurfaceCard key={job.id} className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
                <p className="mt-1 text-sm text-slate-600">
                  {job.company} • {job.location} • {job.position}
                </p>
              </div>
              <Badge variant={job.matchScore >= 85 ? 'success' : 'info'}>
                Khớp CV: {job.matchScore}%
              </Badge>
            </div>

            <p className="text-sm leading-relaxed text-slate-700">{job.summary}</p>

            <div className="flex flex-wrap gap-2 text-xs">
              <Badge variant="default">{job.field}</Badge>
              <Badge variant="default">{formatSalaryVnd(job.salaryMin, job.salaryMax)}</Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link to={`/jobs/${job.id}`}>
                <Button>Xem chi tiết công việc</Button>
              </Link>
              <Link to={`/interview?jobId=${job.id}`}>
                <Button variant="outline">Mock interview theo JD</Button>
              </Link>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </div>
  );
}
