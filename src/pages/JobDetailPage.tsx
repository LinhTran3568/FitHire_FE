import { Badge, Button, SectionTitle, SurfaceCard } from '@components/ui';
import { formatSalaryVnd, getJobById } from '@lib/mockJobs';
import { ArrowLeft, MessageSquareText, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function JobDetailPage() {
  const { jobId } = useParams();
  const job = jobId ? getJobById(jobId) : undefined;

  if (!job) {
    return (
      <SurfaceCard className="space-y-3">
        <p className="text-slate-700">Không tìm thấy công việc.</p>
        <Link to="/jobs" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Quay lại danh sách việc làm
        </Link>
      </SurfaceCard>
    );
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title={job.title}
        subtitle={`${job.company} • ${job.location} • ${formatSalaryVnd(job.salaryMin, job.salaryMax)}`}
        action={
          <Link to="/jobs">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={16} />
              <span>Quay lại</span>
            </Button>
          </Link>
        }
      />

      <SurfaceCard className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="info">Khớp CV: {job.matchScore}%</Badge>
          <Badge variant="default">{job.field}</Badge>
          <Badge variant="default">{job.position}</Badge>
        </div>

        <p className="text-sm leading-relaxed text-slate-700">{job.summary}</p>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 p-4 lg:col-span-1">
            <h3 className="text-sm font-semibold text-slate-900">Quyền lợi</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {job.benefits.map(benefit => (
                <li key={benefit}>• {benefit}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 p-4 lg:col-span-2">
            <h3 className="text-sm font-semibold text-slate-900">Mô tả công việc (JD)</h3>

            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Trách nhiệm chính
                </p>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  {job.responsibilities.map(item => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Yêu cầu ứng viên
                </p>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  {job.requirements.map(item => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SurfaceCard>

      <div className="grid gap-4 xl:grid-cols-2">
        <SurfaceCard className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900">
            <MessageSquareText size={18} />
            <h3 className="font-semibold">Mock interview theo JD</h3>
          </div>
          <p className="text-sm text-slate-700">
            Hệ thống sẽ tạo bộ câu hỏi dựa trên chính JD này để bạn luyện phỏng vấn sát thực tế.
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Câu hỏi kỹ thuật theo vị trí {job.title}</li>
            <li>• Câu hỏi tình huống theo môi trường {job.company}</li>
            <li>• Gợi ý cải thiện câu trả lời theo STAR</li>
          </ul>
          <Link to={`/interview?jobId=${job.id}`}>
            <Button>Bắt đầu mock interview</Button>
          </Link>
        </SurfaceCard>

        <SurfaceCard className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900">
            <Sparkles size={18} />
            <h3 className="font-semibold">Độ phù hợp với doanh nghiệp</h3>
          </div>
          <p className="text-sm text-slate-700">
            So khớp phong cách làm việc của bạn với văn hóa và cách vận hành đội ngũ tại vị trí này.
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Điểm phù hợp văn hóa theo kết quả test cá nhân</li>
            <li>• Điểm cần lưu ý khi vào team</li>
            <li>• Khuyến nghị cách thích nghi trong 30 ngày đầu</li>
          </ul>
          <Link to={`/culture/matching?jobId=${job.id}`}>
            <Button variant="outline">Chạy test phù hợp doanh nghiệp</Button>
          </Link>
        </SurfaceCard>
      </div>
    </div>
  );
}
