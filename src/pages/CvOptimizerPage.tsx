import { Badge, Button, CircularGauge, SectionTitle, SurfaceCard } from '@components/ui';
import { MessageCircleMore, UploadCloud } from 'lucide-react';
import { useState } from 'react';

const missingKeywords = [
  'Microservices',
  'RESTful API',
  'CI/CD',
  'Docker',
  'Unit Testing',
  'System Design',
];

export default function CvOptimizerPage() {
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Smart CV Analyzer"
        subtitle="Tải CV và JD mục tiêu để AI phân tích độ phù hợp theo ATS."
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <SurfaceCard className="space-y-5">
          <h3 className="text-lg font-semibold text-slate-900">Upload & Input</h3>

          <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/30 p-8 text-center transition hover:bg-blue-50">
            <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
            <UploadCloud size={28} className="mx-auto text-blue-600" />
            <p className="mt-3 text-sm font-medium text-slate-700">
              Kéo thả CV PDF/Docx hoặc bấm để tải lên
            </p>
            <p className="mt-1 text-xs text-slate-500">Tối đa 5MB</p>
          </label>

          <div className="space-y-2">
            <label htmlFor="jd-input" className="text-sm font-medium text-slate-700">
              Job Description mục tiêu
            </label>
            <textarea
              id="jd-input"
              rows={10}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm ring-blue-500/20 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4"
              placeholder="Dán link JD hoặc nội dung JD tại đây..."
            />
          </div>

          <Button className="w-full justify-center rounded-xl py-6 text-base">
            Phân tích bằng AI
          </Button>
        </SurfaceCard>

        <SurfaceCard className="space-y-5">
          <h3 className="text-lg font-semibold text-slate-900">Kết quả phân tích</h3>

          <div className="flex justify-center">
            <CircularGauge value={74} label="ATS Score" />
          </div>

          <div>
            <h4 className="font-medium text-slate-800">Cần bổ sung</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {missingKeywords.map(keyword => (
                <Badge key={keyword} variant="warning" className="rounded-md px-2 py-1 text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full rounded-xl border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
            onClick={() => setShowAssistant(prev => !prev)}
          >
            <MessageCircleMore size={16} />
            <span>Sửa CV cùng AI</span>
          </Button>
        </SurfaceCard>
      </div>

      {showAssistant && (
        <div className="fixed right-6 bottom-6 z-50 w-[22rem] rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-semibold text-slate-800">CV Assistant</p>
            <button
              onClick={() => setShowAssistant(false)}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              Đóng
            </button>
          </div>
          <div className="space-y-3 p-4 text-sm text-slate-700">
            <p className="rounded-lg bg-slate-100 p-3">
              Gợi ý: Thay câu "Em biết dùng Java" thành "Thành thạo Java trong xây dựng
              Microservices và RESTful APIs".
            </p>
            <textarea
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              placeholder="Nhập đoạn CV bạn muốn AI viết lại..."
            />
            <Button size="sm" className="w-full">
              Gửi cho AI
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
