import { Button, ScoreCard, SectionTitle, SurfaceCard } from '@components/ui';
import { RotateCcw, Share2 } from 'lucide-react';

const deepDiveRows = [
  {
    youSaid: 'Em có làm teamwork trong dự án môn học.',
    aiSuggest:
      'Trong dự án 5 thành viên, em phụ trách module API, tổ chức sprint review mỗi tuần và hoàn thành 100% task đúng hạn.',
  },
  {
    youSaid: 'Em thích học công nghệ mới.',
    aiSuggest:
      'Trong 2 tuần, em tự học Docker và triển khai thành công hệ thống gồm 3 services trên môi trường staging.',
  },
  {
    youSaid: 'Em chịu được áp lực công việc.',
    aiSuggest:
      'Khi deadline rút ngắn 30%, em ưu tiên task theo impact, phối hợp nhóm và vẫn đảm bảo chất lượng test coverage > 80%.',
  },
];

export default function EvaluationReportPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title="Evaluation Report"
        subtitle="Tổng kết buổi phỏng vấn và gợi ý nâng cấp câu trả lời cho lần luyện tiếp theo."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <ScoreCard label="Kiến thức chuyên môn" score={84} />
        <ScoreCard label="Kỹ năng mềm" score={79} />
        <ScoreCard label="Độ tự tin" score={82} />
      </div>

      <SurfaceCard className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Deep Dive: Bạn nói vs AI khuyên nên nói
        </h3>
        <div className="space-y-3">
          {deepDiveRows.map((row, index) => (
            <div
              key={row.youSaid}
              className="grid gap-3 rounded-xl border border-slate-200 p-4 lg:grid-cols-2"
            >
              <div>
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Bạn nói
                </p>
                <p className="mt-2 text-sm text-slate-700">{row.youSaid}</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
                  AI khuyên nên nói
                </p>
                <p className="mt-2 text-sm text-slate-800">{row.aiSuggest}</p>
              </div>
              <p className="text-xs text-slate-400">Case #{index + 1}</p>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard>
        <h3 className="text-lg font-semibold text-slate-900">Culture Fit</h3>
        <p className="mt-1 text-sm text-slate-500">
          Mức độ khớp giữa phong cách của bạn và môi trường công ty trong JD.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-700">Startup năng động</span>
              <span className="font-medium text-slate-900">88%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200">
              <div className="h-full w-[88%] rounded-full bg-blue-600" />
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-700">Tập đoàn quy trình</span>
              <span className="font-medium text-slate-900">66%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200">
              <div className="h-full w-[66%] rounded-full bg-indigo-500" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button>
            <RotateCcw size={16} />
            <span>Luyện tập lại câu hỏi này</span>
          </Button>
          <Button variant="outline">
            <Share2 size={16} />
            <span>Chia sẻ kết quả lên LinkedIn</span>
          </Button>
        </div>
      </SurfaceCard>
    </div>
  );
}
