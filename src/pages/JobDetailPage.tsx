import { Badge, Button, SectionTitle, SurfaceCard } from '@components/ui';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { formatPostedDate, formatSalaryVnd, getJobById } from '@lib/mockJobs';
import {
  ArrowLeft,
  BookmarkCheck,
  BookmarkPlus,
  BriefcaseBusiness,
  MessageSquareText,
  Sparkles,
} from 'lucide-react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function JobDetailPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const job = jobId ? getJobById(jobId) : undefined;

  const [savedJobs, setSavedJobs] = useLocalStorage<string[]>('saved_jobs', []);
  const [, setRecentJobs] = useLocalStorage<string[]>('recent_jobs', []);

  useEffect(() => {
    if (!job) return;

    setRecentJobs(prev => {
      const next = [job.id, ...prev.filter(id => id !== job.id)];
      return next.slice(0, 8);
    });
  }, [job, setRecentJobs]);

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

  const isSaved = savedJobs.includes(job.id);

  const toggleSaveJob = () => {
    setSavedJobs(prev =>
      prev.includes(job.id) ? prev.filter(id => id !== job.id) : [...prev, job.id],
    );
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        title={job.title}
        subtitle={`${job.company} • ${job.location} • ${job.workMode} • ${formatSalaryVnd(job.salaryMin, job.salaryMax)}`}
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft size={16} />
              <span>Quay lại</span>
            </Button>
            <Button size="sm" variant="outline" onClick={toggleSaveJob}>
              {isSaved ? <BookmarkCheck size={16} /> : <BookmarkPlus size={16} />}
              <span>{isSaved ? 'Đã lưu việc' : 'Lưu việc này'}</span>
            </Button>
            <a href="#apply">
              <Button size="sm">Ứng tuyển ngay</Button>
            </a>
          </div>
        }
      />

      <SurfaceCard>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="#job-overview"
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
          >
            Tổng quan
          </a>
          <a
            href="#job-jd"
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
          >
            JD chi tiết
          </a>
          <a
            href="#job-fit"
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
          >
            Độ phù hợp
          </a>
          <a
            href="#apply"
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
          >
            Ứng tuyển
          </a>
        </div>
      </SurfaceCard>

      <SurfaceCard id="job-overview" className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="info">Khớp CV: {job.matchScore}%</Badge>
          <Badge variant="default">{job.field}</Badge>
          <Badge variant="default">{job.position}</Badge>
          <Badge variant="default">{formatPostedDate(job.postedAt)}</Badge>
        </div>

        <p className="text-sm leading-relaxed text-slate-700">{job.summary}</p>

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-sm font-semibold text-blue-700">
            Vì sao công việc này phù hợp với bạn?
          </p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {job.skills.slice(0, 4).map(skill => (
              <li key={skill}>• JD đang ưu tiên kỹ năng: {skill}</li>
            ))}
          </ul>
        </div>
      </SurfaceCard>

      <SurfaceCard id="job-jd" className="space-y-4">
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
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Trách nhiệm chính
                </p>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  {job.responsibilities.map(item => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
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

      <div id="job-fit" className="grid gap-4 xl:grid-cols-2">
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
          <Link
            to={`/interview?jobId=${job.id}`}
            reloadDocument
            className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Bắt đầu mock interview
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
          <Link
            to={`/culture/matching?jobId=${job.id}`}
            reloadDocument
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-transparent px-4 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Chạy test phù hợp doanh nghiệp
          </Link>
        </SurfaceCard>
      </div>

      <SurfaceCard id="apply" className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <BriefcaseBusiness size={18} />
          <h3 className="font-semibold">Ứng tuyển</h3>
        </div>

        <p className="text-sm text-slate-700">Bạn có thể nộp hồ sơ ngay với CV hiện tại.</p>

        <div className="flex flex-wrap gap-2">
          <Button>Ứng tuyển ngay</Button>
        </div>
      </SurfaceCard>
    </div>
  );
}
