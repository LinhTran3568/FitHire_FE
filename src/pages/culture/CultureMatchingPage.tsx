import { Badge, Button, SectionTitle, SurfaceCard } from '@components/ui';
import { cn } from '@lib/utils';
import { Building2, Flame, Medal, RefreshCw, Sparkles, Target } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type CultureId = 'startup' | 'corporate' | 'product' | 'remote';

interface CultureProfile {
  id: CultureId;
  name: string;
  description: string;
  badgeVariant: 'success' | 'info' | 'warning' | 'default';
  barClass: string;
}

interface ScenarioOption {
  id: string;
  title: string;
  detail: string;
  scores: Record<CultureId, number>;
}

interface ScenarioQuestion {
  id: string;
  title: string;
  situation: string;
  options: ScenarioOption[];
}

const cultureProfiles: CultureProfile[] = [
  {
    id: 'startup',
    name: 'Startup năng động',
    description: 'Nhịp làm việc nhanh, ưu tiên thử nghiệm và chủ động chốt hành động.',
    badgeVariant: 'success',
    barClass: 'bg-emerald-500',
  },
  {
    id: 'corporate',
    name: 'Tập đoàn quy củ',
    description: 'Quy trình rõ ràng, phân cấp trách nhiệm và tiêu chuẩn vận hành ổn định.',
    badgeVariant: 'info',
    barClass: 'bg-blue-500',
  },
  {
    id: 'product',
    name: 'Product tập trung kết quả',
    description: 'Ra quyết định dựa trên dữ liệu, cân bằng tốc độ và chất lượng trải nghiệm.',
    badgeVariant: 'warning',
    barClass: 'bg-amber-500',
  },
  {
    id: 'remote',
    name: 'Đội ngũ remote linh hoạt',
    description: 'Tự chủ cao, phối hợp async rõ ràng, giao tiếp có cấu trúc.',
    badgeVariant: 'default',
    barClass: 'bg-slate-500',
  },
];

const scenarioQuestions: ScenarioQuestion[] = [
  {
    id: 'deadline',
    title: 'Tình huống 1: Deadline đột ngột',
    situation:
      'Team nhận yêu cầu từ khách hàng: rút ngắn thời gian giao tính năng còn 1/2 so với kế hoạch.',
    options: [
      {
        id: 'deadline-startup',
        title: 'Chia nhỏ, thử nhanh MVP rồi tối ưu dần',
        detail: 'Ưu tiên triển khai nhanh phần cốt lõi để lấy phản hồi thực tế sớm.',
        scores: { startup: 5, corporate: 2, product: 4, remote: 3 },
      },
      {
        id: 'deadline-corporate',
        title: 'Lập lại kế hoạch và xin phê duyệt mốc mới',
        detail: 'Giữ quy trình rõ ràng, quản trị rủi ro trước khi thay đổi phạm vi.',
        scores: { startup: 2, corporate: 5, product: 3, remote: 2 },
      },
      {
        id: 'deadline-remote',
        title: 'Phân task ownership, đồng bộ async theo block',
        detail: 'Mỗi người chịu trách nhiệm một phần rõ ràng, cập nhật tiến độ theo nhịp ngắn.',
        scores: { startup: 3, corporate: 2, product: 4, remote: 5 },
      },
    ],
  },
  {
    id: 'feedback',
    title: 'Tình huống 2: Nhận feedback trái chiều',
    situation: 'Bạn nhận hai luồng góp ý ngược nhau từ PM và Tech Lead về giải pháp kỹ thuật.',
    options: [
      {
        id: 'feedback-product',
        title: 'Đưa dữ liệu đo lường để chọn phương án',
        detail: 'So sánh impact theo business + effort để chốt quyết định minh bạch.',
        scores: { startup: 4, corporate: 3, product: 5, remote: 3 },
      },
      {
        id: 'feedback-corporate',
        title: 'Ưu tiên theo cấp phê duyệt và quy trình hiện hành',
        detail: 'Giảm xung đột bằng cách bám vai trò và cơ chế ra quyết định chuẩn.',
        scores: { startup: 2, corporate: 5, product: 3, remote: 2 },
      },
      {
        id: 'feedback-startup',
        title: 'Đề xuất thử A/B nhỏ để học nhanh',
        detail: 'Chấp nhận thử nghiệm trong phạm vi an toàn để tìm đáp án thực tế nhanh.',
        scores: { startup: 5, corporate: 2, product: 4, remote: 3 },
      },
    ],
  },
  {
    id: 'collaboration',
    title: 'Tình huống 3: Hợp tác liên phòng ban',
    situation: 'Bạn cần phối hợp với Design, QA và DevOps để release tính năng trong tuần này.',
    options: [
      {
        id: 'collab-remote',
        title: 'Thiết lập workspace chung + checklist async',
        detail: 'Chuẩn hóa giao tiếp, ghi rõ owner và deadline từng hạng mục.',
        scores: { startup: 3, corporate: 3, product: 4, remote: 5 },
      },
      {
        id: 'collab-product',
        title: 'Ưu tiên flow tác động lớn đến user trước',
        detail: 'Đồng thuận theo mục tiêu sản phẩm thay vì làm đồng loạt tất cả hạng mục.',
        scores: { startup: 4, corporate: 2, product: 5, remote: 4 },
      },
      {
        id: 'collab-corporate',
        title: 'Đi theo quy trình bàn giao chuẩn của tổ chức',
        detail: 'Giữ sự ổn định và khả năng kiểm soát khi có nhiều bên liên quan.',
        scores: { startup: 2, corporate: 5, product: 3, remote: 2 },
      },
    ],
  },
];

const cultureIds: CultureId[] = ['startup', 'corporate', 'product', 'remote'];

export default function CultureMatchingPage() {
  const [searchParams] = useSearchParams();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const targetJob = searchParams.get('jobId');

  const companyName = useMemo(() => {
    if (!targetJob) return 'Công ty mục tiêu';

    if (targetJob.includes('techify')) return 'Techify Vietnam';
    if (targetJob.includes('nextgen')) return 'NextGen Solutions';
    if (targetJob.includes('finstack')) return 'FinStack';
    if (targetJob.includes('growthlab')) return 'GrowthLab';

    return 'Công ty mục tiêu';
  }, [targetJob]);

  const selectedQuestions = useMemo(
    () => scenarioQuestions.filter(question => Boolean(answers[question.id])),
    [answers],
  );

  const scoreBoard = useMemo(() => {
    const base: Record<CultureId, number> = {
      startup: 0,
      corporate: 0,
      product: 0,
      remote: 0,
    };

    selectedQuestions.forEach(question => {
      const selectedOptionId = answers[question.id];
      const selectedOption = question.options.find(option => option.id === selectedOptionId);
      if (!selectedOption) return;

      cultureIds.forEach(cultureId => {
        base[cultureId] += selectedOption.scores[cultureId];
      });
    });

    return base;
  }, [answers, selectedQuestions]);

  const ranking = useMemo(() => {
    const maxByCulture: Record<CultureId, number> = {
      startup: 0,
      corporate: 0,
      product: 0,
      remote: 0,
    };

    selectedQuestions.forEach(question => {
      cultureIds.forEach(cultureId => {
        const questionMax = Math.max(...question.options.map(option => option.scores[cultureId]));
        maxByCulture[cultureId] += questionMax;
      });
    });

    return cultureProfiles
      .map(profile => {
        const maxScore = maxByCulture[profile.id];
        const rawScore = scoreBoard[profile.id];
        const percentage = maxScore === 0 ? 0 : Math.round((rawScore / maxScore) * 100);

        return {
          ...profile,
          rawScore,
          percentage,
        };
      })
      .sort((a, b) => b.percentage - a.percentage);
  }, [scoreBoard, selectedQuestions]);

  const completion = Math.round((selectedQuestions.length / scenarioQuestions.length) * 100);
  const canSubmit = selectedQuestions.length === scenarioQuestions.length;
  const topMatch = ranking[0];

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));

    // Nếu đã submit mà người dùng đổi đáp án, yêu cầu submit lại để chốt kết quả mới.
    if (isSubmitted) {
      setIsSubmitted(false);
      setSubmittedAt(null);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
    setSubmittedAt(null);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    setIsSubmitted(true);
    setSubmittedAt(new Date().toLocaleString('vi-VN'));
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Khảo sát & Đánh giá Văn hóa"
        subtitle="Chọn cách xử lý theo thói quen làm việc của bạn. Hệ thống sẽ xếp hạng kiểu văn hóa doanh nghiệp tương thích cao nhất."
        action={<Badge variant="info">Mục tiêu: {companyName}</Badge>}
      />

      <SurfaceCard className="overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4 bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">
            <div className="flex items-center gap-2">
              <Flame size={18} />
              <p className="text-sm font-semibold tracking-wide uppercase">Culture Quest</p>
            </div>
            <p className="text-sm text-blue-100">
              Hoàn thành các thẻ tình huống để mở khóa kết quả phù hợp văn hóa của bạn.
            </p>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Tiến độ khảo sát</span>
                <span className="font-semibold">{completion}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/25">
                <div className="h-full rounded-full bg-white" style={{ width: `${completion}%` }} />
              </div>
            </div>
          </div>

          <div className="space-y-4 p-5">
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">
                Đã trả lời: {selectedQuestions.length}/{scenarioQuestions.length}
              </Badge>
              <Badge variant="warning">Chuỗi hiện tại: {selectedQuestions.length} thẻ</Badge>
              {isSubmitted ? <Badge variant="info">Đã submit</Badge> : <Badge>Chưa submit</Badge>}
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Ngữ cảnh đánh giá</p>
              <p className="mt-1">Vị trí mục tiêu: {targetJob ?? 'Chưa chọn từ trang việc làm'}</p>
              <div className="mt-2 flex items-center gap-2 text-slate-500">
                <Building2 size={15} />
                <span>{companyName}</span>
              </div>
            </div>
          </div>
        </div>
      </SurfaceCard>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          {scenarioQuestions.map((question, questionIndex) => {
            const selectedOptionId = answers[question.id];

            return (
              <SurfaceCard key={question.id} className="space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
                      Thẻ tình huống #{questionIndex + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">{question.title}</h3>
                  </div>
                  {selectedOptionId ? (
                    <Badge variant="success">Đã chọn</Badge>
                  ) : (
                    <Badge>Chưa chọn</Badge>
                  )}
                </div>

                <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  {question.situation}
                </p>

                <div className="space-y-3">
                  {question.options.map(option => {
                    const isSelected = option.id === selectedOptionId;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleSelectOption(question.id, option.id)}
                        className={cn(
                          'w-full rounded-xl border p-3 text-left transition',
                          isSelected
                            ? 'border-blue-600 bg-blue-50 shadow-sm shadow-blue-100'
                            : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/40',
                        )}
                      >
                        <p className="text-sm font-semibold text-slate-900">{option.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{option.detail}</p>
                      </button>
                    );
                  })}
                </div>
              </SurfaceCard>
            );
          })}

          <SurfaceCard className="space-y-3">
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Button size="sm" onClick={handleSubmit} disabled={!canSubmit}>
                <Sparkles size={15} />
                <span>Submit để xem kết quả</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RefreshCw size={15} />
                <span>Làm lại khảo sát</span>
              </Button>
            </div>

            {isSubmitted && submittedAt && (
              <p className="text-right text-xs text-slate-500">Thời điểm submit: {submittedAt}</p>
            )}
          </SurfaceCard>
        </div>

        <div className="space-y-4">
          <SurfaceCard className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900">
              <Medal size={18} />
              <h3 className="text-lg font-semibold">Kết quả phù hợp văn hóa</h3>
            </div>

            {!isSubmitted ? (
              <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                Kết quả cuối sẽ xuất hiện sau khi bạn hoàn thành toàn bộ thẻ tình huống và bấm{' '}
                <span className="font-semibold">Submit để xem kết quả</span>.
              </p>
            ) : (
              <div className="space-y-3">
                {topMatch && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex items-center gap-2">
                      <Sparkles size={17} className="text-emerald-600" />
                      <p className="text-sm font-semibold text-emerald-700">
                        Mức tương thích cao nhất
                      </p>
                    </div>
                    <p className="mt-1 text-base font-semibold text-slate-900">{topMatch.name}</p>
                    <p className="mt-1 text-sm text-slate-700">{topMatch.description}</p>
                    <p className="mt-2 text-sm font-medium text-emerald-700">
                      Độ tương thích: {topMatch.percentage}%
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  {ranking.map(profile => (
                    <div key={profile.id} className="rounded-xl border border-slate-200 p-3">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Target size={15} className="text-slate-400" />
                          <p className="text-sm font-semibold text-slate-900">{profile.name}</p>
                        </div>
                        <Badge variant={profile.badgeVariant}>{profile.percentage}%</Badge>
                      </div>

                      <div className="h-2 rounded-full bg-slate-200">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all duration-500',
                            profile.barClass,
                          )}
                          style={{ width: `${profile.percentage}%` }}
                        />
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        {profile.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SurfaceCard>

          <SurfaceCard className="space-y-2">
            <h4 className="font-semibold text-slate-900">Gợi ý hành động</h4>
            <p className="text-sm text-slate-700">
              Dùng kết quả top 1 + top 2 để ưu tiên công ty phù hợp phong cách làm việc, rồi quay
              lại trang việc làm để lọc JD theo mức độ tương thích.
            </p>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}
