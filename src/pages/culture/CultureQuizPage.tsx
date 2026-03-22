import { Button, SurfaceCard, Badge } from '@components/ui';
import { ArrowLeft, ArrowRight, Activity, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface QuizQuestion {
  id: string;
  scenario: string;
}

const QUESTION_BANK: Record<string, QuizQuestion[]> = {
  personality: [
    {
      id: 'p1',
      scenario:
        'Khi bắt đầu một dự án mới, bạn thường chủ động đề xuất cách làm ngay từ đầu thay vì đợi phân công chi tiết.',
    },
    {
      id: 'p2',
      scenario:
        'Bạn cảm thấy thoải mái và tràn đầy năng lượng khi thuyết trình ý tưởng trước nhóm đông người.',
    },
    {
      id: 'p3',
      scenario:
        'Bạn ưu tiên hoàn thành kế hoạch đã đặt ra hơn là xử lý việc phát sinh tức thời làm đảo lộn quy trình.',
    },
    {
      id: 'p4',
      scenario:
        'Bạn thường nhìn vấn đề theo dữ liệu định lượng trước khi đưa ra bất kỳ quyết định cảm tính nào.',
    },
    {
      id: 'p5',
      scenario:
        'Bạn thích môi trường có tần suất phản hồi nhanh (feedback loop) liên tục để cải thiện bản thân.',
    },
  ],
  'core-values': [
    {
      id: 'v1',
      scenario:
        'Bạn sẵn sàng nhận mức lương thấp hơn để đổi lấy mentor xịn và cơ hội học tập tăng tốc.',
    },
    {
      id: 'v2',
      scenario:
        'Bạn ưu tiên công việc có lộ trình thăng tiến rõ ràng trong 1-2 năm tới thay vì chức danh sáo rỗng.',
    },
    {
      id: 'v3',
      scenario:
        'Bạn xem sự cân bằng Work-life Balance là yếu tố bắt buộc khi đưa ra quyết định chọn việc.',
    },
    {
      id: 'v4',
      scenario:
        'Bạn đánh giá cao môi trường minh bạch tuyệt đối và giao tiếp thẳng thắn trong nội bộ đội nhóm.',
    },
    {
      id: 'v5',
      scenario:
        'Bạn sẵn sàng chịu áp lực (stress) cao nếu công việc đó giúp bạn tăng tốc nhảy vọt sự nghiệp.',
    },
  ],
  'target-environment': [
    {
      id: 'e1',
      scenario:
        'Bạn thích làm việc ở nơi mọi người (kể cả intern) có thể ra quyết định nhanh mà không qua nhiều cấp duyệt.',
    },
    {
      id: 'e2',
      scenario:
        'Bạn thấy yên tâm và an toàn hơn khi công ty có quy trình rõ ràng và tài liệu (documentation) đầy đủ.',
    },
    {
      id: 'e3',
      scenario:
        'Bạn thoải mái khi làm việc đa nhiệm, ưu tiên thay đổi linh hoạt theo tình huống (agile).',
    },
    {
      id: 'e4',
      scenario:
        'Bạn muốn nhận phản hồi trực diện thẳng thắn từ quản lý mỗi tuần để cải thiện hiệu suất ngay lập tức.',
    },
    {
      id: 'e5',
      scenario:
        'Bạn sẵn sàng làm overtime (OT) theo đợt release nếu mục tiêu dự án hấp dẫn và rõ ràng.',
    },
  ],
};

const LIKERT_OPTIONS = ['Rất không đồng ý', 'Không đồng ý', 'Trung lập', 'Đồng ý', 'Rất đồng ý'];

export default function CultureQuizPage() {
  const navigate = useNavigate();
  const { testId = 'personality' } = useParams();

  const questions = QUESTION_BANK[testId] ?? QUESTION_BANK.personality;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const currentQuestion = questions[questionIndex];
  const selectedAnswer = answers[currentQuestion.id];

  const testTitle = useMemo(() => {
    if (testId === 'personality') return 'Culture: Tính Cách (Personality)';
    if (testId === 'core-values') return 'Culture: Giá Trị Cốt Lõi';
    if (testId === 'target-environment') return 'Culture: Môi Trường Mục Tiêu';
    return 'Khảo sát Culture Fit';
  }, [testId]);

  const progress = Math.round(((questionIndex + 1) / questions.length) * 100);

  const goBack = () => {
    if (questionIndex > 0) setQuestionIndex(prev => prev - 1);
  };

  const goNext = () => {
    if (selectedAnswer === undefined) return;
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
      return;
    }
    const total = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const avgScore = Number((total / questions.length).toFixed(2));
    localStorage.setItem(
      'culture-last-result',
      JSON.stringify({ testId, avgScore, answers, submittedAt: new Date().toISOString() }),
    );
    navigate('/culture/profile');
  };

  return (
    <div className="animate-in fade-in mx-auto max-w-3xl space-y-6 py-4 duration-500">
      {/* Premium Minimal Header */}
      <SurfaceCard
        className="relative overflow-hidden border-0 !p-8 text-center shadow-lg"
        style={{ background: 'var(--color-primary-muted)' }}
      >
        <div className="relative z-10 flex flex-col items-center">
          <Badge variant="primary" className="mb-4">
            <Sparkles size={14} className="mr-1.5" /> Assessment
          </Badge>
          <h1
            className="mb-2 text-2xl font-black tracking-tight md:text-4xl"
            style={{ color: 'var(--color-primary)' }}
          >
            {testTitle}
          </h1>
          <p
            className="max-w-lg text-sm leading-relaxed font-medium"
            style={{ color: 'var(--color-text)' }}
          >
            Trả lời quyết đoán để thuật toán có thể vạch ra bản đồ văn hóa chính xác nhất.
          </p>
        </div>
      </SurfaceCard>

      <SurfaceCard className="!p-8 shadow-sm">
        {/* Progress */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span
              className="flex items-center gap-2 font-bold"
              style={{ color: 'var(--color-text)' }}
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-md border text-xs"
                style={{
                  background: 'var(--color-primary-muted)',
                  color: 'var(--color-primary)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <Activity size={12} />
              </span>
              Câu {questionIndex + 1} / {questions.length}
            </span>
            <span
              className="rounded-md border px-2 py-0.5 font-black"
              style={{
                color: 'var(--color-primary)',
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              {progress}%
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
              className="relative h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'var(--color-primary)' }}
            />
          </div>
        </div>

        {/* Question Area */}
        <div className="mb-8 py-6 text-center">
          <p
            className="mb-3 text-[11px] font-black tracking-widest uppercase"
            style={{ color: 'var(--color-primary)' }}
          >
            CHỦ ĐỀ THẢO LUẬN
          </p>
          <p
            className="mb-4 text-xl leading-relaxed font-bold md:text-2xl"
            style={{ color: 'var(--color-text)' }}
          >
            "{currentQuestion.scenario}"
          </p>
        </div>

        {/* Likert Scale - Clean Minimal */}
        <div className="flex flex-col gap-3">
          {LIKERT_OPTIONS.map((option, optionIndex) => {
            const isSelected = selectedAnswer === optionIndex;

            return (
              <button
                key={option}
                onClick={() => setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIndex }))}
                className="group relative flex min-h-[60px] w-full cursor-pointer items-center gap-4 overflow-hidden rounded-xl border px-6 py-4 text-left transition-all duration-300"
                style={{
                  borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                  background: isSelected ? 'var(--color-primary-muted)' : 'var(--color-surface)',
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.03)' : 'none',
                }}
              >
                <div
                  className={`block flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all`}
                  style={{
                    borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border-strong)',
                    background: isSelected ? 'var(--color-primary)' : 'transparent',
                  }}
                >
                  {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
                </div>

                <span
                  className="block text-[15px] font-bold transition-colors"
                  style={{
                    color: isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  }}
                >
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div
          className="mt-10 flex items-center justify-between border-t pt-6"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <Button
            variant="outline"
            onClick={goBack}
            disabled={questionIndex === 0}
            className="h-12 px-6 font-bold"
          >
            <ArrowLeft size={16} className="mr-2" /> Quay lại
          </Button>

          <Button
            onClick={goNext}
            disabled={selectedAnswer === undefined}
            variant="primary"
            className="h-12 px-8 font-bold shadow-md"
          >
            {questionIndex === questions.length - 1 ? 'Hoàn tất' : 'Câu tiếp theo'}
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </SurfaceCard>
    </div>
  );
}
