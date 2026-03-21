import { Badge, Button, ChatMessage, SurfaceCard } from '@components/ui';
import { getJobById } from '@lib/mockJobs';
import { Camera, CameraOff, Mic, MicOff, SendHorizonal, Waves } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type SessionState = 'idle' | 'running' | 'paused' | 'completed';
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

const DEMO_QUESTION_LIMIT = 4;
const ACTION_KEYWORDS = [
  'xây dựng',
  'triển khai',
  'thực hiện',
  'phối hợp',
  'phân tích',
  'xử lý',
  'tối ưu',
  'thiết kế',
  'đề xuất',
];
const RESULT_KEYWORDS = ['kết quả', 'tăng', 'giảm', 'đạt', 'cải thiện', 'hoàn thành', 'tiết kiệm'];
const CONTEXT_KEYWORDS = ['bối cảnh', 'nhiệm vụ', 'vai trò', 'trong dự án', 'khi', 'tình huống'];

interface AnswerEvaluation {
  question: string;
  answer: string;
  score: number;
  strengths: string[];
  improvements: string[];
}

function includesAny(text: string, keywords: string[]) {
  return keywords.some(keyword => text.includes(keyword));
}

function evaluateAnswer(answer: string, question: string): AnswerEvaluation {
  const trimmed = answer.trim();
  const lowered = trimmed.toLowerCase();

  const hasNumber = /\d/.test(trimmed);
  const hasAction = includesAny(lowered, ACTION_KEYWORDS);
  const hasResult = includesAny(lowered, RESULT_KEYWORDS);
  const hasContext = includesAny(lowered, CONTEXT_KEYWORDS);
  const lengthScore = clamp(Math.round((trimmed.length / 180) * 25), 0, 25);

  const score = clamp(
    35 +
      lengthScore +
      (hasNumber ? 15 : 0) +
      (hasAction ? 15 : 0) +
      (hasResult ? 20 : 0) +
      (hasContext ? 10 : 0),
    0,
    100,
  );

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (lengthScore >= 18) strengths.push('Diễn đạt đủ ý');
  else improvements.push('Bổ sung bối cảnh và cách triển khai cụ thể hơn');

  if (hasNumber) strengths.push('Có số liệu minh chứng');
  else improvements.push('Thêm số liệu định lượng để tăng sức thuyết phục');

  if (hasAction) strengths.push('Nêu rõ hành động cá nhân');
  else improvements.push('Làm rõ bạn trực tiếp làm gì trong tình huống');

  if (hasResult) strengths.push('Có kết quả/tác động cuối cùng');
  else improvements.push('Chốt câu trả lời bằng kết quả đo lường được');

  if (hasContext) strengths.push('Có bối cảnh và vai trò');
  else improvements.push('Thêm bối cảnh để câu trả lời mạch lạc hơn');

  return {
    question,
    answer,
    score,
    strengths,
    improvements,
  };
}

function getScoreTextColor(score: number) {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 65) return 'text-amber-600';
  return 'text-rose-600';
}

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
  if (permission === 'denied')
    return kind === 'mic' ? 'Mic bị từ chối quyền' : 'Camera bị từ chối quyền';
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
  const [voiceSamplesCount] = useState(0);

  const questionSet = useMemo(() => {
    if (!targetJob) return generalQuestions.slice(0, DEMO_QUESTION_LIMIT);

    const primarySkills = targetJob.skills.slice(0, 2).join(', ');
    const topRequirement = targetJob.requirements[0] ?? 'kỹ năng chuyên môn phù hợp';
    const firstResponsibility = targetJob.responsibilities[0] ?? 'xử lý nhiệm vụ cốt lõi';

    return [
      `Giới thiệu bản thân trong 60 giây và lý do bạn phù hợp với vị trí ${targetJob.title} tại ${targetJob.company}.`,
      `Hãy kể một dự án có liên quan tới ${primarySkills} theo cấu trúc STAR.`,
      `Nếu nhận nhiệm vụ "${firstResponsibility}", bạn sẽ bắt đầu từ đâu trong tuần đầu?`,
      `Yêu cầu JD nhấn mạnh "${topRequirement}". Bạn sẽ chứng minh năng lực này bằng ví dụ nào?`,
    ].slice(0, DEMO_QUESTION_LIMIT);
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

  const answerEvaluations = useMemo(() => {
    const userAnswers = messages.filter(message => message.role === 'user');
    return userAnswers
      .slice(0, questionSet.length)
      .map((message, index) =>
        evaluateAnswer(message.text, questionSet[index] ?? `Câu ${index + 1}`),
      );
  }, [messages, questionSet]);

  const overallAnswerScore = useMemo(() => {
    if (answerEvaluations.length === 0) return 0;
    const total = answerEvaluations.reduce((sum, item) => sum + item.score, 0);
    return Math.round(total / answerEvaluations.length);
  }, [answerEvaluations]);

  const answerInsights = useMemo(() => {
    if (answerEvaluations.length === 0) {
      return {
        topStrength: 'Chưa có dữ liệu',
        topImprovement: 'Hoàn thành phiên demo để nhận nhận xét chi tiết.',
      };
    }

    const strengthCount = new Map<string, number>();
    const improvementCount = new Map<string, number>();

    answerEvaluations.forEach(item => {
      item.strengths.forEach(strength => {
        strengthCount.set(strength, (strengthCount.get(strength) ?? 0) + 1);
      });
      item.improvements.forEach(improvement => {
        improvementCount.set(improvement, (improvementCount.get(improvement) ?? 0) + 1);
      });
    });

    const topStrength =
      [...strengthCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ??
      'Bạn đã có nền tảng trả lời tốt.';
    const topImprovement =
      [...improvementCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ??
      'Không có điểm yếu lớn, hãy giữ cấu trúc STAR.';

    return { topStrength, topImprovement };
  }, [answerEvaluations]);

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
    if (sessionState === 'completed') return { text: 'Đã kết thúc demo', variant: 'info' as const };
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
    if (sessionState === 'completed') return;

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

    setSessionState('completed');
    appendAssistantMessage(
      `Bạn đã hoàn thành ${questionSet.length}/${questionSet.length} câu hỏi demo. Phiên phỏng vấn đã kết thúc.`,
    );
  };

  const currentQuestionNumber = Math.min(questionIndex + 1, questionSet.length);

  return (
    <div className="space-y-6">
      {/* Gradient banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 px-6 py-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Luyện phỏng vấn AI</h1>
            <p className="mt-1 text-sm text-slate-300">
              Phỏng vấn bằng giọng nói + camera, nhận gợi ý theo biểu cảm và tông giọng để cải thiện
              từng câu trả lời.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 px-4 py-2 text-center">
              <p className="text-xl font-bold">{answeredCount}</p>
              <p className="text-xs text-slate-300">Câu đã trả lời</p>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-2 text-center">
              <p className="text-xl font-bold">{questionSet.length}</p>
              <p className="text-xs text-slate-300">Tổng câu hỏi</p>
            </div>
          </div>
        </div>
      </div>

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
              disabled={isRequestingMedia || sessionState === 'completed'}
            >
              {sessionState === 'idle' && 'Bắt đầu phiên phỏng vấn'}
              {sessionState === 'running' && 'Tạm dừng phiên phỏng vấn'}
              {sessionState === 'paused' && 'Tiếp tục phiên phỏng vấn'}
              {sessionState === 'completed' && 'Phiên demo đã kết thúc'}
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
            Bạn đang từ chối quyền mic/camera. Hệ thống vẫn cho luyện bằng văn bản, nhưng phần đánh
            giá biểu cảm và tông giọng sẽ kém chính xác.
          </p>
        )}
      </SurfaceCard>

      <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
        <SurfaceCard className="flex min-h-[38rem] flex-col gap-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-indigo-900/40 bg-gradient-to-br from-slate-800 to-indigo-900/60 p-4">
              <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">Camera</p>
              <div className="mt-3 flex h-40 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-400">
                <Camera size={18} />
                <span className="ml-2 text-sm">
                  {cameraEnabled && cameraPermission === 'granted'
                    ? 'Đang theo dõi biểu cảm gương mặt theo thời gian thực'
                    : 'Camera tắt hoặc chưa được cấp quyền'}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-indigo-900/40 bg-gradient-to-br from-slate-800 to-blue-900/60 p-4">
              <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                Âm thanh
              </p>
              <div className="mt-3 flex h-40 flex-col items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-400">
                <Waves size={20} />
                <p className="mt-2 text-center text-sm">
                  {micEnabled && micPermission === 'granted'
                    ? 'Đang phân tích tông giọng, độ rõ và nhịp nói'
                    : 'Mic tắt hoặc chưa được cấp quyền'}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-indigo-50 to-slate-50 p-3">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">
                Câu hỏi hiện tại: {currentQuestionNumber}/{questionSet.length}
              </span>
              <span className="font-bold text-indigo-700">{progressPercent}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
            {messages.length === 0 ? (
              <p className="text-sm text-slate-600">
                Nhấn <span className="font-semibold">Bắt đầu phiên phỏng vấn</span> để nhận câu hỏi
                đầu tiên.
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
                  : sessionState === 'completed'
                    ? `Phiên demo đã kết thúc sau ${questionSet.length} câu hỏi.`
                    : 'Bắt đầu/tiếp tục phiên phỏng vấn để gửi câu trả lời...'
              }
            />
            <div className="mt-3 flex justify-end">
              <Button
                size="sm"
                onClick={handleSendAnswer}
                disabled={sessionState !== 'running' || !draftAnswer.trim()}
              >
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
                Chưa có dữ liệu giọng nói để đánh giá. Hệ thống chỉ chấm tông giọng khi có câu trả
                lời bằng voice.
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

          <SurfaceCard className="space-y-3">
            <h3 className="font-semibold text-slate-900">Đánh giá câu trả lời</h3>

            {sessionState !== 'completed' ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                Hoàn thành {questionSet.length}/{questionSet.length} câu demo để xem điểm nội dung
                và góp ý chi tiết cho từng câu.
              </div>
            ) : (
              <>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-700">Điểm trung bình nội dung</span>
                    <span className={`font-semibold ${getScoreTextColor(overallAnswerScore)}`}>
                      {overallAnswerScore}/100
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-500"
                      style={{ width: `${overallAnswerScore}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                  <p className="text-slate-800">
                    <span className="font-semibold text-emerald-700">Điểm mạnh nổi bật:</span>{' '}
                    {answerInsights.topStrength}.
                  </p>
                  <p className="text-slate-800">
                    <span className="font-semibold text-amber-700">Ưu tiên cải thiện:</span>{' '}
                    {answerInsights.topImprovement}.
                  </p>
                </div>

                <div className="space-y-2">
                  {answerEvaluations.map((evaluation, index) => (
                    <div
                      key={`answer-eval-${index}`}
                      className="rounded-xl border border-slate-200 bg-white p-3"
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-slate-900">Câu {index + 1}</p>
                        <span
                          className={`text-sm font-bold ${getScoreTextColor(evaluation.score)}`}
                        >
                          {evaluation.score}/100
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-500">
                        {evaluation.question}
                      </p>
                      <p className="mt-1 text-xs text-slate-700">
                        <span className="font-medium">Gợi ý:</span>{' '}
                        {evaluation.improvements[0] ??
                          'Câu trả lời tốt, tiếp tục giữ cấu trúc này.'}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </SurfaceCard>

          <SurfaceCard className="space-y-2">
            <h3 className="font-semibold text-slate-900">Trạng thái luyện tập</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="info">Câu đã trả lời: {answeredCount}</Badge>
              <Badge variant="success">Session: {sessionStatusBadge.text}</Badge>
              {sessionState === 'completed' && (
                <Badge variant="warning">Đã kết thúc sau {questionSet.length} câu demo</Badge>
              )}
            </div>
            <p className="text-sm text-slate-600">
              Chế độ demo chỉ gồm {questionSet.length} câu hỏi. Sau khi trả lời đủ, phiên sẽ tự động
              kết thúc.
            </p>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}
