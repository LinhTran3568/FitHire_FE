import { Badge, Button, SurfaceCard } from '@components/ui';
import { BookmarkPlus, Sparkles, BrainCircuit, ExternalLink, Target, CheckCircle2 } from 'lucide-react';
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
      level: 'Mức độ phù hợp cực cao (High Fit)',
      color: 'var(--color-success)',
      bg: 'var(--color-success-light)',
      textClass: 'text-emerald-700 dark:text-emerald-400',
      text: 'Bạn có xu hướng làm chủ công việc cực cao, khả năng hợp tác xuyên chức năng vượt trội và thích nghi siêu nhanh trong mọi biến số. Bộ hồ sơ của bạn lọt top những ứng viên săn lùng gắt gao cho môi trường đề cao quyền tự trị (autonomy) tuyệt đối và phản hồi liên tục.',
      growth: 'Lời khuyên từ hệ thống: Tập trung trình bày khả năng duy trì tính kỷ luật cá nhân nội tại và các chiến lược định lượng giúp bạn giữ vững phong độ chất lượng dưới sức ép của những deadline bất khả thi.',
    };
  }

  if (avgScore >= 2.5) {
    return {
      level: 'Mức độ phù hợp tiêu chuẩn (Medium Fit)',
      color: 'var(--color-info)',
      bg: 'var(--color-info-light)',
      textClass: 'text-blue-700 dark:text-blue-400',
      text: 'Bạn sở hữu nền tảng làm việc nhóm (teamwork harmony) rất tốt. Tuy nhiên, mức độ hành động độc lập và quyết đoán chưa thật sự nổi bật nếu cấp trên vắng mặt hoặc phải đối mặt với các tình huống cần bạn tự ra quyết định rủi ro.',
      growth: 'Lời khuyên từ hệ thống: Luyện tập cách cấu trúc hóa quan điểm, tập phản biện trực diện và luôn luôn chốt lại buổi họp bằng một bản kế hoạch hành động (Action Plan) của riêng bạn.',
    };
  }

  return {
    level: 'Yêu cầu điểm chạm (Data Needed)',
    color: 'var(--color-warning)',
    bg: 'var(--color-warning-light)',
    textClass: 'text-amber-700 dark:text-amber-400',
    text: 'Dữ liệu sơ bộ chỉ ra bạn đang hành xử rất thận trọng và theo khuôn mẫu chuẩn. Cần thêm bài test chuyên sâu (vd: Định vị Môi trường Mục tiêu) để hệ thống AI Analytics đánh giá đúng bản chất năng lực tiềm ẩn của bạn.',
    growth: 'Lời khuyên từ hệ thống: Ưu tiên bổ sung các tình huống thực tiễn (case study cá nhân) về một dự án thất bại và phân tích sâu sắc cách bạn chuyển đổi thất bại đó thành bài học cho tương lai.',
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

  const testName = result?.testId === 'personality' ? 'Đánh giá Tính cách Cốt lõi' : 
                   result?.testId === 'core-values' ? 'Ma trận Giá trị Cốt lõi' : 
                   result?.testId === 'target-environment' ? 'Kiểm tra Môi trường Mục tiêu' : 'Bài test Tổng hợp';

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500 mx-auto max-w-4xl pb-10">
      
      {/* Header */}
      <SurfaceCard className="relative overflow-hidden !p-10 border-0 shadow-sm" style={{ background: 'var(--color-primary-muted)' }}>
        <div className="relative z-10">
          <Badge variant="primary" className="mb-4">
            <Sparkles size={14} className="mr-1.5" /> BÁO CÁO SAU TEST
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-3" style={{ color: 'var(--color-primary)' }}>
             Kết quả Culture Fit
          </h1>
          <p className="text-base font-medium max-w-lg leading-relaxed" style={{ color: 'var(--color-text)' }}>
             Hệ thống AI Analytics đã diễn dịch lại phản hồi của bạn thành các điểm mạnh hành động và Insight chiến lược.
          </p>
        </div>
      </SurfaceCard>

      <SurfaceCard className="!p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm" style={{ background: summary.bg, color: summary.color }}>
               <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--color-text-subtle)' }}>Nhận xét chuyên sâu từ AI</p>
              <h3 className="text-xl font-black leading-tight" style={{ color: 'var(--color-text)' }}>Báo cáo đánh giá năng lực</h3>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="font-black text-[13px] px-3 py-1 shadow-sm" style={{ borderColor: 'var(--color-border)', color: summary.color, background: summary.bg }}>
               Điểm số: {avgScore}/4.0
            </Badge>
            <Badge variant="default" className="font-semibold px-3 py-1 text-[13px] shadow-sm" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}>
               {testName}
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
           <div className="rounded-2xl border p-6 shadow-sm" style={{ background: summary.bg, borderColor: summary.color }}>
             <p className="text-[14px] font-black mb-3 uppercase tracking-widest flex items-center gap-2" style={{ color: summary.color }}>
                <Target size={18} /> Kết luận chính: {summary.level}
             </p>
             <p className="text-base leading-relaxed font-semibold opacity-90" style={{ color: summary.color }}>
               {summary.text}
             </p>
           </div>

           <div className="rounded-2xl border p-6 flex flex-col sm:flex-row gap-5 items-start" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-raised)' }}>
             <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
               <BrainCircuit size={20} />
             </div>
             <div>
                <p className="text-sm font-black mb-2 uppercase tracking-widest" style={{ color: 'var(--color-text)' }}>Kế hoạch Hành Động (Action Plan)</p>
                <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--color-text-secondary)' }}>{summary.growth}</p>
             </div>
           </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 mt-10 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <Button variant="default" className="w-full md:w-auto h-12 px-6 font-bold shadow-sm rounded-xl">
            <BookmarkPlus size={18} className="mr-2" /> Lưu báo cáo vào CV
          </Button>
          <Link to="/culture/matching" className="w-full md:w-auto flex-1">
            <Button variant="primary" className="w-full h-12 px-8 font-bold rounded-xl shadow-md">
              Mở AI Culture Matching
              <ExternalLink size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </SurfaceCard>
    </div>
  );
}
