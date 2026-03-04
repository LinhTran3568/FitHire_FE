import { Badge, Button, SectionTitle, SurfaceCard } from '@components/ui';
import { sleep } from '@lib/utils';
import {
  AlertCircle,
  Bot,
  CheckCircle2,
  FileUp,
  LoaderCircle,
  Sparkles,
  WandSparkles,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type BuilderTab = 'build' | 'review';
type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

interface CvDraft {
  fullName: string;
  targetRole: string;
  skills: string;
  projects: string;
  achievements: string;
}

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx'];

const initialDraft: CvDraft = {
  fullName: '',
  targetRole: '',
  skills: '',
  projects: '',
  achievements: '',
};

function formatFileSize(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

function getFileExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() ?? '';
}

export default function CvOptimizerPage() {
  const [searchParams] = useSearchParams();
  const activeTab: BuilderTab = searchParams.get('flow') === 'review' ? 'review' : 'build';

  const [draft, setDraft] = useState<CvDraft>(initialDraft);
  const [generatedCv, setGeneratedCv] = useState<string>('');
  const [showBuildValidation, setShowBuildValidation] = useState(false);
  const [buildStatus, setBuildStatus] = useState<AsyncStatus>('idle');
  const [buildError, setBuildError] = useState('');

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [reviewStatus, setReviewStatus] = useState<AsyncStatus>('idle');
  const [reviewError, setReviewError] = useState('');
  const [reviewInsights, setReviewInsights] = useState<string[]>([]);

  const missingFields = useMemo(() => {
    const checks: string[] = [];
    if (!draft.fullName.trim()) checks.push('Họ và tên');
    if (!draft.targetRole.trim()) checks.push('Vị trí mục tiêu');
    if (!draft.skills.trim()) checks.push('Kỹ năng chính');
    if (!draft.projects.trim()) checks.push('Kinh nghiệm / dự án');
    if (!draft.achievements.trim()) checks.push('Thành tựu định lượng');
    return checks;
  }, [draft]);

  const isBuildSubmitting = buildStatus === 'loading';
  const isReviewSubmitting = reviewStatus === 'loading';

  const generateCvWithAi = async () => {
    setShowBuildValidation(true);
    if (missingFields.length > 0) {
      setBuildStatus('error');
      setBuildError('Bạn cần điền đủ các trường bắt buộc trước khi AI tạo CV.');
      return;
    }

    setBuildStatus('loading');
    setBuildError('');

    try {
      await sleep(900);

      const content = [
        `Ứng viên: ${draft.fullName}`,
        `Vị trí ứng tuyển: ${draft.targetRole}`,
        `Kỹ năng nổi bật: ${draft.skills}`,
        `Kinh nghiệm / dự án: ${draft.projects}`,
        `Thành tựu định lượng: ${draft.achievements}`,
        'Tóm tắt AI: Hồ sơ có định hướng rõ ràng, có tiềm năng phù hợp môi trường học nhanh và làm việc theo kết quả.',
      ].join('\n\n');

      setGeneratedCv(content);
      setBuildStatus('success');
    } catch {
      setBuildStatus('error');
      setBuildError('Không thể tạo CV lúc này. Vui lòng thử lại sau ít phút.');
    }
  };

  const onSelectCvFile = (file?: File) => {
    if (!file) return;

    const extension = getFileExtension(file.name);
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setUploadedFile(null);
      setReviewInsights([]);
      setReviewStatus('error');
      setReviewError('Định dạng không hợp lệ. Chỉ hỗ trợ PDF, DOC, DOCX.');
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setUploadedFile(null);
      setReviewInsights([]);
      setReviewStatus('error');
      setReviewError(`File vượt quá ${MAX_FILE_SIZE_MB}MB. Vui lòng chọn file nhỏ hơn.`);
      return;
    }

    setUploadedFile(file);
    setReviewStatus('idle');
    setReviewError('');
    setReviewInsights([]);
  };

  const runCvReview = async () => {
    if (!uploadedFile) {
      setReviewStatus('error');
      setReviewError('Bạn chưa chọn file CV để phân tích.');
      return;
    }

    setReviewStatus('loading');
    setReviewError('');

    try {
      await sleep(900);

      setReviewInsights([
        'Chính tả: “experince” nên sửa thành “experience”.',
        'Ngữ pháp: “I have build API...” nên sửa thành “I have built APIs...”.',
        'Đề xuất: viết thành tựu theo mẫu “hành động + số liệu + kết quả kinh doanh”.',
      ]);
      setReviewStatus('success');
    } catch {
      setReviewStatus('error');
      setReviewError('Không thể phân tích CV lúc này. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        title="CV Studio"
        subtitle="Tạo CV với AI hoặc upload CV hiện có để chatbot rà lỗi chính tả, ngữ pháp và đề xuất cách sửa."
      />

      {activeTab === 'build' && (
        <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
          <SurfaceCard className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">AI hỏi thông tin để tạo CV</h3>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-700">Họ và tên *</span>
                <input
                  value={draft.fullName}
                  onChange={event => setDraft(prev => ({ ...prev, fullName: event.target.value }))}
                  className={`w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500 ${
                    showBuildValidation && !draft.fullName.trim()
                      ? 'border-red-300'
                      : 'border-slate-300'
                  }`}
                  placeholder="Nguyễn Văn A"
                />
              </label>

              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-700">Vị trí mục tiêu *</span>
                <input
                  value={draft.targetRole}
                  onChange={event =>
                    setDraft(prev => ({ ...prev, targetRole: event.target.value }))
                  }
                  className={`w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500 ${
                    showBuildValidation && !draft.targetRole.trim()
                      ? 'border-red-300'
                      : 'border-slate-300'
                  }`}
                  placeholder="Backend Java Intern"
                />
              </label>
            </div>

            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-700">Kỹ năng chính *</span>
              <textarea
                rows={3}
                value={draft.skills}
                onChange={event => setDraft(prev => ({ ...prev, skills: event.target.value }))}
                className={`w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500 ${
                  showBuildValidation && !draft.skills.trim()
                    ? 'border-red-300'
                    : 'border-slate-300'
                }`}
                placeholder="Java, Spring Boot, MySQL, Docker..."
              />
            </label>

            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-700">Kinh nghiệm / dự án *</span>
              <textarea
                rows={4}
                value={draft.projects}
                onChange={event => setDraft(prev => ({ ...prev, projects: event.target.value }))}
                className={`w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500 ${
                  showBuildValidation && !draft.projects.trim()
                    ? 'border-red-300'
                    : 'border-slate-300'
                }`}
                placeholder="Mô tả dự án, vai trò và công nghệ bạn đã dùng..."
              />
            </label>

            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-700">Thành tựu định lượng *</span>
              <textarea
                rows={3}
                value={draft.achievements}
                onChange={event =>
                  setDraft(prev => ({ ...prev, achievements: event.target.value }))
                }
                className={`w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500 ${
                  showBuildValidation && !draft.achievements.trim()
                    ? 'border-red-300'
                    : 'border-slate-300'
                }`}
                placeholder="Ví dụ: giảm thời gian phản hồi API 30%, tăng test coverage lên 85%..."
              />
            </label>

            {buildStatus === 'error' && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="mt-0.5" />
                  <span>{buildError}</span>
                </div>
              </div>
            )}

            {buildStatus === 'loading' && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700">
                <div className="flex items-center gap-2">
                  <LoaderCircle size={16} className="animate-spin" />
                  <span>AI đang tạo CV cho bạn...</span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Button onClick={generateCvWithAi} disabled={isBuildSubmitting}>
                <WandSparkles size={16} />
                <span>{isBuildSubmitting ? 'Đang tạo CV...' : 'AI tự tạo CV'}</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setDraft(initialDraft);
                  setGeneratedCv('');
                  setBuildStatus('idle');
                  setBuildError('');
                  setShowBuildValidation(false);
                }}
              >
                Làm mới biểu mẫu
              </Button>
            </div>

            {buildStatus === 'success' && generatedCv && (
              <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 size={16} />
                  <p className="text-sm font-semibold">AI đã tạo CV thành công</p>
                </div>

                <pre className="text-sm leading-relaxed whitespace-pre-wrap text-slate-800">
                  {generatedCv}
                </pre>

                <div className="flex flex-wrap gap-2">
                  <Link to="/my-cv">
                    <Button size="sm">Lưu vào hồ sơ</Button>
                  </Link>
                  <Link to="/jobs">
                    <Button size="sm" variant="outline">
                      Dùng CV để tìm việc
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </SurfaceCard>

          <SurfaceCard className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900">
              <Bot size={18} className="text-blue-600" />
              <h3 className="font-semibold">Chatbot hướng dẫn</h3>
            </div>

            <p className="text-sm text-slate-700">
              Mình cần bạn cung cấp đủ thông tin sau để tạo CV chất lượng:
            </p>

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
              Gợi ý: luôn viết thành tựu theo cấu trúc{' '}
              <strong>hành động + kết quả + số liệu</strong>.
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
                onChange={event => onSelectCvFile(event.target.files?.[0])}
              />
              <FileUp size={22} className="mx-auto text-blue-600" />
              <p className="mt-2 text-sm text-slate-700">
                Nhấn để upload CV (PDF/DOC/DOCX, tối đa 5MB)
              </p>
              {uploadedFile && (
                <p className="mt-1 text-xs text-slate-500">Đã chọn: {uploadedFile.name}</p>
              )}
            </label>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Xem trước CV
              </p>
              {uploadedFile ? (
                <div className="mt-3 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="font-medium text-slate-900">{uploadedFile.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Dung lượng: {formatFileSize(uploadedFile.size)}
                  </p>
                  <p className="mt-2">
                    Tệp đã sẵn sàng để AI phân tích lỗi chính tả, ngữ pháp và chất lượng diễn đạt.
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500">Chưa có tệp nào được tải lên.</p>
              )}
            </div>

            {reviewStatus === 'error' && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="mt-0.5" />
                  <span>{reviewError}</span>
                </div>
              </div>
            )}

            {reviewStatus === 'loading' && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700">
                <div className="flex items-center gap-2">
                  <LoaderCircle size={16} className="animate-spin" />
                  <span>AI đang đánh giá CV của bạn...</span>
                </div>
              </div>
            )}

            <Button onClick={runCvReview} disabled={!uploadedFile || isReviewSubmitting}>
              <Sparkles size={16} />
              <span>{isReviewSubmitting ? 'Đang phân tích...' : 'Đánh giá lỗi CV bằng AI'}</span>
            </Button>
          </SurfaceCard>

          <SurfaceCard className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900">
              <Bot size={18} className="text-blue-600" />
              <h3 className="font-semibold">Chatbot sửa lỗi CV</h3>
            </div>

            {reviewStatus === 'idle' && (
              <p className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700">
                Upload CV và bấm “Đánh giá lỗi CV bằng AI” để nhận nhận xét chính tả, ngữ pháp và
                cách viết tốt hơn.
              </p>
            )}

            {reviewStatus === 'success' && (
              <>
                <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>AI đã phân tích xong CV của bạn.</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {reviewInsights.map(item => (
                    <div
                      key={item}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700"
                    >
                      {item}
                    </div>
                  ))}

                  <textarea
                    rows={4}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    placeholder="Nhập đoạn bạn muốn AI viết lại..."
                  />
                  <Button size="sm" className="w-full">
                    Gửi yêu cầu viết lại
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link to="/my-cv">
                    <Button size="sm">Lưu bản cập nhật</Button>
                  </Link>
                </div>
              </>
            )}

            {reviewStatus === 'error' && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                Hệ thống chưa xử lý được file hiện tại. Bạn kiểm tra lại định dạng hoặc thử tải file
                khác.
              </p>
            )}
          </SurfaceCard>
        </div>
      )}
    </div>
  );
}
