import { Button, SectionTitle, SurfaceCard } from '@components/ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
      scenario: 'Khi bắt đầu một dự án mới, bạn thường chủ động đề xuất cách làm ngay từ đầu.',
    },
    {
      id: 'p2',
      scenario: 'Bạn cảm thấy thoải mái khi thuyết trình ý tưởng trước nhóm đông người.',
    },
    {
      id: 'p3',
      scenario: 'Bạn ưu tiên hoàn thành kế hoạch đã đặt ra hơn là xử lý việc phát sinh tức thời.',
    },
    {
      id: 'p4',
      scenario: 'Bạn thường nhìn vấn đề theo dữ liệu trước khi đưa ra quyết định.',
    },
    {
      id: 'p5',
      scenario: 'Bạn thích môi trường có phản hồi nhanh và liên tục để cải thiện bản thân.',
    },
  ],
  'core-values': [
    {
      id: 'v1',
      scenario: 'Bạn sẵn sàng nhận mức lương thấp hơn để đổi lấy mentor tốt và cơ hội học nhanh.',
    },
    {
      id: 'v2',
      scenario: 'Bạn ưu tiên công việc có lộ trình thăng tiến rõ ràng trong 1-2 năm tới.',
    },
    {
      id: 'v3',
      scenario: 'Bạn xem cân bằng công việc - cuộc sống là yếu tố bắt buộc khi chọn việc.',
    },
    {
      id: 'v4',
      scenario: 'Bạn đánh giá cao môi trường minh bạch và giao tiếp thẳng thắn trong đội nhóm.',
    },
    {
      id: 'v5',
      scenario: 'Bạn sẵn sàng chịu áp lực cao nếu công việc giúp tăng tốc sự nghiệp.',
    },
  ],
  'target-environment': [
    {
      id: 'e1',
      scenario: 'Bạn thích làm việc ở nơi mọi người có thể ra quyết định nhanh mà không qua nhiều cấp duyệt.',
    },
    {
      id: 'e2',
      scenario: 'Bạn thấy yên tâm khi công ty có quy trình rõ ràng và tài liệu đầy đủ.',
    },
    {
      id: 'e3',
      scenario: 'Bạn thoải mái khi làm việc đa nhiệm, ưu tiên thay đổi theo tình huống.',
    },
    {
      id: 'e4',
      scenario: 'Bạn muốn nhận phản hồi trực diện từ quản lý mỗi tuần để cải thiện hiệu suất.',
    },
    {
      id: 'e5',
      scenario: 'Bạn sẵn sàng làm overtime theo đợt release nếu mục tiêu dự án rõ ràng.',
    },
  ],
};

const LIKERT_OPTIONS = [
  'Rất không đồng ý',
  'Không đồng ý',
  'Trung lập',
  'Đồng ý',
  'Rất đồng ý',
] as const;

export default function CultureQuizPage() {
  const navigate = useNavigate();
  const { testId = 'personality' } = useParams();

  const questions = QUESTION_BANK[testId] ?? QUESTION_BANK.personality;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const currentQuestion = questions[questionIndex];
  const selectedAnswer = answers[currentQuestion.id];

  const testTitle = useMemo(() => {
    if (testId === 'personality') return 'Quiz: Tính cách';
    if (testId === 'core-values') return 'Quiz: Giá trị cốt lõi';
    if (testId === 'target-environment') return 'Quiz: Môi trường mục tiêu';
    return 'Quiz: Culture Fit';
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
      JSON.stringify({
        testId,
        avgScore,
        answers,
        submittedAt: new Date().toISOString(),
      }),
    );

    navigate('/culture/profile');
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        title={testTitle}
        subtitle="Trả lời đầy đủ từng câu hỏi để AI phân tích chính xác hồ sơ văn hóa của bạn."
      />

      <SurfaceCard className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">
              Câu {questionIndex + 1}/{questions.length}
            </span>
            <span className="font-semibold text-blue-600">{progress}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Câu hỏi tình huống</p>
          <p className="mt-3 text-lg leading-relaxed text-slate-900">{currentQuestion.scenario}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {LIKERT_OPTIONS.map((option, optionIndex) => {
            const isSelected = selectedAnswer === optionIndex;

            return (
              <button
                key={option}
                onClick={() =>
                  setAnswers(prev => ({
                    ...prev,
                    [currentQuestion.id]: optionIndex,
                  }))
                }
                className={[
                  'min-h-14 rounded-xl border px-4 py-3 text-left text-sm font-medium transition',
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50/40',
                ].join(' ')}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-4">
          <Button variant="outline" onClick={goBack} disabled={questionIndex === 0}>
            <ArrowLeft size={16} />
            <span>Quay lại</span>
          </Button>

          <Button onClick={goNext} disabled={selectedAnswer === undefined}>
            <span>{questionIndex === questions.length - 1 ? 'Nộp bài test' : 'Câu tiếp theo'}</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      </SurfaceCard>
    </div>
  );
}
