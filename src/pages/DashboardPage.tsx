import { Badge, Button, ProgressBar, SectionTitle, SurfaceCard } from '@components/ui';
import { Clock3, Sparkles, Target } from 'lucide-react';


const recommendedJobs = [
  {
    id: 'jd-01',
    title: 'Frontend Developer Intern',
    company: 'Techify Vietnam',
    match: 86,
  },
  {
    id: 'jd-02',
    title: 'Backend Java Intern',
    company: 'NextGen Solutions',
    match: 81,
  },
  {
    id: 'jd-03',
    title: 'QA Engineer Fresher',
    company: 'FinStack',
    match: 78,
  },
  {
    id: 'jd-04',
    title: 'Product Analyst Intern',
    company: 'GrowthLab',
    match: 74,
  },
];

const interviewHistory = [
  { id: 'iv-01', role: 'Java Backend Intern', score: 82, time: 'Hôm qua, 20:15' },
  { id: 'iv-02', role: 'Frontend Intern', score: 76, time: '2 ngày trước, 19:45' },
  { id: 'iv-03', role: 'QA Intern', score: 88, time: '4 ngày trước, 21:10' },
];

/**
 * Main dashboard after login.
 */
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title="Tổng quan hành trình ứng tuyển"
        subtitle="Theo dõi tiến độ hồ sơ, việc làm phù hợp và chất lượng luyện phỏng vấn."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <SurfaceCard className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-2 text-slate-700">
            <Target size={18} />
            <h3 className="font-semibold">Tiến độ của bạn</h3>
          </div>
          <ProgressBar value={68} />
          <p className="mt-3 text-sm text-slate-500">
            Hoàn thành thêm phần kinh nghiệm dự án để tăng điểm hồ sơ.
          </p>
        </SurfaceCard>

        <SurfaceCard>
          <div className="mb-3 flex items-center gap-2 text-slate-700">
            <Sparkles size={18} />
            <h3 className="font-semibold">Mục tiêu tuần này</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>1. Hoàn tất tối ưu CV cho JD Backend Intern.</li>
            <li>2. Luyện 2 buổi phỏng vấn AI.</li>
            <li>3. Nộp tối thiểu 5 vị trí phù hợp.</li>
          </ul>
        </SurfaceCard>
      </div>

      <SurfaceCard>
        <SectionTitle
          title="Việc làm gợi ý"
          subtitle="Danh sách JD đề xuất theo kỹ năng hiện tại."
          action={
            <Badge variant="info" className="self-center">
              4 vị trí mới
            </Badge>
          }
        />
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {recommendedJobs.map(job => (
            <article
              key={job.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-slate-900">{job.title}</h4>
                  <p className="mt-1 text-sm text-slate-500">{job.company}</p>
                </div>
                <Badge variant="success">{job.match}% match</Badge>
              </div>
              <Button size="sm" className="mt-4 rounded-lg">
                Check độ phù hợp ngay
              </Button>
            </article>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard>
        <div className="mb-4 flex items-center gap-2 text-slate-700">
          <Clock3 size={18} />
          <h3 className="font-semibold">Lịch sử luyện tập gần đây</h3>
        </div>
        <div className="space-y-3">
          {interviewHistory.map(session => (
            <div
              key={session.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-4"
            >
              <div>
                <p className="font-medium text-slate-900">{session.role}</p>
                <p className="text-sm text-slate-500">{session.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={session.score >= 80 ? 'success' : 'warning'}>
                  {session.score}/100
                </Badge>
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
