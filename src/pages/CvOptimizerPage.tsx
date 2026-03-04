import { Badge, Button, SectionTitle, SurfaceCard } from '@components/ui';
import { Bot, FileUp, Sparkles, WandSparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type BuilderTab = 'build' | 'review';

interface CvDraft {
  fullName: string;
  targetRole: string;
  skills: string;
  projects: string;
  achievements: string;
}

const initialDraft: CvDraft = {
  fullName: '',
  targetRole: '',
  skills: '',
  projects: '',
  achievements: '',
};

export default function CvOptimizerPage() {
  const [searchParams] = useSearchParams();
  const activeTab: BuilderTab = searchParams.get('flow') === 'review' ? 'review' : 'build';

  const [draft, setDraft] = useState<CvDraft>(initialDraft);
  const [generatedCv, setGeneratedCv] = useState<string>('');

  const [uploadedFileName, setUploadedFileName] = useState('');
  const [reviewReady, setReviewReady] = useState(false);

  const missingFields = useMemo(() => {
    const checks: string[] = [];
    if (!draft.fullName) checks.push('Họ và tên');
    if (!draft.targetRole) checks.push('Vị trí mục tiêu');
    if (!draft.skills) checks.push('Kỹ năng chính');
    if (!draft.projects) checks.push('Kinh nghiệm / dự án');
    if (!draft.achievements) checks.push('Thành tựu định lượng');
    return checks;
  }, [draft]);

  const generateCvWithAi = () => {
    const content = [
      `Ứng viên: ${draft.fullName || 'Chưa cung cấp tên'}`,
      `Vị trí ứng tuyển: ${draft.targetRole || 'Chưa chọn vị trí'}`,
      `Kỹ năng nổi bật: ${draft.skills || 'Cần bổ sung'}`,
      `Kinh nghiệm / dự án: ${draft.projects || 'Cần bổ sung'}`,
      `Thành tựu: ${draft.achievements || 'Cần bổ sung số liệu định lượng'}`,
      'Tóm tắt AI: Ứng viên phù hợp môi trường học nhanh, có khả năng phối hợp nhóm và tư duy giải quyết vấn đề.',
    ].join('\n\n');

    setGeneratedCv(content);
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        title="CV Studio"
        subtitle="Tạo CV với AI hoặc upload CV hiện có để chatbot rà lỗi chính tả, ngữ pháp và đề xuất cách sửa."
      />

      <SurfaceCard className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-slate-600">
          Chọn luồng từ menu <span className="font-semibold text-slate-800">Tạo CV</span> trên thanh
          điều hướng.
        </p>
        <Badge variant="info">
          {activeTab === 'build' ? 'Đang mở: Luồng 1 - Tạo CV với AI' : 'Đang mở: Luồng 2 - Upload CV'}
        </Badge>
      </SurfaceCard>

      {activeTab === 'build' && (
        <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
          <SurfaceCard className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">AI hỏi thông tin để tạo CV</h3>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-700">Họ và tên</span>
                <input
                  value={draft.fullName}
                  onChange={event => setDraft(prev => ({ ...prev, fullName: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                  placeholder="Nguyễn Văn A"
                />
              </label>

              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-700">Vị trí mục tiêu</span>
                <input
                  value={draft.targetRole}
                  onChange={event => setDraft(prev => ({ ...prev, targetRole: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                  placeholder="Backend Java Intern"
                />
              </label>
            </div>

            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-700">Kỹ năng chính</span>
              <textarea
                rows={3}
                value={draft.skills}
                onChange={event => setDraft(prev => ({ ...prev, skills: event.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                placeholder="Java, Spring Boot, MySQL, Docker..."
              />
            </label>

            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-700">Kinh nghiệm / dự án</span>
              <textarea
                rows={4}
                value={draft.projects}
                onChange={event => setDraft(prev => ({ ...prev, projects: event.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                placeholder="Mô tả dự án, vai trò và công nghệ bạn đã dùng..."
              />
            </label>

            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-700">Thành tựu định lượng</span>
              <textarea
                rows={3}
                value={draft.achievements}
                onChange={event => setDraft(prev => ({ ...prev, achievements: event.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                placeholder="Ví dụ: giảm thời gian phản hồi API 30%, tăng test coverage lên 85%..."
              />
            </label>

            <div className="flex flex-wrap gap-2">
              <Button onClick={generateCvWithAi}>
                <WandSparkles size={16} />
                <span>AI tự tạo CV</span>
              </Button>
              <Button variant="outline" onClick={() => setDraft(initialDraft)}>
                Làm mới biểu mẫu
              </Button>
            </div>

            {generatedCv && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">CV được AI tạo</p>
                <pre className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
                  {generatedCv}
                </pre>
              </div>
            )}
          </SurfaceCard>

          <SurfaceCard className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900">
              <Bot size={18} className="text-blue-600" />
              <h3 className="font-semibold">Chatbot hướng dẫn</h3>
            </div>

            <p className="text-sm text-slate-700">Mình cần bạn cung cấp đủ thông tin sau để tạo CV chất lượng:</p>

            <div className="space-y-2">
              {missingFields.length === 0 ? (
                <Badge variant="success">Bạn đã nhập đủ thông tin cơ bản.</Badge>
              ) : (
                missingFields.map(item => (
                  <div
                    key={item}
                    className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-sm text-amber-800"
                  >
                    Cần bổ sung: {item}
                  </div>
                ))
              )}
            </div>

            <p className="rounded-lg bg-blue-50 p-3 text-sm text-slate-700">
              Gợi ý: luôn viết thành tựu theo cấu trúc <strong>hành động + kết quả + số liệu</strong>.
            </p>
          </SurfaceCard>
        </div>
      )}

      {activeTab === 'review' && (
        <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
          <SurfaceCard className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">CV của tôi</h3>

            <label className="block cursor-pointer rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/40 p-5 text-center">
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={event => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  setUploadedFileName(file.name);
                  setReviewReady(false);
                }}
              />
              <FileUp size={22} className="mx-auto text-blue-600" />
              <p className="mt-2 text-sm text-slate-700">Nhấn để upload CV (PDF/DOC/DOCX)</p>
              {uploadedFileName && (
                <p className="mt-1 text-xs text-slate-500">Đã chọn: {uploadedFileName}</p>
              )}
            </label>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Xem trước CV</p>
              {uploadedFileName ? (
                <div className="mt-3 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="font-medium text-slate-900">{uploadedFileName}</p>
                  <p className="mt-2">
                    Bản xem trước tệp sẽ hiển thị tại đây. Bạn có thể tích hợp PDF viewer thật ở bước backend.
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500">Chưa có tệp nào được tải lên.</p>
              )}
            </div>

            <Button onClick={() => setReviewReady(true)} disabled={!uploadedFileName}>
              <Sparkles size={16} />
              <span>Đánh giá lỗi CV bằng AI</span>
            </Button>
          </SurfaceCard>

          <SurfaceCard className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900">
              <Bot size={18} className="text-blue-600" />
              <h3 className="font-semibold">Chatbot sửa lỗi CV</h3>
            </div>

            {!reviewReady && (
              <p className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700">
                Upload CV và bấm “Đánh giá lỗi CV bằng AI” để nhận nhận xét chính tả, ngữ pháp và cách
                viết tốt hơn.
              </p>
            )}

            {reviewReady && (
              <div className="space-y-2 text-sm">
                <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-red-700">
                  Chính tả: “experince” nên sửa thành “experience”.
                </div>
                <div className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-amber-800">
                  Ngữ pháp: Câu “I have build API...” nên sửa thành “I have built APIs...”.
                </div>
                <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-slate-700">
                  Gợi ý viết lại: “Developed 12 REST APIs, reducing response time by 28%.”
                </div>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                  placeholder="Nhập đoạn bạn muốn AI viết lại..."
                />
                <Button size="sm" className="w-full">
                  Gửi yêu cầu viết lại
                </Button>
              </div>
            )}
          </SurfaceCard>
        </div>
      )}
    </div>
  );
}
