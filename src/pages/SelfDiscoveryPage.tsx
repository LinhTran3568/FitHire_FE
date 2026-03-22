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
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
      
      {/* Hero */}
      <SurfaceCard className="relative overflow-hidden !p-8 md:!p-10 border-0 shadow-lg text-center" style={{ background: 'var(--color-primary-muted)' }}>
        <div className="relative z-10 flex flex-col items-center">
          <Badge variant="primary" className="mb-4">
            <Compass size={14} className="mr-1.5" /> Báo cáo Năng lực
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-3" style={{ color: 'var(--color-primary)' }}>
            Khám phá Bản thân
          </h1>
          <p className="mt-2 text-sm md:text-base max-w-lg leading-relaxed font-medium" style={{ color: 'var(--color-text)' }}>
            Hiểu rõ phong cách làm việc và đánh giá năng lực hiện tại để lựa chọn môi trường công sở phù hợp nhất.
          </p>
        </div>
      </SurfaceCard>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Radar / Trait Card */}
        <SurfaceCard className="md:col-span-2 flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl font-bold" style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}>
                <Target size={20} />
              </div>
              <h3 className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>Hồ sơ năng lực cá nhân</h3>
            </div>
            <Badge variant="default" className="font-semibold shadow-sm" style={{ borderColor: 'var(--color-border-strong)' }}>Đã phân tích</Badge>
          </div>
          
          <div className="space-y-5 flex-1">
            {traits.map(trait => (
              <div key={trait.label} className="group/trait">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{trait.label}</span>
                  <span className="font-black px-2 py-0.5 rounded-md border" style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>{trait.value}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden border" style={{ background: 'var(--color-surface-raised)', borderColor: 'var(--color-border)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${trait.value}%`, background: trait.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-5 border-t grid grid-cols-2 gap-4" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-subtle)' }}>ĐIỂM MẠNH NHẤT</span>
              <span className="text-sm font-bold flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                <TrendingUp size={16} style={{ color: 'var(--color-success)' }} /> Problem Solving
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-subtle)' }}>CẦN PHÁT TRIỂN</span>
              <span className="text-sm font-bold flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                <TrendingUp size={16} className="rotate-90" style={{ color: 'var(--color-warning)' }} /> Leadership Potential
              </span>
            </div>
          </div>
        </SurfaceCard>

        {/* Career Suggestions */}
        <SurfaceCard className="space-y-5 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'var(--color-warning-light)', color: 'var(--color-warning)' }}>
              <Lightbulb size={20} />
            </div>
            <h3 className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>Gợi ý nghề nghiệp</h3>
          </div>
          <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Dựa trên năng lực, AI đề xuất cấu trúc chức danh:
          </p>
          
          <div className="flex flex-col gap-3">
            {[
              { id: 1, title: 'Product-oriented Engineer', color: 'var(--color-info)', bg: 'var(--color-info-light)' },
              { id: 2, title: 'Backend Intern', color: 'var(--color-success)', bg: 'var(--color-success-light)' },
              { id: 3, title: 'QA Automation', color: 'var(--color-warning)', bg: 'var(--color-warning-light)' },
            ].map(j => (
              <div key={j.id} className="flex items-center gap-3 p-3 rounded-xl border transition-all hover:-translate-y-0.5" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-black text-xs" style={{ background: j.bg, color: j.color }}>{j.id}</span>
                <span className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{j.title}</span>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>

      {/* AI Insights Card */}
      <SurfaceCard className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}>
                <Sparkles size={20} />
              </div>
              <h3 className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>Góc nhìn AI (Insights)</h3>
            </div>
            <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              Bạn đặc biệt <span className="font-bold" style={{ color: 'var(--color-primary)' }}>phù hợp với các môi trường cực kì linh hoạt </span>
              và có nhịp độ phát hành sản phẩm liên tục. Để cạnh tranh với ứng viên Senior, hãy rèn giũa thêm cách 
              <span className="font-bold border-b border-dashed ml-1 pb-0.5">định lượng hoá khối lượng công việc</span> của bạn.
            </p>
          </div>
          
          <div className="shrink-0 w-full md:w-auto">
            <Link to="/culture/tests">
              <Button variant="primary" className="w-full md:w-auto h-14 px-8 font-bold text-sm shadow-md">
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
