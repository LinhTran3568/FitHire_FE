import { Badge, Button, SectionTitle, SurfaceCard } from '@components/ui';
import { Brain, Building2, HeartHandshake, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const testCards = [
  {
    id: 'personality',
    title: 'Test tính cách (MBTI / Big Five)',
    duration: '5 phút',
    participants: '2.340',
    icon: Brain,
    summary: 'Hiểu rõ điểm mạnh, cách ra quyết định và phong cách làm việc của bạn.',
  },
  {
    id: 'core-values',
    title: 'Test giá trị cốt lõi',
    duration: '4 phút',
    participants: '1.920',
    icon: HeartHandshake,
    summary: 'Xác định ưu tiên: lương thưởng, cơ hội phát triển hay cân bằng cuộc sống.',
  },
  {
    id: 'target-environment',
    title: 'Test môi trường mục tiêu',
    duration: '6 phút',
    participants: '1.540',
    icon: Building2,
    summary: 'Bạn hợp startup năng động hay doanh nghiệp quy trình rõ ràng.',
  },
] as const;

export default function CultureTestLibraryPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title="Thư viện bài test"
        subtitle="Chọn bài test phù hợp để hiểu bản thân và tăng độ chính xác khi matching với công ty."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {testCards.map(test => {
          const Icon = test.icon;

          return (
            <SurfaceCard key={test.id} className="flex h-full flex-col justify-between gap-4">
              <div>
                <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{test.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{test.summary}</p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="info">{test.duration}</Badge>
                  <Badge variant="default">{test.participants} đã tham gia</Badge>
                </div>

                <Link to={`/culture/tests/${test.id}`}>
                  <Button className="w-full">
                    <PlayCircle size={16} />
                    <span>Bắt đầu bài test</span>
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
