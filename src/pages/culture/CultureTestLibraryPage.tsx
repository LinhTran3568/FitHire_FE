import { Badge, Button, SurfaceCard } from '@components/ui';
import { Brain, Building2, HeartHandshake, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const testCards = [
  {
    id: 'personality',
    title: 'Test tính cách (MBTI / Big Five)',
    duration: '5 phút',
    participants: '2.340',
    icon: Brain,
    color: 'var(--color-primary)', bg: 'var(--color-primary-muted)',
    summary: 'Hiểu rõ điểm mạnh, cách ra quyết định và phong cách làm việc của bạn.',
  },
  {
    id: 'core-values',
    title: 'Test giá trị cốt lõi (Core Values)',
    duration: '4 phút',
    participants: '1.920',
    icon: HeartHandshake,
    color: 'var(--color-success)', bg: 'var(--color-success-light)',
    summary: 'Xác định ưu tiên lõi: lương thưởng, lộ trình nghề nghiệp hay sự cân bằng.',
  },
  {
    id: 'target-environment',
    title: 'Test môi trường mục tiêu',
    duration: '6 phút',
    participants: '1.540',
    icon: Building2,
    color: 'var(--color-info)', bg: 'var(--color-info-light)',
    summary: 'Bạn hợp với Startup năng động hay doanh nghiệp có quy trình hệ thống bài bản.',
  },
] as const;

export default function CultureTestLibraryPage() {
  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-12">
      <SurfaceCard className="relative overflow-hidden !p-10 border-0 shadow-sm text-center" style={{ background: 'var(--color-primary-muted)' }}>
        <div className="relative z-10 flex flex-col items-center">
          <Badge variant="primary" className="mb-4">
            <Sparkles size={14} className="mr-1.5" /> THƯ VIỆN ĐỘC QUYỀN
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-3" style={{ color: 'var(--color-primary)' }}>
            Bộ sưu tập <br />Culture Tests
          </h1>
          <p className="text-sm md:text-base max-w-xl leading-relaxed font-medium" style={{ color: 'var(--color-text)' }}>
            Hoàn thành chuỗi bài khảo sát ngắn để định hình hồ sơ văn hóa cá nhân. 
            Qua đó, AI sẽ tư vấn chính xác nên chọn Ecosystem làm việc nào.
          </p>
        </div>
      </SurfaceCard>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {testCards.map(test => {
          const Icon = test.icon;
          return (
            <SurfaceCard key={test.id} className="group relative overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-md !p-6 cursor-pointer">
              <div className="flex-1 relative z-10">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-110" style={{ background: test.bg, color: test.color }}>
                  <Icon size={26} />
                </div>
                <h3 className="text-xl font-bold leading-tight" style={{ color: 'var(--color-text)' }}>
                  {test.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  {test.summary}
                </p>
              </div>

              <div className="mt-8 space-y-5 relative z-10">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default" className="font-semibold" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                    <Clock size={12} className="mr-1.5" style={{ color: 'var(--color-text-subtle)' }} />
                    {test.duration}
                  </Badge>
                  <Badge variant="default" className="font-semibold" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                    <Users size={12} className="mr-1.5" style={{ color: 'var(--color-text-subtle)' }} />
                    {test.participants} lượt test
                  </Badge>
                </div>

                <Link to={`/culture/tests/${test.id}`} className="block">
                  <Button variant="primary" className="w-full h-11 font-bold text-sm shadow-sm group-hover:shadow-md transition-all">
                    Bắt đầu bài test
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </SurfaceCard>
          );
        })}
      </div>
    </div>
  );
}
