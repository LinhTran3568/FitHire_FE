import { Badge, Button, SurfaceCard } from '@components/ui';
import {
  ArrowRight,
  Brain,
  CheckCircle,
  Clock,
  Lightbulb,
  Mic,
  RefreshCw,
  SkipForward,
  Sparkles,
  Speaker,
  Star,
  TrendingUp,
  User,
  Volume2,
  Zap,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
// ─── Types ─────────────────────────────────────────────────────────────────
type Phase = 'setup' | 'interview' | 'analytics';
type InterviewMode = 'warmup' | 'standard' | 'stress';

interface LiveMetrics {
  wpm: number;
  fillerCount: { a: number; um: number; er: number };
  starMoments: number[];
}

interface QuestionResult {
  question: string;
  answer: string;
  score: number;
  duration: number; // seconds
  wpm: number;
  isStarMoment: boolean;
}

// ─── Mock Data ──────────────────────────────────────────────────────────────
const QUESTIONS: Record<InterviewMode, string[]> = {
  warmup: [
    'Bạn hãy giới thiệu bản thân trong 60 giây.',
    'Điểm mạnh lớn nhất của bạn là gì?',
    'Bạn thích làm việc trong môi trường như thế nào?',
    'Bạn có dự định gì cho 1-2 năm tới?',
    'Tại sao bạn chọn lĩnh vực này?',
    'Bạn thích học kỹ năng mới bằng cách nào?',
  ],
  standard: [
    'Hãy giới thiệu bản thân và lý do bạn phù hợp với vị trí này theo cấu trúc STAR.',
    'Mô tả một dự án khó khăn bạn đã tham gia và cách bạn xử lý.',
    'Nếu gặp deadline gấp và yêu cầu thay đổi liên tục, bạn ưu tiên xử lý như thế nào?',
    'Hãy kể một lần bạn phải thuyết phục người khác đổi ý kiến.',
    'Bạn học kỹ năng mới ra sao trong 30 ngày đầu vào team mới?',
    'Mô tả một tình huống bạn phải làm việc với người có phong cách khác bạn.',
  ],
  stress: [
    'Tại sao chúng tôi nên chọn bạn thay vì 50 ứng viên khác có cùng profile?',
    'Kể về lần bạn thất bại nặng nề nhất và bài học từ đó – cụ thể, không chung chung.',
    'Bạn sẽ làm gì nếu tech lead giao cho bạn một task mà bạn không đồng ý về mặt kỹ thuật?',
    'Giao cho bạn 3 tháng, 5 người, và ngân sách hạn chế – bạn sẽ launch sản phẩm như thế nào?',
    'Interviewer: "Kỹ năng của bạn còn thiếu X và Y." – Bạn phản hồi thế nào?',
    'Mô tả quy trình bạn đưa ra quyết định khi không có đủ thông tin.',
  ],
};

const STAR_REMINDER = 'Cấu trúc STAR: Situation → Task → Action → Result';
const RADAR_AXES = ['Giọng & Tự tin', 'Chuyên môn', 'Ứng biến', 'Cấu trúc', 'Fit văn hoá'];

// ─── Sub-components ─────────────────────────────────────────────────────────

function AISoundWave({ active }: { active: boolean }) {
  return (
    <div className="flex h-12 items-end justify-center gap-[3px]">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all"
          style={{
            width: 4,
            background: active ? 'var(--color-primary)' : 'var(--color-border-strong)',
            height: active ? `${Math.sin(i * 0.9) * 24 + 16}px` : '8px',
            animation: active
              ? `wave-bar ${0.6 + i * 0.1}s ease-in-out infinite alternate`
              : 'none',
            animationDelay: `${i * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
}

function RadarChart({ scores }: { scores: number[] }) {
  const cx = 120,
    cy = 120,
    r = 80;
  const axes = RADAR_AXES;
  const n = axes.length;

  const angleStep = (2 * Math.PI) / n;
  const getPoint = (score: number, idx: number) => {
    const angle = idx * angleStep - Math.PI / 2;
    const dist = (score / 100) * r;
    return {
      x: cx + dist * Math.cos(angle),
      y: cy + dist * Math.sin(angle),
    };
  };

  const outerPoints = axes.map((_, i) => getPoint(100, i));
  const scorePoints = scores.map((s, i) => getPoint(s, i));

  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + ' Z';

  return (
    <svg viewBox="0 0 240 240" className="mx-auto w-full max-w-[220px] drop-shadow-sm filter">
      {/* Grid rings */}
      {[25, 50, 75, 100].map(pct => {
        const pts = axes.map((_, i) => getPoint(pct, i));
        return (
          <path
            key={pct}
            d={toPath(pts)}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={1}
          />
        );
      })}
      {outerPoints.map((p, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke="var(--color-border)"
          strokeWidth={1}
        />
      ))}
      <path
        d={toPath(scorePoints)}
        fill="var(--color-primary-muted)"
        fillOpacity={0.6}
        stroke="var(--color-primary)"
        strokeWidth={2}
      />
      {scorePoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4.5}
          fill="var(--color-surface)"
          stroke="var(--color-primary)"
          strokeWidth={2}
          className="drop-shadow-sm"
        />
      ))}
      {outerPoints.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const lx = cx + (r + 25) * Math.cos(angle);
        const ly = cy + (r + 25) * Math.sin(angle);
        return (
          <text
            key={i}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={9}
            fontWeight={600}
            fill="var(--color-text-muted)"
          >
            {axes[i]}
          </text>
        );
      })}
    </svg>
  );
}

function PacingMeter({ wpm }: { wpm: number }) {
  const pct = Math.min((wpm / 200) * 100, 100);
  const isFast = wpm > 180;
  const isGood = wpm >= 115 && wpm <= 180;

  const color = isFast
    ? 'var(--color-danger)'
    : isGood
      ? 'var(--color-success)'
      : 'var(--color-warning)';
  const label = isFast ? 'QUÁ NHANH' : isGood ? 'TỐT' : wpm === 0 ? '—' : 'THỬ NÓI';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span style={{ color: 'var(--color-text-muted)' }} className="font-medium">
          Nhịp độ (WPM)
        </span>
        <span
          className="rounded-full border px-2 py-0.5 font-bold"
          style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
        >
          {wpm > 0 ? wpm : '—'}
        </span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full"
        style={{ background: 'var(--color-border)' }}
      >
        <div
          className="relative h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <div
        className="flex justify-between text-[10px] font-medium"
        style={{ color: 'var(--color-text-subtle)' }}
      >
        <span>Chậm</span>
        <span className="font-bold tracking-wider uppercase" style={{ color }}>
          {label}
        </span>
        <span>Nhanh</span>
      </div>
    </div>
  );
}

function FillerTracker({ counts }: { counts: LiveMetrics['fillerCount'] }) {
  const items = [
    {
      label: '"À..."',
      count: counts.a,
      bg: 'var(--color-warning-light)',
      color: 'var(--color-warning)',
    },
    {
      label: '"Ừm..."',
      count: counts.um,
      bg: 'var(--color-info-light)',
      color: 'var(--color-info)',
    },
    {
      label: '"Ờ..."',
      count: counts.er,
      bg: 'var(--color-danger-light)',
      color: 'var(--color-danger)',
    },
  ];
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
        Từ thừa (Filler)
      </p>
      <div className="flex items-center gap-2">
        {items.map(it => (
          <div
            key={it.label}
            className="flex flex-1 flex-col items-center justify-center rounded-lg border py-2 transition-all"
            style={{
              borderColor: it.count > 0 ? it.color : 'var(--color-border)',
              background: it.count > 0 ? it.bg : 'var(--color-surface)',
            }}
          >
            <span
              className="mb-1 text-xs font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {it.label}
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: it.count > 0 ? it.color : 'var(--color-text-muted)' }}
            >
              {it.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Setup Phase ─────────────────────────────────────────────────────────────
function SetupPhase({
  onStart,
}: {
  onStart: (cvFile: File | null, mode: InterviewMode, deviceReady: boolean) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<InterviewMode>('standard');
  const [deviceReady, setDeviceReady] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const requestPermissions = async () => {
    setIsChecking(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setTimeout(() => {
        setDeviceReady(true);
        setIsChecking(false);
      }, 800);
    } catch {
      alert('Vui lòng cấp quyền truy cập Mic và Camera để tiếp tục.');
      setIsChecking(false);
    }
  };

  return (
    <div className="animate-in fade-in mx-auto max-w-3xl space-y-8 pb-10 duration-500">
      {/* Premium Minimal Hero */}
      <SurfaceCard
        className="relative overflow-hidden border-0 !p-10 text-center shadow-lg"
        style={{ background: 'var(--color-primary-muted)' }}
      >
        <div className="relative z-10 flex flex-col items-center">
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold"
            style={{
              background: 'var(--color-surface)',
              color: 'var(--color-primary)',
              borderColor: 'var(--color-primary)',
            }}
          >
            <Sparkles size={14} /> AI Interviewer
          </div>
          <h1
            className="mb-4 text-3xl leading-tight font-black tracking-tight md:text-5xl"
            style={{ color: 'var(--color-primary)' }}
          >
            Phỏng vấn giả lập
          </h1>
          <p
            className="max-w-lg text-sm leading-relaxed font-medium md:text-base"
            style={{ color: 'var(--color-text)' }}
          >
            Huấn luyện kỹ năng trả lời phỏng vấn chuyên nghiệp cùng AI. Đánh giá thời gian thực từ
            ngữ điệu đến cấu trúc câu.
          </p>
        </div>
      </SurfaceCard>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upload CV */}
        <SurfaceCard className="flex flex-col">
          <div className="mb-4 flex items-center gap-2">
            <div
              className="rounded-lg p-2"
              style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
            >
              <User size={18} />
            </div>
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              Hồ sơ tham khảo
            </h3>
          </div>
          <p
            className="mb-6 flex-1 text-sm leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Tải lên CV của bạn (PDF) để AI có thể đặt câu hỏi xoáy sâu trúng đích vào dự án thực tế
            bạn đã làm.
          </p>
          <div
            className="hover:border-primary group relative cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all"
            style={{
              borderColor: 'var(--color-border-strong)',
              background: 'var(--color-surface)',
            }}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={e => e.target.files && setFile(e.target.files[0])}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              title="Upload CV"
            />
            {file ? (
              <div
                className="flex items-center justify-center gap-2"
                style={{ color: 'var(--color-success)' }}
              >
                <CheckCircle size={18} />
                <span className="max-w-[200px] truncate text-sm font-semibold">{file.name}</span>
              </div>
            ) : (
              <div className="space-y-2">
                <Brain
                  size={24}
                  style={{ color: 'var(--color-text-subtle)' }}
                  className="mx-auto transition-transform group-hover:scale-110"
                />
                <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                  Nhấp để tải CV (PDF)
                </p>
                <p className="text-xs font-medium" style={{ color: 'var(--color-text-subtle)' }}>
                  Hoặc kéo thả vào đây
                </p>
              </div>
            )}
          </div>
        </SurfaceCard>

        {/* Cấu hình Phase */}
        <SurfaceCard className="flex flex-col">
          <div className="mb-4 flex items-center gap-2">
            <div
              className="rounded-lg p-2"
              style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
            >
              <Zap size={18} />
            </div>
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              Cường độ phỏng vấn
            </h3>
          </div>
          <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Chọn độ khó của các câu hỏi. Recommended mode: Standard.
          </p>

          <div className="mb-6 flex-1 space-y-3">
            {[
              { id: 'warmup', label: 'Warm-up', desc: 'Hỏi cơ bản, quen nhịp độ' },
              { id: 'standard', label: 'Standard', desc: 'Có tính chuyên môn + tình huống' },
              { id: 'stress', label: 'Stress Test', desc: 'Câu hỏi xoáy, áp lực cao' },
            ].map(m => (
              <label
                key={m.id}
                className="flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-all"
                style={{
                  borderColor: mode === m.id ? 'var(--color-primary)' : 'var(--color-border)',
                  background: mode === m.id ? 'var(--color-primary-muted)' : 'var(--color-surface)',
                  boxShadow: mode === m.id ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                }}
              >
                <input
                  type="radio"
                  name="ivMode"
                  value={m.id}
                  checked={mode === m.id}
                  onChange={() => setMode(m.id as InterviewMode)}
                  className="mt-1 flex-shrink-0"
                />
                <div className="-mt-0.5">
                  <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                    {m.label}
                  </p>
                  <p
                    className="mt-1 text-xs font-medium"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {m.desc}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </SurfaceCard>
      </div>

      <SurfaceCard
        className="mt-8 flex flex-col items-center justify-between gap-6 md:flex-row"
        style={{ background: 'var(--color-surface-raised)' }}
      >
        <div className="flex w-full items-center gap-4 md:w-auto">
          {!deviceReady ? (
            <Button
              variant="outline"
              onClick={requestPermissions}
              disabled={isChecking}
              className="h-12 flex-1 md:flex-none"
            >
              <Mic size={18} className="mr-2" />
              {isChecking ? 'Đang kiểm tra...' : 'Kiểm tra Mic & Camera'}
            </Button>
          ) : (
            <div
              className="flex items-center gap-2 rounded-lg border px-4 py-2.5"
              style={{
                borderColor: 'var(--color-success)',
                background: 'var(--color-success-light)',
                color: 'var(--color-success)',
              }}
            >
              <CheckCircle size={18} />
              <span className="text-sm font-semibold">Thiết bị sẵn sàng</span>
            </div>
          )}
        </div>

        <Button
          variant="primary"
          disabled={!deviceReady}
          onClick={() => onStart(file, mode, deviceReady)}
          className="h-12 w-full px-8 text-sm font-bold md:w-auto"
        >
          Bắt đầu phỏng vấn
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </SurfaceCard>
    </div>
  );
}

// ─── Interview Phase ────────────────────────────────────────────────────────
function InterviewPhase({
  mode,
  onFinish,
}: {
  mode: InterviewMode;
  onFinish: (results: QuestionResult[]) => void;
}) {
  const [qIndex, setQIndex] = useState(0);
  const [isAiSpeaking, setIsAiSpeaking] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120);

  const [metrics, setMetrics] = useState<LiveMetrics>({
    wpm: 0,
    fillerCount: { a: 0, um: 0, er: 0 },
    starMoments: [],
  });
  const [results, setResults] = useState<QuestionResult[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentQuestions = QUESTIONS[mode];
  const question = currentQuestions[qIndex];

  // Khởi động Camera AI (chỉ hiển thị mờ, giả lập)
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(s => {
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch(() => {});
  }, []);

  // Giả lập luồng: AI hỏi -> User trả lời
  useEffect(() => {
    if (!isAiSpeaking) return;

    const speakTimer = setTimeout(() => {
      setIsAiSpeaking(false);
      setIsRecording(true);
      setTimeRemaining(120);
      setMetrics({ wpm: 0, fillerCount: { a: 0, um: 0, er: 0 }, starMoments: [] });
    }, 3000); // 3 giây AI "nói"

    return () => clearTimeout(speakTimer);
  }, [isAiSpeaking]);

  const handleNext = useCallback(() => {
    // Lưu kết quả câu vừa rồi
    const finalScore = Math.floor(Math.random() * 30 + 70);
    const duration = 120 - timeRemaining;
    setResults(prev => [
      ...prev,
      {
        question,
        answer: '...',
        score: finalScore,
        duration: duration === 0 ? 120 : duration,
        wpm: metrics.wpm,
        isStarMoment: finalScore > 90,
      },
    ]);

    if (qIndex < currentQuestions.length - 1) {
      setIsAiSpeaking(true);
      setIsRecording(false);
      setQIndex(i => i + 1);
    } else {
      onFinish(results);
    }
  }, [timeRemaining, question, metrics.wpm, qIndex, currentQuestions.length, onFinish, results]);

  // Đếm ngược & sinh metrics ngẫu nhiên
  useEffect(() => {
    if (!isRecording) return;
    const timer = setInterval(() => {
      setTimeRemaining(t => {
        if (t <= 1) {
          handleNext();
          return 0;
        }
        return t - 1;
      });

      // Randomize metrics
      setMetrics(prev => {
        const diff = Math.floor(Math.random() * 20) - 10;
        const newWpm = Math.max(0, Math.min(200, (prev.wpm === 0 ? 120 : prev.wpm) + diff));

        const isFiller = Math.random() > 0.95;
        const filler = { ...prev.fillerCount };
        if (isFiller) {
          const r = Math.random();
          if (r < 0.3) filler.a++;
          else if (r < 0.6) filler.um++;
          else filler.er++;
        }

        return { ...prev, wpm: newWpm, fillerCount: filler };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRecording, handleNext]);

  const handleEndEarly = () => {
    onFinish(results);
  };

  const formatTime = (secs: number) =>
    `${Math.floor(secs / 60)}:${(secs % 60).toString().padStart(2, '0')}`;

  return (
    <div className="animate-in slide-in-from-bottom-8 flex h-[80vh] min-h-[600px] flex-col gap-6 duration-700 lg:flex-row">
      {/* Cột trái: AI & Video */}
      <SurfaceCard className="relative flex flex-1 flex-col items-center justify-center overflow-hidden border-0 p-0">
        {/* Lớp nền tối cho Video */}
        <div className="absolute inset-0 z-0 bg-black/5 dark:bg-black/40">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="h-full w-full object-cover opacity-20 blur-sm grayscale filter"
          />
        </div>

        {/* Bảng điều khiển đỉnh */}
        <div className="absolute top-6 right-6 left-6 z-10 flex items-center justify-between">
          <Badge
            variant="default"
            className="border-0 bg-black/40 font-bold text-white backdrop-blur-md"
          >
            Hồi đáp: Câu {qIndex + 1}/{currentQuestions.length}
          </Badge>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            <span className="text-xs font-bold tracking-widest text-white uppercase drop-shadow-md">
              Recording
            </span>
          </div>
        </div>

        {/* AI Avatar Vùng giữa */}
        <div className="relative z-10 mt-10 flex flex-col items-center">
          <div className="relative">
            <div
              className="absolute inset-0 animate-ping rounded-full opacity-20"
              style={{ background: 'var(--color-primary)' }}
            />
            <div
              className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 shadow-2xl"
              style={{
                background: 'var(--color-primary-muted)',
                borderColor: 'var(--color-surface)',
              }}
            >
              {isAiSpeaking ? (
                <Speaker
                  size={48}
                  style={{ color: 'var(--color-primary)' }}
                  className="animate-pulse"
                />
              ) : (
                <User size={48} style={{ color: 'var(--color-primary)' }} />
              )}
            </div>
          </div>

          <div className="mt-8 max-w-lg px-6 text-center">
            <h2
              className="text-lg leading-relaxed font-bold md:text-xl"
              style={{ color: 'var(--color-text)' }}
            >
              "{question}"
            </h2>
            <div className="mt-4 flex justify-center">
              <AISoundWave active={isAiSpeaking} />
            </div>
          </div>
        </div>

        {/* Bảng điều khiển đáy */}
        <div className="absolute right-6 bottom-6 left-6 z-10">
          <div className="h-2 w-full overflow-hidden rounded-full bg-black/20 backdrop-blur-md">
            <div
              className={`h-full transition-all duration-1000 ${timeRemaining < 30 ? 'bg-red-500' : 'bg-green-500'}`}
              style={{ width: `${(timeRemaining / 120) * 100}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between px-2">
            <span className="font-bold text-white drop-shadow-md">{formatTime(timeRemaining)}</span>
            <span className="text-xs font-semibold tracking-widest text-white/80 uppercase">
              Thời gian còn lại
            </span>
          </div>
        </div>
      </SurfaceCard>

      {/* Cột phải: Live Coaching & Actions */}
      <div className="z-10 flex flex-col gap-4 lg:w-80">
        {/* Live Metrics */}
        <SurfaceCard
          className="flex-1 border p-5 shadow-md"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
        >
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp size={16} style={{ color: 'var(--color-primary)' }} />
            <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
              Live Coaching Panel
            </h3>
          </div>

          <div className="space-y-6">
            <PacingMeter wpm={metrics.wpm} />
            <div className="border-t pb-2" style={{ borderColor: 'var(--color-border)' }} />
            <FillerTracker counts={metrics.fillerCount} />

            <div
              className="mt-6 rounded-xl border p-4"
              style={{ background: 'var(--color-info-light)', borderColor: 'var(--color-info)' }}
            >
              <p
                className="mb-2 flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase"
                style={{ color: 'var(--color-info)' }}
              >
                <Lightbulb size={12} /> Nhắc bài
              </p>
              <p
                className="text-sm leading-relaxed font-medium"
                style={{ color: 'var(--color-text)' }}
              >
                {STAR_REMINDER}
              </p>
            </div>
          </div>
        </SurfaceCard>

        {/* Action Controls */}
        <SurfaceCard
          className="flex flex-col gap-3 border p-4 shadow-sm"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
        >
          <Button
            onClick={handleNext}
            disabled={isAiSpeaking}
            variant="primary"
            className="h-12 w-full justify-center font-bold"
          >
            {qIndex < currentQuestions.length - 1 ? 'Chuyển câu tiếp theo' : 'Hoàn tất & Chấm điểm'}
            <SkipForward size={16} className="ml-2" />
          </Button>

          <Button
            onClick={handleEndEarly}
            disabled={isAiSpeaking}
            variant="outline"
            className="h-10 w-full justify-center border-0 text-xs font-semibold"
            style={{ color: 'var(--color-danger)' }}
          >
            Kết thúc sớm
          </Button>
        </SurfaceCard>
      </div>
    </div>
  );
}

// ─── Analytics Phase ────────────────────────────────────────────────────────
function AnalyticsPhase({
  results,
  mode,
  onRetry,
}: {
  results: QuestionResult[];
  mode: InterviewMode;
  onRetry: () => void;
}) {
  const avgScore = Math.round(
    results.reduce((acc, curr) => acc + curr.score, 0) / (results.length || 1),
  );
  const totalDuration = results.reduce((acc, curr) => acc + curr.duration, 0);

  const displayRadarScores = [
    avgScore + 5,
    avgScore - 5,
    avgScore + 10,
    avgScore - 2,
    avgScore + 8,
  ];

  return (
    <div className="animate-in slide-in-from-bottom-8 space-y-6 pb-10 duration-700 lg:space-y-8">
      {/* Title block */}
      <SurfaceCard
        className="!p-8 text-center"
        style={{ background: 'var(--color-primary-muted)', border: 0 }}
      >
        <p
          className="mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-widest uppercase"
          style={{
            background: 'var(--color-surface)',
            color: 'var(--color-primary)',
            borderColor: 'var(--color-primary)',
          }}
        >
          <CheckCircle size={14} /> Completed
        </p>
        <h1 className="mb-3 text-3xl font-black md:text-5xl" style={{ color: 'var(--color-text)' }}>
          Báo cáo Năng lực Phỏng vấn
        </h1>
        <p
          className="text-sm font-medium md:text-base"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Phân tích chi tiết bởi AI dựa trên phần thể hiện thực tế của bạn.
        </p>
      </SurfaceCard>

      {/* Main KPIs Row */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          {
            icon: Star,
            label: 'Điểm tổng quát',
            val: `${avgScore}/100`,
            color: 'var(--color-success)',
            bg: 'var(--color-success-light)',
          },
          {
            icon: Brain,
            label: 'Chế độ thi',
            val: mode.toUpperCase(),
            color: 'var(--color-info)',
            bg: 'var(--color-info-light)',
          },
          {
            icon: Zap,
            label: 'Khoảnh khắc Toả sáng',
            val: results.filter(r => r.isStarMoment).length,
            color: 'var(--color-warning)',
            bg: 'var(--color-warning-light)',
          },
          {
            icon: Clock,
            label: 'Tổng thời gian',
            val: `${Math.floor(totalDuration / 60)}p ${totalDuration % 60}s`,
            color: 'var(--color-primary)',
            bg: 'var(--color-primary-muted)',
          },
        ].map(kpi => (
          <SurfaceCard
            key={kpi.label}
            className="flex flex-col items-center justify-center p-6 text-center shadow-sm"
          >
            <div
              className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: kpi.bg, color: kpi.color }}
            >
              <kpi.icon size={22} />
            </div>
            <p
              className="mb-1 text-2xl font-black"
              style={{ color: 'var(--color-text)', fontFamily: 'Outfit, sans-serif' }}
            >
              {kpi.val}
            </p>
            <p
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {kpi.label}
            </p>
          </SurfaceCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Detail List */}
        <SurfaceCard className="flex flex-col">
          <div className="mb-6 flex items-center gap-2">
            <Volume2 size={18} style={{ color: 'var(--color-text-muted)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              Phân tích từng câu hỏi
            </h3>
          </div>

          <div className="space-y-4">
            {results.map((r, i) => (
              <div
                key={i}
                className="hover:border-primary rounded-2xl border p-5 transition-all"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="mb-3 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <h4
                    className="max-w-lg text-sm leading-relaxed font-bold"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {i + 1}. {r.question}
                  </h4>
                  <Badge
                    variant="default"
                    className="shrink-0 font-bold"
                    style={{ borderColor: 'var(--color-border-strong)' }}
                  >
                    Điểm: {r.score}/100
                  </Badge>
                </div>

                <div
                  className="flex flex-wrap gap-2 text-xs font-medium"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <span
                    className="rounded-md px-2 py-1"
                    style={{ background: 'var(--color-surface-raised)' }}
                  >
                    ⏱ {r.duration}s phản xạ
                  </span>
                  <span
                    className="rounded-md px-2 py-1"
                    style={{ background: 'var(--color-surface-raised)' }}
                  >
                    🎙 {r.wpm} words/min
                  </span>
                  {r.isStarMoment && (
                    <span
                      className="flex items-center gap-1 rounded-md px-2 py-1 font-bold"
                      style={{
                        background: 'var(--color-warning-light)',
                        color: 'var(--color-warning)',
                      }}
                    >
                      <Star size={12} fill="currentColor" /> Ấn tượng
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>

        {/* Right side charts */}
        <div className="space-y-6">
          <SurfaceCard className="flex flex-col items-center p-6 text-center">
            <h3
              className="mb-6 w-full text-left text-[15px] font-bold tracking-widest uppercase"
              style={{ color: 'var(--color-text)' }}
            >
              Biểu đồ Năng lực
            </h3>
            <div className="relative w-full py-2">
              <RadarChart scores={displayRadarScores} />
            </div>
          </SurfaceCard>

          <SurfaceCard className="p-6">
            <h3
              className="mb-4 text-[15px] font-bold tracking-widest uppercase"
              style={{ color: 'var(--color-text)' }}
            >
              Action Plan
            </h3>
            <ul className="space-y-3">
              {[
                'Nói mạch lạc hơn ở các câu liên quan quy trình xử lý sự cố.',
                'Giảm thiểu từ thừa (filler) ở đầu câu trả lời.',
                'Tốc độ (WPM) hiện tại ổn, giữ nguyên nhịp độ này.',
              ].map((act, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm font-medium"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <div
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{
                      background: 'var(--color-primary-muted)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {i + 1}
                  </div>
                  {act}
                </li>
              ))}
            </ul>
          </SurfaceCard>

          <Button
            variant="primary"
            onClick={onRetry}
            className="h-14 w-full justify-center gap-2 rounded-xl text-sm font-black shadow-md"
          >
            <RefreshCw size={18} /> Luyện tập lại
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function InterviewPage() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [mode, setMode] = useState<InterviewMode>('standard');
  const [results, setResults] = useState<QuestionResult[]>([]);

  const handleStart = (_file: File | null, selectedMode: InterviewMode) => {
    setMode(selectedMode);
    setPhase('interview');
  };

  const handleFinish = (finalResults: QuestionResult[]) => {
    setResults(finalResults);
    setPhase('analytics');
  };

  const handleRetry = () => {
    setResults([]);
    setPhase('setup');
  };

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      {phase !== 'setup' && (
        <div
          className="mb-6 flex items-center gap-3 text-sm font-medium"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <button
            onClick={handleRetry}
            className="transition-all hover:underline"
            style={{ color: 'var(--color-primary)' }}
          >
            Luyện tập
          </button>
          <span className="text-xs">&gt;</span>
          <span style={{ color: 'var(--color-text)' }} className="font-semibold">
            {phase === 'interview' ? 'Mock Interview đang diễn ra' : 'Báo cáo chi tiết'}
          </span>
        </div>
      )}

      {phase === 'setup' && <SetupPhase onStart={handleStart} />}
      {phase === 'interview' && <InterviewPhase mode={mode} onFinish={handleFinish} />}
      {phase === 'analytics' && (
        <AnalyticsPhase results={results} mode={mode} onRetry={handleRetry} />
      )}
    </div>
  );
}
