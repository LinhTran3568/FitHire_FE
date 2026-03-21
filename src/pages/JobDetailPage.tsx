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
  MapPin,
  Clock,
  Building2,
  CheckCircle2,
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
        <p style={{ color: 'var(--color-text-secondary)' }}>Không tìm thấy công việc.</p>
        <Link
          to="/jobs"
          className="text-sm font-bold hover:underline"
          style={{ color: 'var(--color-primary)' }}
        >
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
    <div className="space-y-5">
      <SectionTitle
        title={job.title}
        subtitle={`${job.company} • ${job.location} • ${job.workMode} • ${formatSalaryVnd(job.salaryMin, job.salaryMax)}`}
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft size={15} />
              <span>Quay lại</span>
            </Button>
            <Button size="sm" variant="outline" onClick={toggleSaveJob}>
              {isSaved ? <BookmarkCheck size={15} /> : <BookmarkPlus size={15} />}
              <span>{isSaved ? 'Đã lưu' : 'Lưu việc'}</span>
            </Button>
            <a href="#apply">
              <Button size="sm">Ứng tuyển ngay</Button>
            </a>
          </div>
        }
      />

      {/* Quick nav */}
      <SurfaceCard>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { href: '#job-overview', label: 'Tổng quan' },
            { href: '#job-jd', label: 'JD chi tiết' },
            { href: '#job-fit', label: 'Độ phù hợp' },
            { href: '#apply', label: 'Ứng tuyển' },
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1 text-xs font-semibold transition-colors hover:opacity-90"
              style={{
                background: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </SurfaceCard>

      {/* Overview */}
      <SurfaceCard id="job-overview" className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary">Khớp CV: {job.matchScore}%</Badge>
          <Badge variant="default">{job.field}</Badge>
          <Badge variant="default">{job.position}</Badge>
          <Badge variant="default">
            <Clock size={11} />
            {formatPostedDate(job.postedAt)}
          </Badge>
          <Badge variant="default">
            <MapPin size={11} />
            {job.location}
          </Badge>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {job.summary}
        </p>

        <div
          className="rounded-2xl p-4"
          style={{
            background: 'var(--color-primary-muted)',
            border: '1px solid var(--color-primary)',
            borderOpacity: '0.3',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={15} style={{ color: 'var(--color-primary)' }} />
            <p className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
              Vì sao công việc này phù hợp với bạn?
            </p>
          </div>
          <ul className="space-y-1.5">
            {job.skills.slice(0, 4).map(skill => (
              <li key={skill} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={13} style={{ color: 'var(--color-primary)' }} />
                JD đang ưu tiên kỹ năng: <strong>{skill}</strong>
              </li>
            ))}
          </ul>
        </div>
      </SurfaceCard>

      {/* JD Detail */}
      <SurfaceCard id="job-jd" className="space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Building2 size={16} style={{ color: 'var(--color-text-muted)' }} />
          <h3 className="font-bold" style={{ color: 'var(--color-text)' }}>
            Mô tả công việc chi tiết
          </h3>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <div
            className="rounded-2xl p-4 lg:col-span-1"
            style={{
              background: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>
              Quyền lợi
            </h4>
            <ul className="space-y-2">
              {job.benefits.map(benefit => (
                <li key={benefit} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: 'var(--color-success)' }} />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-2xl p-4 lg:col-span-2"
            style={{
              background: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  Trách nhiệm chính
                </p>
                <ul className="space-y-2">
                  {job.responsibilities.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: 'var(--color-primary)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  Yêu cầu ứng viên
                </p>
                <ul className="space-y-2">
                  {job.requirements.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: 'var(--color-accent-2)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SurfaceCard>

      {/* Fit Section */}
      <div id="job-fit" className="grid gap-4 xl:grid-cols-2">
        <SurfaceCard className="space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquareText size={16} style={{ color: 'var(--color-primary)' }} />
            <h3 className="font-bold" style={{ color: 'var(--color-text)' }}>
              Mock interview theo JD
            </h3>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Hệ thống sẽ tạo bộ câu hỏi dựa trên chính JD này để bạn luyện phỏng vấn sát thực tế.
          </p>
          <ul className="space-y-1.5">
            {[
              `Câu hỏi kỹ thuật theo vị trí ${job.title}`,
              `Câu hỏi tình huống theo môi trường ${job.company}`,
              'Gợi ý cải thiện câu trả lời theo STAR',
            ].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={12} style={{ color: 'var(--color-primary)' }} />
                {item}
              </li>
            ))}
          </ul>
          <Link to={`/interview?jobId=${job.id}`} reloadDocument>
            <Button className="mt-2">
              <MessageSquareText size={15} />
              Bắt đầu mock interview
            </Button>
          </Link>
        </SurfaceCard>

        <SurfaceCard className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} style={{ color: 'var(--color-warning)' }} />
            <h3 className="font-bold" style={{ color: 'var(--color-text)' }}>
              Độ phù hợp với doanh nghiệp
            </h3>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            So khớp phong cách làm việc của bạn với văn hóa và cách vận hành đội ngũ tại vị trí này.
          </p>
          <ul className="space-y-1.5">
            {[
              'Điểm phù hợp văn hóa theo kết quả test cá nhân',
              'Điểm cần lưu ý khi vào team',
              'Khuyến nghị cách thích nghi trong 30 ngày đầu',
            ].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={12} style={{ color: 'var(--color-warning)' }} />
                {item}
              </li>
            ))}
          </ul>
          <Link to={`/culture/matching?jobId=${job.id}`} reloadDocument>
            <Button variant="outline" className="mt-2">Chạy test phù hợp doanh nghiệp</Button>
          </Link>
        </SurfaceCard>
      </div>

      {/* Apply */}
      <SurfaceCard id="apply" className="space-y-4">
        <div className="flex items-center gap-2">
          <BriefcaseBusiness size={16} style={{ color: 'var(--color-primary)' }} />
          <h3 className="font-bold" style={{ color: 'var(--color-text)' }}>Ứng tuyển</h3>
        </div>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Bạn có thể nộp hồ sơ ngay với CV hiện tại.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button>
            <BriefcaseBusiness size={15} />
            Ứng tuyển ngay
          </Button>
        </div>
      </SurfaceCard>
    </div>
  );
}
