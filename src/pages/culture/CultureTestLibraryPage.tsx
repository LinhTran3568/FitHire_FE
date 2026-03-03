import { Badge, Button, SectionTitle, SurfaceCard } from '@components/ui';
import { Brain, Building2, HeartHandshake, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const testCards = [
  {
    id: 'personality',
    title: 'Test Tinh cach (MBTI / Big Five)',
    duration: '5 phut',
    participants: '2,340',
    icon: Brain,
    summary: 'Hieu ro diem manh, cach ra quyet dinh va phong cach lam viec cua ban.',
  },
  {
    id: 'core-values',
    title: 'Test Gia tri cot loi',
    duration: '4 phut',
    participants: '1,920',
    icon: HeartHandshake,
    summary: 'Xac dinh uu tien cua ban: luong thuong, thang tien, hay can bang work-life.',
  },
  {
    id: 'target-environment',
    title: 'Test Moi truong muc tieu',
    duration: '6 phut',
    participants: '1,540',
    icon: Building2,
    summary: 'Ban phu hop startup nang dong hay corporation quy trinh ro rang.',
  },
] as const;

export default function CultureTestLibraryPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title="Culture Fit Test Library"
        subtitle="Chon bai test phu hop de hieu ban than va tang do chinh xac khi matching voi cong ty."
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
                  <Badge variant="default">{test.participants} da tham gia</Badge>
                </div>

                <Link to={`/culture/tests/${test.id}`}>
                  <Button className="w-full">
                    <PlayCircle size={16} />
                    <span>Bat dau bai test</span>
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
