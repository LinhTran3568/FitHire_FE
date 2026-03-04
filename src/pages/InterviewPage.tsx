import { Badge, Button, ChatMessage, SectionTitle, SurfaceCard } from '@components/ui';
import { getJobById } from '@lib/mockJobs';
import { Camera, CameraOff, Mic, MicOff, SendHorizonal, Waves } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type SessionState = 'idle' | 'running' | 'paused';
type DevicePermission = 'unknown' | 'granted' | 'denied' | 'unsupported';
type MessageRole = 'assistant' | 'user';

interface InterviewMessage {
  id: string;
  role: MessageRole;
  text: string;
  hint?: string;
}

const generalQuestions = [
  'Hãy giới thiệu ngắn gọn về bạn và lý do bạn phù hợp với vị trí mục tiêu.',
  'Mô tả một dự án gần đây theo STAR: bối cảnh, nhiệm vụ, hành động và kết quả.',
  'Nếu gặp deadline gấp và yêu cầu thay đổi liên tục, bạn sẽ ưu tiên xử lý như thế nào?',
  'Bạn học kỹ năng mới ra sao trong 30 ngày đầu khi vào một team mới?',
];

const continuousPrompts = [
  'Bây giờ thử trả lời lại câu vừa rồi theo format: Hành động -> Số liệu -> Tác động.',
  'Hãy diễn đạt câu trả lời trong tối đa 45 giây để luyện tính súc tích.',
  'Giả sử interviewer hỏi sâu hơn, bạn sẽ thêm bằng chứng nào để tăng độ thuyết phục?',
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function buildHintFromAnswer(answer: string) {
  const trimmed = answer.trim();
  const hasNumber = /\d/.test(trimmed);
  const lower = trimmed.toLowerCase();
  const hasResultKeyword =
    lower.includes('kết quả') ||
    lower.includes('tăng') ||
    lower.includes('giảm') ||
    lower.includes('đạt');

  if (trimmed.length < 80) {
    return 'Câu trả lời hơi ngắn, bạn nên thêm bối cảnh và tác động cuối cùng.';
  }

  if (!hasNumber) {
    return 'Nên bổ sung số liệu cụ thể để tăng sức thuyết phục.';
  }

  if (!hasResultKeyword) {
    return 'Bạn đã nêu hành động khá rõ, hãy thêm phần kết quả định lượng.';
  }

  return 'Cấu trúc ổn. Bạn có thể nhấn mạnh vai trò cá nhân rõ hơn để nổi bật đóng góp.';
}

function getPermissionText(permission: DevicePermission, kind: 'mic' | 'camera') {
  if (permission === 'granted') return kind === 'mic' ? 'Mic đã cấp quyền' : 'Camera đã cấp quyền';
  if (permission === 'denied') return kind === 'mic' ? 'Mic bị từ chối quyền' : 'Camera bị từ chối quyền';
  if (permission === 'unsupported') return 'Trình duyệt không hỗ trợ thiết bị';
  return kind === 'mic' ? 'Mic chưa xác thực quyền' : 'Camera chưa xác thực quyền';
}

export default function InterviewPage() {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  const targetJob = jobId ? getJobById(jobId) : undefined;

  const [sessionState, setSessionState] = useState<SessionState>('idle');
  const [cameraPermission, setCameraPermission] = useState<DevicePermission>('unknown');
  const [micPermission, setMicPermission] = useState<DevicePermission>('unknown');
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [isRequestingMedia, setIsRequestingMedia] = useState(false);
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [draftAnswer, setDraftAnswer] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [completedBaseSet, setCompletedBaseSet] = useState(false);
  const [continuousPromptIndex, setContinuousPromptIndex] = useState(0);
  const [voiceSamplesCount] = useState(0);

  const questionSet = useMemo(() => {
    if (!targetJob) return generalQuestions;

    const primarySkills = targetJob.skills.slice(0, 2).join(', ');
    const topRequirement = targetJob.requirements[0] ?? 'kỹ năng chuyên môn phù hợp';
    const firstResponsibility = targetJob.responsibilities[0] ?? 'xử lý nhiệm vụ cốt lõi';

    return [
      `Giới thiệu bản thân trong 60 giây và lý do bạn phù hợp với vị trí ${targetJob.title} tại ${targetJob.company}.`,
      `Hãy kể một dự án có liên quan tới ${primarySkills} theo cấu trúc STAR.`,
      `Nếu nhận nhiệm vụ "${firstResponsibility}", bạn sẽ bắt đầu từ đâu trong tuần đầu?`,
      `Yêu cầu JD nhấn mạnh "${topRequirement}". Bạn sẽ chứng minh năng lực này bằng ví dụ nào?`,
    ];
  }, [targetJob]);

  const sessionLabel = useMemo(() => {
    if (targetJob) return `Mock interview theo JD: ${targetJob.title} - ${targetJob.company}`;
    if (jobId) return `Mock interview theo JD: ${jobId}`;
    return 'Mock interview tổng quát';
  }, [jobId, targetJob]);

  const answeredCount = useMemo(
    () => messages.filter(message => message.role === 'user').length,
    [messages],
  );

  const progressPercent = useMemo(
    () => Math.round((Math.min(answeredCount, questionSet.length) / questionSet.length) * 100),
    [answeredCount, questionSet.length],
  );

  const expressionScore = useMemo(() => {
    const base = 52 + answeredCount * 7;
    const cameraBonus = cameraEnabled && cameraPermission === 'granted' ? 16 : -6;
    return clamp(base + cameraBonus, 35, 96);
  }, [answeredCount, cameraEnabled, cameraPermission]);

  const hasVoiceData = voiceSamplesCount > 0;
  const voiceScore = useMemo(() => {
    if (!hasVoiceData) return null;
    const base = 48 + voiceSamplesCount * 8;
    const micBonus = micEnabled && micPermission === 'granted' ? 18 : -8;
    return clamp(base + micBonus, 30, 96);
  }, [hasVoiceData, micEnabled, micPermission, voiceSamplesCount]);

  const sessionStatusBadge = useMemo(() => {
    if (sessionState === 'running') return { text: 'Đang phỏng vấn', variant: 'success' as const };
    if (sessionState === 'paused') return { text: 'Đang tạm dừng', variant: 'warning' as const };
    return { text: 'Chưa bắt đầu', variant: 'default' as const };
  }, [sessionState]);

  const isMediaSupported = useMemo(
    () => typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia),
    [],
  );

  const appendAssistantMessage = (text: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role: 'assistant',
        text,
      },
    ]);
  };

  const askInitialQuestionIfNeeded = () => {
    setMessages(prev => {
      if (prev.length > 0) return prev;
      return [
        {
          id: 'assistant-initial',
          role: 'assistant',
          text: questionSet[0],
        },
      ];
    });
  };

  const requestDevicePermission = async (kind: 'audio' | 'video') => {
    if (!isMediaSupported) {
      if (kind === 'audio') setMicPermission('unsupported');
      else setCameraPermission('unsupported');
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: kind === 'audio',
        video: kind === 'video',
      });
      stream.getTracks().forEach(track => track.stop());

      if (kind === 'audio') {
        setMicPermission('granted');
        setMicEnabled(true);
      } else {
        setCameraPermission('granted');
        setCameraEnabled(true);
      }

      return true;
    } catch {
      if (kind === 'audio') {
        setMicPermission('denied');
        setMicEnabled(false);
      } else {
        setCameraPermission('denied');
        setCameraEnabled(false);
      }
      return false;
    }
  };

  const ensureBasePermissions = async () => {
    if (!isMediaSupported) {
      setMicPermission('unsupported');
      setCameraPermission('unsupported');
      setMicEnabled(false);
      setCameraEnabled(false);
      return;
    }

    setIsRequestingMedia(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      stream.getTracks().forEach(track => track.stop());
      setMicPermission('granted');
      setCameraPermission('granted');
      setMicEnabled(true);
      setCameraEnabled(true);
    } catch {
      setMicPermission('denied');
      setCameraPermission('denied');
      setMicEnabled(false);
      setCameraEnabled(false);
    } finally {
      setIsRequestingMedia(false);
    }
  };

  const handleSessionAction = async () => {
    if (sessionState === 'idle') {
      await ensureBasePermissions();
      setSessionState('running');
      askInitialQuestionIfNeeded();
      return;
    }

    if (sessionState === 'running') {
      setSessionState('paused');
      return;
    }

    if (completedBaseSet) {
      appendAssistantMessage(continuousPrompts[continuousPromptIndex]);
      setContinuousPromptIndex(prev => (prev + 1) % continuousPrompts.length);
    }
    setSessionState('running');
  };

  const handleToggleMic = async () => {
    if (micEnabled) {
      setMicEnabled(false);
      return;
    }

    if (micPermission === 'granted') {
      setMicEnabled(true);
      return;
    }

    await requestDevicePermission('audio');
  };

  const handleToggleCamera = async () => {
    if (cameraEnabled) {
      setCameraEnabled(false);
      return;
    }

    if (cameraPermission === 'granted') {
      setCameraEnabled(true);
      return;
    }

    await requestDevicePermission('video');
  };

  const handleSendAnswer = () => {
    const answer = draftAnswer.trim();
    if (!answer || sessionState !== 'running') return;

    const answerHint = buildHintFromAnswer(answer);

    setMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: 'user',
        text: answer,
        hint: `AI gợi ý: ${answerHint}`,
      },
    ]);
    setDraftAnswer('');

    if (questionIndex < questionSet.length - 1) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      appendAssistantMessage(questionSet[nextIndex]);
      return;
    }

    setCompletedBaseSet(true);
    setSessionState('paused');
    appendAssistantMessage(
      'Bạn đã hoàn thành bộ câu hỏi chính. Hãy bấm "Tiếp tục phiên phỏng vấn" để luyện thêm các câu mở rộng theo JD.',
    );
  };

  const currentQuestionNumber = completedBaseSet
    ? questionSet.length
    : Math.min(questionIndex + 1, questionSet.length);

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Luyện phỏng vấn AI"
        subtitle="Phỏng vấn bằng giọng nói + camera, nhận gợi ý theo biểu cảm và tông giọng để cải thiện từng câu trả lời."
      />

      <SurfaceCard className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="info">{sessionLabel}</Badge>
            <Badge variant={sessionStatusBadge.variant}>{sessionStatusBadge.text}</Badge>
            <Badge variant="default">
              Tiến độ: {Math.min(answeredCount, questionSet.length)}/{questionSet.length}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={sessionState === 'running' ? 'secondary' : 'primary'}
              onClick={handleSessionAction}
              disabled={isRequestingMedia}
            >
              {sessionState === 'idle' && 'Bắt đầu phiên phỏng vấn'}
              {sessionState === 'running' && 'Tạm dừng phiên phỏng vấn'}
              {sessionState === 'paused' && 'Tiếp tục phiên phỏng vấn'}
            </Button>

            <Button variant="outline" onClick={handleToggleMic}>
              {micEnabled ? <Mic size={16} /> : <MicOff size={16} />}
              <span>{micEnabled ? 'Mic đang bật' : 'Mic đang tắt'}</span>
            </Button>

            <Button variant="outline" onClick={handleToggleCamera}>
              {cameraEnabled ? <Camera size={16} /> : <CameraOff size={16} />}
              <span>{cameraEnabled ? 'Camera đang bật' : 'Camera đang tắt'}</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            {getPermissionText(micPermission, 'mic')}
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            {getPermissionText(cameraPermission, 'camera')}
          </div>
        </div>

        {(micPermission === 'denied' || cameraPermission === 'denied') && (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Bạn đang từ chối quyền mic/camera. Hệ thống vẫn cho luyện bằng văn bản, nhưng phần đánh giá
            biểu cảm và tông giọng sẽ kém chính xác.
          </p>
        )}
      </SurfaceCard>

      <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
        <SurfaceCard className="flex min-h-[38rem] flex-col gap-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Camera</p>
              <div className="mt-3 flex h-40 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-500">
                <Camera size={18} />
                <span className="ml-2 text-sm">
                  {cameraEnabled && cameraPermission === 'granted'
                    ? 'Đang theo dõi biểu cảm gương mặt theo thời gian thực'
                    : 'Camera tắt hoặc chưa được cấp quyền'}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Âm thanh</p>
              <div className="mt-3 flex h-40 flex-col items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-500">
                <Waves size={20} />
                <p className="mt-2 text-center text-sm">
                  {micEnabled && micPermission === 'granted'
                    ? 'Đang phân tích tông giọng, độ rõ và nhịp nói'
                    : 'Mic tắt hoặc chưa được cấp quyền'}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">
                Câu hỏi hiện tại: {currentQuestionNumber}/{questionSet.length}
              </span>
              <span className="font-semibold text-slate-900">{progressPercent}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-blue-600 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
            {messages.length === 0 ? (
              <p className="text-sm text-slate-600">
                Nhấn <span className="font-semibold">Bắt đầu phiên phỏng vấn</span> để nhận câu hỏi đầu tiên.
              </p>
            ) : (
              messages.map(message => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  text={message.text}
                  hint={message.hint}
                />
              ))
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <textarea
              rows={3}
              value={draftAnswer}
              onChange={event => setDraftAnswer(event.target.value)}
              className="w-full resize-none bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              placeholder={
                sessionState === 'running'
                  ? 'Nhập câu trả lời của bạn hoặc nói trực tiếp qua mic...'
                  : 'Bắt đầu/tiếp tục phiên phỏng vấn để gửi câu trả lời...'
              }
            />
            <div className="mt-3 flex justify-end">
              <Button size="sm" onClick={handleSendAnswer} disabled={sessionState !== 'running' || !draftAnswer.trim()}>
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
                <span className="font-semibold text-slate-900">{expressionScore}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${expressionScore}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-slate-600">
              {cameraEnabled && cameraPermission === 'granted'
                ? 'Ánh mắt và nét mặt đang ổn định. Hãy giữ giao tiếp mắt khi trả lời các câu hỏi khó.'
                : 'Bật camera để AI theo dõi biểu cảm chính xác hơn trong từng câu trả lời.'}
            </p>
          </SurfaceCard>

          <SurfaceCard className="space-y-3">
            <h3 className="font-semibold text-slate-900">Đánh giá tông giọng</h3>
            {voiceScore === null ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                Chưa có dữ liệu giọng nói để đánh giá. Hệ thống chỉ chấm tông giọng khi có câu trả lời bằng voice.
              </div>
            ) : (
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-700">Độ rõ và nhấn giọng</span>
                  <span className="font-semibold text-slate-900">{voiceScore}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                    style={{ width: `${voiceScore}%` }}
                  />
                </div>
              </div>
            )}
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Tốc độ nói gợi ý: 120 - 150 từ/phút để interviewer dễ theo dõi.</li>
              <li>• Nhấn vào phần hành động và kết quả để tăng độ thuyết phục.</li>
              <li>• Kết thúc câu trả lời bằng tác động định lượng (nếu có).</li>
            </ul>
          </SurfaceCard>

          <SurfaceCard className="space-y-2">
            <h3 className="font-semibold text-slate-900">Trạng thái luyện tập</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="info">Câu đã trả lời: {answeredCount}</Badge>
              <Badge variant="success">Session: {sessionStatusBadge.text}</Badge>
              {completedBaseSet && <Badge variant="warning">Đã xong bộ câu hỏi chính</Badge>}
            </div>
            <p className="text-sm text-slate-600">
              Trang này chỉ tập trung luyện tập theo câu hỏi và gợi ý cải thiện. Không có nút kết thúc chấm điểm cứng.
            </p>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}
