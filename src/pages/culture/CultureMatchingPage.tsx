import { Badge, Button, CircularGauge, SectionTitle, SurfaceCard } from '@components/ui';
import { Building2, Link as LinkIcon, WandSparkles } from 'lucide-react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const alignmentPoints = [
  'Cùng đề cao sự minh bạch trong giao tiếp và feedback.',
  'Cùng ưu tiên tính chủ động và tốc độ triển khai.',
  'Có xu hướng học nhanh qua dự án thực tế.',
];

const cautionPoints = [
  'Công ty có chu kỳ release gấp, tần suất overtime cao theo mùa.',
  'Quy trình phê duyệt nhiều bước, cần kiên nhẫn và kỷ luật cao.',
  'Cần tiếp nhận feedback trực diện thường xuyên từ cấp quản lý.',
];

export default function CultureMatchingPage() {
  const [searchParams] = useSearchParams();
  const targetJob = searchParams.get('jobId');

  const companyName = useMemo(() => {
    if (!targetJob) return 'Công ty mục tiêu';

    if (targetJob.includes('techify')) return 'Techify Vietnam';
    if (targetJob.includes('nextgen')) return 'NextGen Solutions';
    if (targetJob.includes('finstack')) return 'FinStack';
    if (targetJob.includes('growthlab')) return 'GrowthLab';

    return 'Công ty mục tiêu';
  }, [targetJob]);

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Culture Matching"
        subtitle="So khớp hồ sơ văn hóa của bạn với công ty/JD mục tiêu để tránh lệch kỳ vọng khi đi làm."
      />

      <SurfaceCard className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Dán link JD</span>
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2">
              <LinkIcon size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="https://company.com/jobs/backend-intern"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Hoặc chọn công ty</span>
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2">
              <Building2 size={16} className="text-slate-400" />
              <select className="w-full bg-transparent text-sm outline-none">
                <option>Techify Vietnam</option>
                <option>NextGen Solutions</option>
                <option>FinStack</option>
                <option>GrowthLab</option>
              </select>
            </div>
          </label>
        </div>

        <div className="flex justify-end">
          <Button>
            <WandSparkles size={16} />
            <span>Phân tích matching</span>
          </Button>
        </div>
      </SurfaceCard>

      <div className="grid gap-5 xl:grid-cols-[22rem_1fr]">
        <SurfaceCard className="flex flex-col items-center justify-center">
          <CircularGauge value={85} label="Matching Score" />
          <p className="mt-4 text-center text-sm text-slate-600">
            Bạn khớp <span className="font-semibold text-slate-900">85%</span> với văn hóa của
            <span className="font-semibold text-slate-900"> {companyName}</span>.
          </p>
        </SurfaceCard>

        <div className="space-y-5">
          <SurfaceCard>
            <h3 className="text-lg font-semibold text-slate-900">Điểm chạm</h3>
            <div className="mt-3 space-y-2">
              {alignmentPoints.map(point => (
                <div
                  key={point}
                  className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
                >
                  {point}
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <h3 className="text-lg font-semibold text-slate-900">Điểm cần lưu ý</h3>
            <div className="mt-3 space-y-2">
              {cautionPoints.map(point => (
                <div
                  key={point}
                  className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-sm text-amber-800"
                >
                  {point}
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <div className="flex items-center gap-2">
              <Badge variant="info">Lời khuyên từ FitHire</Badge>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Nếu bạn vào môi trường này, hãy chuẩn bị trước kế hoạch học nhanh 30 ngày đầu: nắm quy
              trình review, cách báo cáo tiến độ và tiêu chuẩn giao tiếp trong team.
            </p>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}
