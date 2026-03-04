import { Badge, Button, SectionTitle, SurfaceCard } from '@components/ui';
import { BookmarkPlus, Sparkles } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

interface StoredCultureResult {
  testId: string;
  avgScore: number;
  submittedAt: string;
}

function getAiSummary(avgScore: number) {
  if (avgScore >= 3.5) {
    return {
      level: 'Mức phù hợp cao',
      text: 'Bạn có xu hướng chủ động, hợp tác tốt và thích nghi nhanh. Hồ sơ phù hợp với môi trường đề cao ownership và phản hồi liên tục.',
      growth: 'Tập trung tăng tính kỷ luật cá nhân khi làm việc dưới áp lực deadline.',
    };
  }

  if (avgScore >= 2.5) {
    return {
      level: 'Mức phù hợp trung bình',
      text: 'Bạn có nền tảng hợp tác ổn, nhưng mức độ chủ động và quyết đoán chưa thật sự nổi bật trong các bối cảnh áp lực cao.',
      growth: 'Nên luyện cách trình bày quan điểm rõ ràng và chốt hành động cụ thể.',
    };
  }

  return {
    level: 'Cần thêm dữ liệu',
    text: 'Kết quả hiện tại cho thấy bạn đang thận trọng trong cách làm việc. Cần thêm bài test và phản hồi thực tế để AI đánh giá chính xác hơn.',
    growth: 'Ưu tiên bổ sung ví dụ thực tế về dự án và cách xử lý tình huống khó.',
  };
}

export default function CultureProfilePage() {
  const result = useMemo(() => {
    const raw = localStorage.getItem('culture-last-result');
    if (!raw) return null;

    try {
      return JSON.parse(raw) as StoredCultureResult;
    } catch {
      return null;
    }
  }, []);

  const avgScore = result?.avgScore ?? 3;
  const summary = getAiSummary(avgScore);

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Kết quả test văn hóa"
        subtitle="Sau khi hoàn thành bài test, hệ thống chỉ hiển thị nhận xét AI để bạn dễ hành động ngay."
      />

      <SurfaceCard className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900">Nhận xét từ AI</h3>
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
          <p className="text-sm font-semibold text-blue-700">{summary.level}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{summary.text}</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-800">Điểm cần cải thiện</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{summary.growth}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Điểm trung bình: {avgScore}/4</Badge>
          <Badge variant="info">Bài test: {result?.testId ?? 'chưa xác định'}</Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button>
            <BookmarkPlus size={16} />
            <span>Lưu vào hồ sơ</span>
          </Button>
          <Link to="/culture/matching">
            <Button variant="outline">Đi tới Culture Matching</Button>
          </Link>
        </div>
      </SurfaceCard>
    </div>
  );
}
