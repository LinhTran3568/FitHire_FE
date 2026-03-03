import { Button, SectionTitle, SurfaceCard } from '@components/ui';
import { ArrowLeft, ArrowRight, SkipForward } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    scenario:
      'Dong nghiep cua ban dang gap kho khan va du an sap den han. Ban se lam gi dau tien?',
  },
  {
    id: 'q2',
    scenario:
      'Quan ly giao mot task gap khong nam trong ke hoach. Ban xu ly uu tien nhu the nao?',
  },
  {
    id: 'q3',
    scenario:
      'Nhom co xung dot ve huong trien khai ky thuat. Ban thuong phan ung ra sao?',
  },
  {
    id: 'q4',
    scenario:
      'Cong ty de xuat lam viec overtime 2 tuan lien tiep de kip release. Ban danh gia the nao?',
  },
  {
    id: 'q5',
    scenario:
      'Khi nhan feedback tieu cuc tu reviewer, ban thuong hanh dong nhu the nao?',
  },
] as const;

const LIKERT_OPTIONS = [
  'Rat khong dong y',
  'Khong dong y',
  'Trung lap',
  'Dong y',
  'Rat dong y',
] as const;

const TOTAL_QUESTIONS = 20;

export default function CultureQuizPage() {
  const navigate = useNavigate();
  const { testId } = useParams();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const currentQuestion = QUIZ_QUESTIONS[questionIndex];
  const currentProgress = Math.round(((questionIndex + 1) / TOTAL_QUESTIONS) * 100);
  const selectedAnswer = answers[currentQuestion.id];

  const testTitle = useMemo(() => {
    if (testId === 'personality') return 'Quiz: Tinh cach';
    if (testId === 'core-values') return 'Quiz: Gia tri cot loi';
    if (testId === 'target-environment') return 'Quiz: Moi truong muc tieu';
    return 'Quiz: Culture Fit';
  }, [testId]);

  const goNext = () => {
    if (questionIndex < QUIZ_QUESTIONS.length - 1) {
      setQuestionIndex(prev => prev + 1);
      return;
    }
    navigate('/culture/profile');
  };

  const goBack = () => {
    if (questionIndex > 0) setQuestionIndex(prev => prev - 1);
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        title={testTitle}
        subtitle="Scenario-based test, toi uu cho AI matching voi van hoa doanh nghiep."
      />

      <SurfaceCard className="space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="font-medium text-slate-700">
              Cau {questionIndex + 1}/{TOTAL_QUESTIONS}
            </span>
            <span className="font-semibold text-blue-600">{currentProgress}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Scenario Question
          </p>
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
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={goBack} disabled={questionIndex === 0}>
              <ArrowLeft size={16} />
              <span>Quay lai</span>
            </Button>
            <Button variant="ghost" onClick={goNext}>
              <SkipForward size={16} />
              <span>Bo qua</span>
            </Button>
          </div>

          <Button onClick={goNext}>
            <span>{questionIndex === QUIZ_QUESTIONS.length - 1 ? 'Nop bai test' : 'Cau tiep theo'}</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      </SurfaceCard>
    </div>
  );
}
