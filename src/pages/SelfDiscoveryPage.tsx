import { Button, Badge, SurfaceCard } from '@components/ui';
import { Compass, Lightbulb, Target, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const traits = [
  { label: 'Problem Solving', value: 86, color: 'var(--color-primary)' },
  { label: 'Collaboration', value: 79, color: 'var(--color-success)' },
  { label: 'Adaptability', value: 83, color: 'var(--color-info)' },
  { label: 'Leadership Potential', value: 72, color: 'var(--color-warning)' },
];

export default function SelfDiscoveryPage() {
  return (
    <div className="animate-in fade-in space-y-6 duration-500 lg:space-y-8">
      {/* Hero */}
      <SurfaceCard
        className="relative overflow-hidden border-0 !p-8 text-center shadow-lg md:!p-10"
        style={{ background: 'var(--color-primary-muted)' }}
      >
        <div className="relative z-10 flex flex-col items-center">
          <Badge variant="primary" className="mb-4">
            <Compass size={14} className="mr-1.5" /> Báo cáo Năng lực
          </Badge>
          <h1
            className="mb-3 text-3xl leading-tight font-black tracking-tight md:text-5xl"
            style={{ color: 'var(--color-primary)' }}
          >
            Khám phá Bản thân
          </h1>
          <p
            className="mt-2 max-w-lg text-sm leading-relaxed font-medium md:text-base"
            style={{ color: 'var(--color-text)' }}
          >
            Hiểu rõ phong cách làm việc và đánh giá năng lực hiện tại để lựa chọn môi trường công sở
            phù hợp nhất.
          </p>
        </div>
      </SurfaceCard>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Radar / Trait Card */}
        <SurfaceCard className="flex flex-col md:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl font-bold"
                style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
              >
                <Target size={20} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                Hồ sơ năng lực cá nhân
              </h3>
            </div>
            <Badge
              variant="default"
              className="font-semibold shadow-sm"
              style={{ borderColor: 'var(--color-border-strong)' }}
            >
              Đã phân tích
            </Badge>
          </div>

          <div className="flex-1 space-y-5">
            {traits.map(trait => (
              <div key={trait.label} className="group/trait">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                    {trait.label}
                  </span>
                  <span
                    className="rounded-md border px-2 py-0.5 font-black"
                    style={{
                      color: 'var(--color-text)',
                      borderColor: 'var(--color-border)',
                      background: 'var(--color-surface)',
                    }}
                  >
                    {trait.value}%
                  </span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full border"
                  style={{
                    background: 'var(--color-surface-raised)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${trait.value}%`, background: trait.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-8 grid grid-cols-2 gap-4 border-t pt-5"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className="text-[10px] font-bold tracking-widest uppercase"
                style={{ color: 'var(--color-text-subtle)' }}
              >
                ĐIỂM MẠNH NHẤT
              </span>
              <span
                className="flex items-center gap-1.5 text-sm font-bold"
                style={{ color: 'var(--color-text)' }}
              >
                <TrendingUp size={16} style={{ color: 'var(--color-success)' }} /> Problem Solving
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span
                className="text-[10px] font-bold tracking-widest uppercase"
                style={{ color: 'var(--color-text-subtle)' }}
              >
                CẦN PHÁT TRIỂN
              </span>
              <span
                className="flex items-center gap-1.5 text-sm font-bold"
                style={{ color: 'var(--color-text)' }}
              >
                <TrendingUp
                  size={16}
                  className="rotate-90"
                  style={{ color: 'var(--color-warning)' }}
                />{' '}
                Leadership Potential
              </span>
            </div>
          </div>
        </SurfaceCard>

        {/* Career Suggestions */}
        <SurfaceCard className="flex flex-col space-y-5">
          <div className="mb-2 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: 'var(--color-warning-light)', color: 'var(--color-warning)' }}
            >
              <Lightbulb size={20} />
            </div>
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              Gợi ý nghề nghiệp
            </h3>
          </div>
          <p
            className="text-sm leading-relaxed font-medium"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Dựa trên năng lực, AI đề xuất cấu trúc chức danh:
          </p>

          <div className="flex flex-col gap-3">
            {[
              {
                id: 1,
                title: 'Product-oriented Engineer',
                color: 'var(--color-info)',
                bg: 'var(--color-info-light)',
              },
              {
                id: 2,
                title: 'Backend Intern',
                color: 'var(--color-success)',
                bg: 'var(--color-success-light)',
              },
              {
                id: 3,
                title: 'QA Automation',
                color: 'var(--color-warning)',
                bg: 'var(--color-warning-light)',
              },
            ].map(j => (
              <div
                key={j.id}
                className="flex items-center gap-3 rounded-xl border p-3 transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-black"
                  style={{ background: j.bg, color: j.color }}
                >
                  {j.id}
                </span>
                <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                  {j.title}
                </span>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>

      {/* AI Insights Card */}
      <SurfaceCard className="p-8">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
              >
                <Sparkles size={20} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                Góc nhìn AI (Insights)
              </h3>
            </div>
            <p
              className="text-sm leading-relaxed font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Bạn đặc biệt{' '}
              <span className="font-bold" style={{ color: 'var(--color-primary)' }}>
                phù hợp với các môi trường cực kì linh hoạt{' '}
              </span>
              và có nhịp độ phát hành sản phẩm liên tục. Để cạnh tranh với ứng viên Senior, hãy rèn
              giũa thêm cách
              <span className="ml-1 border-b border-dashed pb-0.5 font-bold">
                định lượng hoá khối lượng công việc
              </span>{' '}
              của bạn.
            </p>
          </div>

          <div className="w-full shrink-0 md:w-auto">
            <Link to="/culture/tests">
              <Button
                variant="primary"
                className="h-14 w-full px-8 text-sm font-bold shadow-md md:w-auto"
              >
                Kiểm tra Culture Fit
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </SurfaceCard>
    </div>
  );
}
