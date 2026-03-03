import {
  Badge,
  Button,
  ChatMessage,
  SectionTitle,
  SurfaceCard,
} from '@components/ui';
import { Lightbulb, SendHorizonal, SquareCheckBig } from 'lucide-react';


const chatMessages = [
  {
    id: 'm1',
    role: 'assistant' as const,
    text: 'Hãy giới thiệu ngắn gọn về bạn và lý do bạn phù hợp với vị trí Backend Intern.',
  },
  {
    id: 'm2',
    role: 'user' as const,
    text: 'Em là sinh viên năm 3 ngành SE, có kinh nghiệm làm 2 dự án Java Spring Boot và em thích xây API hiệu năng tốt.',
    hint: 'Gợi ý từ AI: Câu trả lời này hơi ngắn, bạn nên thêm một ví dụ thực tế.',
  },
  {
    id: 'm3',
    role: 'assistant' as const,
    text: 'Bạn đã xử lý một bug production khó nào chưa? Hãy mô tả theo STAR.',
  },
  {
    id: 'm4',
    role: 'user' as const,
    text: 'Trong dự án môn học, em từng xử lý lỗi deadlock khi nhiều request ghi log cùng lúc bằng cách chuyển sang queue bất đồng bộ.',
    hint: 'Gợi ý từ AI: Tốt. Hãy bổ sung kết quả định lượng (giảm bao nhiêu % thời gian phản hồi).',
  },
];

const checklist = [
  { label: 'Giới thiệu bản thân', done: true },
  { label: 'Kinh nghiệm dự án', done: true },
  { label: 'Giải quyết vấn đề', done: true },
  { label: 'Kỹ năng teamwork', done: false },
  { label: 'Mục tiêu nghề nghiệp', done: false },
];

export default function InterviewPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title="Luyện phỏng vấn AI"
        subtitle="Mô phỏng phỏng vấn theo JD và nhận phản hồi ngay trong lúc chat."
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        <SurfaceCard className="flex min-h-[38rem] flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Interview Chat</h3>
            <Badge variant="info">AI Interviewer Online</Badge>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
            {chatMessages.map(message => (
              <ChatMessage
                key={message.id}
                role={message.role}
                text={message.text}
                hint={message.hint}
              />
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
            <textarea
              rows={3}
              className="w-full resize-none bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              placeholder="Nhập câu trả lời của bạn..."
            />
            <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
              <Button variant="outline" size="sm">
                <Lightbulb size={16} />
                <span>Gợi ý trả lời</span>
              </Button>
              <Button variant="secondary" size="sm">
                <SquareCheckBig size={16} />
                <span>Kết thúc &amp; Chấm điểm</span>
              </Button>
              <Button size="sm">
                <SendHorizonal size={16} />
                <span>Gửi</span>
              </Button>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard className="space-y-5">
          <h3 className="font-semibold text-slate-900">Real-time Insights</h3>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Sentiment Analysis</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">Tự tin: 80%</p>
            <div className="mt-3 h-2 rounded-full bg-slate-200">
              <div className="h-full w-[80%] rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700">Checklist câu hỏi</p>
            <ul className="mt-3 space-y-2">
              {checklist.map(item => (
                <li
                  key={item.label}
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  <span className="text-slate-700">{item.label}</span>
                  <Badge variant={item.done ? 'success' : 'default'}>
                    {item.done ? 'Done' : 'Pending'}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}
