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
    color: 'var(--color-primary)',
    bg: 'var(--color-primary-muted)',
    summary: 'Hiểu rõ điểm mạnh, cách ra quyết định và phong cách làm việc của bạn.',
  },
  {
    id: 'core-values',
    title: 'Test giá trị cốt lõi (Core Values)',
    duration: '4 phút',
    participants: '1.920',
    icon: HeartHandshake,
    color: 'var(--color-success)',
    bg: 'var(--color-success-light)',
    summary: 'Xác định ưu tiên lõi: lương thưởng, lộ trình nghề nghiệp hay sự cân bằng.',
  },
  {
    id: 'target-environment',
    title: 'Test môi trường mục tiêu',
    duration: '6 phút',
    participants: '1.540',
    icon: Building2,
    color: 'var(--color-info)',
    bg: 'var(--color-info-light)',
    summary: 'Bạn hợp với Startup năng động hay doanh nghiệp có quy trình hệ thống bài bản.',
  },
] as const;

export default function CultureTestLibraryPage() {
  return (
    <div className="animate-in fade-in space-y-6 pb-12 duration-500 lg:space-y-8">
      <SurfaceCard
        className="relative overflow-hidden border-0 !p-10 text-center shadow-sm"
        style={{ background: 'var(--color-primary-muted)' }}
      >
        <div className="relative z-10 flex flex-col items-center">
          <Badge variant="primary" className="mb-4">
            <Sparkles size={14} className="mr-1.5" /> THƯ VIỆN ĐỘC QUYỀN
          </Badge>
          <h1
            className="mb-3 text-3xl leading-tight font-black tracking-tight md:text-5xl"
            style={{ color: 'var(--color-primary)' }}
          >
            Bộ sưu tập <br />
            Culture Tests
          </h1>
          <p
            className="max-w-xl text-sm leading-relaxed font-medium md:text-base"
            style={{ color: 'var(--color-text)' }}
          >
            Hoàn thành chuỗi bài khảo sát ngắn để định hình hồ sơ văn hóa cá nhân. Qua đó, AI sẽ tư
            vấn chính xác nên chọn Ecosystem làm việc nào.
          </p>
        </div>
      </SurfaceCard>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {testCards.map(test => {
          const Icon = test.icon;
          return (
            <SurfaceCard
              key={test.id}
              className="group relative flex cursor-pointer flex-col justify-between overflow-hidden !p-6 transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative z-10 flex-1">
                <div
                  className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-110"
                  style={{ background: test.bg, color: test.color }}
                >
                  <Icon size={26} />
                </div>
                <h3
                  className="text-xl leading-tight font-bold"
                  style={{ color: 'var(--color-text)' }}
                >
                  {test.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed font-medium"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {test.summary}
                </p>
              </div>

              <div className="relative z-10 mt-8 space-y-5">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="default"
                    className="font-semibold"
                    style={{
                      background: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <Clock
                      size={12}
                      className="mr-1.5"
                      style={{ color: 'var(--color-text-subtle)' }}
                    />
                    {test.duration}
                  </Badge>
                  <Badge
                    variant="default"
                    className="font-semibold"
                    style={{
                      background: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <Users
                      size={12}
                      className="mr-1.5"
                      style={{ color: 'var(--color-text-subtle)' }}
                    />
                    {test.participants} lượt test
                  </Badge>
                </div>

                <Link to={`/culture/tests/${test.id}`} className="block">
                  <Button
                    variant="primary"
                    className="h-11 w-full text-sm font-bold shadow-sm transition-all group-hover:shadow-md"
                  >
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
