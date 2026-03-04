import { Badge, Button, ChatMessage, SectionTitle, SurfaceCard } from '@components/ui';
import { Camera, Mic, MicOff, SendHorizonal, Video, VideoOff, Waves } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const baseMessages = [
  {
    id: 'm1',
    role: 'assistant' as const,
    text: 'Hãy giới thiệu ngắn gọn về bạn và lý do bạn phù hợp với vị trí này.',
  },
  {
    id: 'm2',
    role: 'assistant' as const,
    text: 'Mô tả một dự án gần đây theo STAR: bối cảnh, nhiệm vụ, hành động và kết quả.',
  },
];

const voiceTips = [
  'Tốc độ nói đề xuất: 120 - 150 từ/phút để dễ nghe.',
  'Giữ âm lượng ổn định, tránh nói quá nhỏ ở cuối câu.',
  'Nhấn giọng ở ý chính: kết quả, số liệu, tác động.',
];

export default function InterviewPage() {
  const [searchParams] = useSearchParams();
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [sessionRunning, setSessionRunning] = useState(false);

  const jobId = searchParams.get('jobId');
  const sessionLabel = useMemo(() => {
    if (!jobId) return 'Mock interview tổng quát';
    return `Mock interview theo JD: ${jobId}`;
  }, [jobId]);

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Luyện phỏng vấn AI"
        subtitle="Phỏng vấn bằng giọng nói + camera, theo dõi biểu cảm và tông giọng theo thời gian thực."
      />

      <SurfaceCard className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="info">{sessionLabel}</Badge>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={sessionRunning ? 'secondary' : 'primary'}
              onClick={() => setSessionRunning(prev => !prev)}
            >
              {sessionRunning ? 'Tạm dừng phiên phỏng vấn' : 'Bắt đầu phiên phỏng vấn'}
            </Button>
            <Button variant="outline" onClick={() => setMicEnabled(prev => !prev)}>
              {micEnabled ? <Mic size={16} /> : <MicOff size={16} />}
              <span>{micEnabled ? 'Mic đang bật' : 'Mic đang tắt'}</span>
            </Button>
            <Button variant="outline" onClick={() => setCameraEnabled(prev => !prev)}>
              {cameraEnabled ? <Video size={16} /> : <VideoOff size={16} />}
              <span>{cameraEnabled ? 'Camera đang bật' : 'Camera đang tắt'}</span>
            </Button>
          </div>
        </div>
      </SurfaceCard>

      <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
        <SurfaceCard className="flex min-h-[38rem] flex-col gap-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Camera</p>
              <div className="mt-3 flex h-40 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-500">
                <Camera size={18} />
                <span className="ml-2 text-sm">
                  {cameraEnabled ? 'Khung hình camera đang hoạt động' : 'Camera hiện đang tắt'}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Âm thanh</p>
              <div className="mt-3 flex h-40 flex-col items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-500">
                <Waves size={20} />
                <p className="mt-2 text-sm">
                  {micEnabled ? 'Đang thu tông giọng và tốc độ nói' : 'Mic đang tắt, chưa phân tích giọng nói'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
            {baseMessages.map(message => (
              <ChatMessage key={message.id} role={message.role} text={message.text} />
            ))}
            <ChatMessage
              role="user"
              text="Em đã tối ưu API phản hồi từ 1.4s xuống 0.9s bằng cách thêm cache cho truy vấn đọc nhiều."
              hint="AI gợi ý: bổ sung tác động business, ví dụ tăng tỉ lệ hoàn tất thao tác của người dùng."
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <textarea
              rows={3}
              className="w-full resize-none bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              placeholder="Nhập câu trả lời hoặc dùng voice để trả lời trực tiếp..."
            />
            <div className="mt-3 flex justify-end">
              <Button size="sm">
                <SendHorizonal size={16} />
                <span>Gửi câu trả lời</span>
              </Button>
            </div>
          </div>
        </SurfaceCard>

        <div className="space-y-5">
          <SurfaceCard className="space-y-3">
            <h3 className="font-semibold text-slate-900">Đánh giá biểu cảm</h3>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-700">Mức tự tin qua biểu cảm</span>
                <span className="font-semibold text-slate-900">82%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-full w-[82%] rounded-full bg-blue-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Ánh mắt khá ổn định, cần giảm thói quen nhìn lệch khung hình khi trả lời câu hỏi khó.
            </p>
          </SurfaceCard>

          <SurfaceCard className="space-y-3">
            <h3 className="font-semibold text-slate-900">Đánh giá tông giọng</h3>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-700">Độ rõ và nhấn giọng</span>
                <span className="font-semibold text-slate-900">78%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-full w-[78%] rounded-full bg-indigo-500" />
              </div>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              {voiceTips.map(tip => (
                <li key={tip}>• {tip}</li>
              ))}
            </ul>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}
