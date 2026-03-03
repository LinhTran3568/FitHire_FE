import { Badge, Button, SectionTitle, SurfaceCard } from '@components/ui';
import { Link, useParams } from 'react-router-dom';

const candidateRecords = {
  'minh-nguyen': {
    name: 'Minh Nguyen',
    cvScore: 81,
    interviewScore: 84,
    cultureFit: 88,
    summary:
      'Minh có nền tảng Java backend tốt, trả lời có cấu trúc và thể hiện tư duy giải quyết vấn đề rõ ràng. Ứng viên phù hợp môi trường startup vì chủ động học nhanh và thích làm sản phẩm. Cần cải thiện thêm cách trình bày kết quả định lượng trong phần kinh nghiệm.',
  },
  'trang-le': {
    name: 'Trang Le',
    cvScore: 77,
    interviewScore: 79,
    cultureFit: 82,
    summary:
      'Trang có khả năng giao tiếp tốt và hiểu yêu cầu nghiệp vụ nhanh. Câu trả lời phỏng vấn ổn định, thể hiện thái độ hợp tác tích cực. Nên tăng chiều sâu kỹ thuật ở các câu hỏi về tối ưu hệ thống.',
  },
  'huy-tran': {
    name: 'Huy Tran',
    cvScore: 74,
    interviewScore: 72,
    cultureFit: 68,
    summary:
      'Huy có kỹ năng kỹ thuật cơ bản nhưng mức độ tự tin chưa ổn định trong buổi phỏng vấn AI. Cần luyện thêm cách trình bày theo mô hình STAR và ví dụ thực tế. Mức phù hợp văn hóa ở ngưỡng trung bình.',
  },
  'linh-pham': {
    name: 'Linh Pham',
    cvScore: 86,
    interviewScore: 90,
    cultureFit: 91,
    summary:
      'Linh thể hiện kiến thức full-stack tốt, có kinh nghiệm thực chiến rõ ràng và giao tiếp mạch lạc. Ứng viên có tư duy ownership cao, phù hợp môi trường làm việc linh hoạt. Có thể ưu tiên vào nhóm shortlist.',
  },
} as const;

export default function HrCandidateDetailPage() {
  const { candidateId } = useParams();
  const candidate = candidateId
    ? candidateRecords[candidateId as keyof typeof candidateRecords]
    : null;

  if (!candidate) {
    return (
      <SurfaceCard>
        <p className="text-slate-700">Không tìm thấy ứng viên.</p>
        <Link to="/hr/candidates" className="mt-3 inline-block text-blue-600 hover:text-blue-700">
          Quay lại danh sách
        </Link>
      </SurfaceCard>
    );
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title={`Hồ sơ ứng viên: ${candidate.name}`}
        subtitle="Tóm tắt năng lực tự động bởi AI để HR đánh giá nhanh."
        action={
          <Link to="/hr/candidates">
            <Button variant="ghost" size="sm">
              Quay lại danh sách
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <SurfaceCard>
          <p className="text-sm text-slate-500">Điểm CV</p>
          <p className="mt-1 text-3xl font-semibold text-slate-900">{candidate.cvScore}</p>
        </SurfaceCard>
        <SurfaceCard>
          <p className="text-sm text-slate-500">Điểm Phỏng vấn AI</p>
          <p className="mt-1 text-3xl font-semibold text-slate-900">{candidate.interviewScore}</p>
        </SurfaceCard>
        <SurfaceCard>
          <p className="text-sm text-slate-500">Culture Fit</p>
          <div className="mt-2">
            <Badge variant={candidate.cultureFit > 80 ? 'success' : 'warning'}>
              {candidate.cultureFit}%
            </Badge>
          </div>
        </SurfaceCard>
      </div>

      <SurfaceCard className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">AI Summary (3 câu)</h3>
        <p className="leading-relaxed text-slate-700">{candidate.summary}</p>
      </SurfaceCard>
    </div>
  );
}
