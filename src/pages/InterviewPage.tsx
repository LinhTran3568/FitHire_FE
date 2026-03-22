import { Button } from '@components/ui';
import {
  AlertCircle,
  ArrowRight,
  Brain,
  CheckCircle,
  ChevronRight,
  Lightbulb,
  Mic,
  MicOff,
  Play,
  RefreshCw,
  SkipForward,
  Speaker,
  Star,
  TrendingUp,
  User,
  Volume2,
  X,
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
    <div className="flex items-end justify-center gap-[3px] h-12">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all"
          style={{
            width: 4,
            background: active ? 'var(--color-primary)' : 'var(--color-border-strong)',
            height: active ? `${Math.sin(i * 0.9) * 24 + 16}px` : '8px',
            animation: active ? `wave-bar ${0.6 + i * 0.1}s ease-in-out infinite alternate` : 'none',
            animationDelay: `${i * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
}

function RadarChart({ scores }: { scores: number[] }) {
  const cx = 120, cy = 120, r = 80;
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
    <svg viewBox="0 0 240 240" className="w-full max-w-[220px] mx-auto">
      {/* Grid rings */}
      {[25, 50, 75, 100].map(pct => {
        const pts = axes.map((_, i) => getPoint(pct, i));
        return <path key={pct} d={toPath(pts)} fill="none" stroke="var(--color-border)" strokeWidth={1} />;
      })}
      {/* Axis lines */}
      {outerPoints.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--color-border)" strokeWidth={1} />
      ))}
      {/* Score fill */}
      <path d={toPath(scorePoints)} fill="var(--color-primary)" fillOpacity={0.2} stroke="var(--color-primary)" strokeWidth={2} />
      {/* Score dots */}
      {scorePoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="var(--color-primary)" />
      ))}
      {/* Axis labels */}
      {outerPoints.map((p, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const lx = cx + (r + 22) * Math.cos(angle);
        const ly = cy + (r + 22) * Math.sin(angle);
        return (
          <text
            key={i}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={8}
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
  const color = isFast ? '#ef4444' : isGood ? '#10b981' : '#f59e0b';
  const label = isFast ? 'QUÁ NHANH' : isGood ? 'TỐT' : wpm === 0 ? '—' : 'THỬ NÓI';

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span style={{ color: 'var(--color-text-muted)' }}>Nhịp nói (WPM)</span>
        <span className="font-bold" style={{ color }}>{wpm > 0 ? wpm : '—'}</span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--color-border-strong)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, #10b981 60%, #f59e0b 80%, #ef4444 100%)`,
            filter: isFast ? 'brightness(1.2)' : 'none',
          }}
        />
      </div>
      <div className="flex justify-between text-[10px]" style={{ color: 'var(--color-text-subtle)' }}>
        <span>Chậm</span>
        <span className="font-semibold" style={{ color }}>{label}</span>
        <span>Quá nhanh</span>
      </div>
    </div>
  );
}

function FillerTracker({ counts }: { counts: LiveMetrics['fillerCount'] }) {
  const items = [
    { label: '"À..."', count: counts.a, color: '#f59e0b' },
    { label: '"Ừm..."', count: counts.um, color: '#8b5cf6' },
    { label: '"Ờ..."', count: counts.er, color: '#ef4444' },
  ];
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
        Từ thừa (Filler)
      </p>
      <div className="flex gap-3">
        {items.map(item => (
          <div key={item.label} className="flex flex-col items-center gap-0.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black text-white"
              style={{ background: item.count > 0 ? item.color : 'var(--color-border-strong)' }}
            >
              {item.count}
            </div>
            <span className="text-[10px]" style={{ color: 'var(--color-text-subtle)' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Device Check Modal ──────────────────────────────────────────────────────
function DeviceCheckModal({ onClose }: { onClose: () => void }) {
  const [micOk, setMicOk] = useState(false);
  const [speakerOk, setSpeakerOk] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMicOk(true), 1200);
    const t2 = setTimeout(() => setSpeakerOk(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}>
      <div className="relative w-full max-w-sm rounded-3xl p-6 space-y-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xl)' }}>
        <button className="absolute right-4 top-4 rounded-lg p-1 transition hover:opacity-70" onClick={onClose} style={{ color: 'var(--color-text-muted)' }}>
          <X size={18} />
        </button>
        <div>
          <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>Kiểm tra thiết bị</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Đảm bảo mic và loa hoạt động trước khi bắt đầu.</p>
        </div>
        <div className="space-y-3">
          {[
            { icon: Mic, label: 'Microphone', ok: micOk },
            { icon: Speaker, label: 'Loa / Headphone', ok: speakerOk },
          ].map(({ icon: Icon, label, ok }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl p-3" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: ok ? 'rgba(16,185,129,0.15)' : 'var(--color-primary-muted)', color: ok ? '#10b981' : 'var(--color-primary)' }}>
                <Icon size={17} />
              </div>
              <span className="flex-1 text-sm font-medium" style={{ color: 'var(--color-text)' }}>{label}</span>
              {ok ? (
                <CheckCircle size={18} className="text-emerald-500" />
              ) : (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }} />
              )}
            </div>
          ))}
        </div>
        <Button className="w-full font-bold" variant="primary" onClick={onClose} disabled={!micOk || !speakerOk}>
          {micOk && speakerOk ? 'Xác nhận & Tiếp tục' : 'Đang kiểm tra...'}
        </Button>
      </div>
    </div>
  );
}

// ─── Phase 1: Setup ──────────────────────────────────────────────────────────
const INTERVIEW_MILESTONES = [
  { step: 1, label: 'Giới thiệu', desc: 'Tự giới thiệu bản thân & mục tiêu nghề nghiệp', color: '#6366f1', emoji: '👋' },
  { step: 2, label: 'Kinh nghiệm', desc: 'Kể về dự án và công việc đã làm (STAR method)', color: '#0d9488', emoji: '💼' },
  { step: 3, label: 'Tình huống', desc: 'Xử lý tình huống thực tế trong công việc', color: '#f59e0b', emoji: '⚡' },
  { step: 4, label: 'Kỹ năng', desc: 'Chứng minh năng lực chuyên môn phù hợp JD', color: '#0891b2', emoji: '🛠️' },
  { step: 5, label: 'Thách thức', desc: 'Chia sẻ về thất bại và bài học rút ra', color: '#8b5cf6', emoji: '🔥' },
  { step: 6, label: 'Tổng kết', desc: 'Câu hỏi kết thúc & kỳ vọng về vị trí ứng tuyển', color: '#10b981', emoji: '🎯' },
];

function SetupPhase({ onStart }: { onStart: () => void }) {
  const [hasCV, setHasCV] = useState(false);
  const [jd, setJd] = useState('');
  const [showDeviceCheck, setShowDeviceCheck] = useState(false);
  const [deviceChecked, setDeviceChecked] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type === 'application/pdf') setHasCV(true);
  };

  return (
    <>
      {showDeviceCheck && (
        <DeviceCheckModal onClose={() => { setShowDeviceCheck(false); setDeviceChecked(true); }} />
      )}

      <div className="mx-auto max-w-3xl space-y-6 py-4">
        {/* Hero */}
        <div
          className="relative overflow-hidden rounded-3xl p-7 text-white"
          style={{ background: 'var(--hero-bg)' }}
        >
          <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full blur-3xl" style={{ background: 'var(--hero-orb-a)', opacity: 0.5 }} />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-sm font-semibold opacity-80 mb-3">
              <Mic size={15} /> Phỏng vấn giả lập — AI Interview Room
            </div>
            <h1 className="text-3xl font-black">Bước vào phòng phỏng vấn AI</h1>
            <p className="mt-2 text-sm opacity-70 max-w-lg">
              Upload CV, dán JD, chọn chế độ và bắt đầu. AI sẽ hỏi, lắng nghe, đánh giá nhịp nói và cho phản hồi chi tiết.
            </p>
          </div>
        </div>

        {/* CV + JD row */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* CV Drop */}
          <div>
            <p className="mb-2 text-sm font-semibold" style={{ color: 'var(--color-text)' }}>CV của bạn (PDF)</p>
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => setHasCV(true)}
              className="flex flex-col cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 transition-all hover:scale-[1.01]"
              style={{
                borderColor: hasCV ? '#10b981' : 'var(--color-border-strong)',
                background: hasCV ? 'rgba(16,185,129,0.07)' : 'var(--color-surface)',
              }}
            >
              {hasCV ? (
                <>
                  <CheckCircle size={32} className="text-emerald-500" />
                  <p className="text-sm font-semibold text-emerald-600">CV đã tải lên!</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>my_cv_2025.pdf</p>
                </>
              ) : (
                <>
                  <User size={28} style={{ color: 'var(--color-text-subtle)' }} />
                  <p className="text-sm font-medium text-center" style={{ color: 'var(--color-text-muted)' }}>
                    Kéo thả CV (PDF)<br />hoặc <span style={{ color: 'var(--color-primary)' }}>click để chọn file</span>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* JD textarea */}
          <div>
            <p className="mb-2 text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Mô tả công việc (JD)</p>
            <textarea
              rows={6}
              value={jd}
              onChange={e => setJd(e.target.value)}
              placeholder="Dán nội dung Job Description vào đây... AI sẽ tạo câu hỏi phù hợp với JD."
              className="w-full resize-none rounded-2xl p-4 text-sm outline-none transition"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
            />
          </div>
        </div>

        {/* Interview milestones */}
        <div>
          <p className="mb-3 text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Hành trình phỏng vấn — 6 mốc</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {INTERVIEW_MILESTONES.map((m, i) => (
              <div
                key={m.step}
                className="flex items-start gap-3 rounded-2xl p-3"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white"
                  style={{ background: m.color }}
                >
                  {m.step}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                    {m.emoji} {m.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {m.desc}
                  </p>
                </div>
                {i < INTERVIEW_MILESTONES.length - 1 && (
                  <div className="absolute" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant="outline"
            onClick={() => setShowDeviceCheck(true)}
          >
            {deviceChecked ? <CheckCircle size={15} className="text-emerald-500" /> : <Volume2 size={15} />}
            {deviceChecked ? 'Thiết bị OK' : 'Kiểm tra thiết bị'}
          </Button>
          <Button
            variant="primary"
            className="font-bold px-8"
            onClick={() => onStart()}
          >
            <Play size={15} />
            Bắt đầu phỏng vấn
            <ArrowRight size={15} />
          </Button>
        </div>

        <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>
          * CV và JD chỉ dùng cho demo — không cần upload thật để bắt đầu luyện tập.
        </p>
      </div>
    </>
  );
}

// ─── Phase 2: Interview ───────────────────────────────────────────────────────
function InterviewPhase({
  mode,
  onFinish,
}: {
  mode: InterviewMode;
  onFinish: (results: QuestionResult[]) => void;
}) {
  const questions = QUESTIONS[mode];
  const [qIdx, setQIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [micOn, setMicOn] = useState(true);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(true);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [metrics, setMetrics] = useState<LiveMetrics>({ wpm: 0, fillerCount: { a: 0, um: 0, er: 0 }, starMoments: [] });
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Simulate AI finishing speaking after mount
  useEffect(() => {
    const t = setTimeout(() => setIsAISpeaking(false), 2500);
    return () => clearTimeout(t);
  }, [qIdx]);

  // Simulate live WPM as user types
  useEffect(() => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
    if (answer.length > 5) {
      typingTimer.current = setTimeout(() => {
        const wordCount = answer.trim().split(/\s+/).length;
        const simWPM = Math.min(80 + wordCount * 8, 195);
        const newA = (answer.match(/\bà\b|\bạ\b/gi) || []).length;
        const newUm = (answer.match(/\bừm\b|\bum\b/gi) || []).length;
        const newEr = (answer.match(/\bờ\b|\beh\b/gi) || []).length;
        setMetrics(prev => ({
          ...prev,
          wpm: simWPM,
          fillerCount: { a: newA, um: newUm, er: newEr },
        }));
      }, 400);
    } else {
      setMetrics(prev => ({ ...prev, wpm: 0 }));
    }
    return () => { if (typingTimer.current) clearTimeout(typingTimer.current); };
  }, [answer]);

  const handleSubmit = useCallback(() => {
    if (!answer.trim()) return;
    const wordCount = answer.trim().split(/\s+/).length;
    const score = Math.min(40 + wordCount * 2 + (answer.includes('kết quả') ? 15 : 0) + (answer.match(/\d/) ? 10 : 0), 98);
    const isStarMoment = score > 75;

    const result: QuestionResult = {
      question: questions[qIdx],
      answer,
      score,
      duration: 30 + Math.round(Math.random() * 60),
      wpm: metrics.wpm || 130,
      isStarMoment,
    };

    const newResults = [...results, result];
    setResults(newResults);
    setAnswer('');
    setMetrics({ wpm: 0, fillerCount: { a: 0, um: 0, er: 0 }, starMoments: [] });

    if (qIdx >= questions.length - 1) {
      onFinish(newResults);
      return;
    }

    setIsAIThinking(true);
    setTimeout(() => {
      setIsAIThinking(false);
      setIsAISpeaking(true);
      setQIdx(prev => prev + 1);
    }, 1800);
  }, [answer, qIdx, questions, results, metrics.wpm, onFinish]);

  const handleSkip = () => {
    const result: QuestionResult = {
      question: questions[qIdx],
      answer: '(Bỏ qua)',
      score: 0,
      duration: 0,
      wpm: 0,
      isStarMoment: false,
    };
    const newResults = [...results, result];
    setResults(newResults);

    if (qIdx >= questions.length - 1) {
      onFinish(newResults);
      return;
    }

    setIsAIThinking(true);
    setTimeout(() => {
      setIsAIThinking(false);
      setIsAISpeaking(true);
      setQIdx(prev => prev + 1);
    }, 1200);
    setAnswer('');
  };

  const progress = ((qIdx) / questions.length) * 100;

  return (
    <div className="space-y-4">
      <style>{`
        @keyframes wave-bar {
          0% { height: 8px; }
          100% { height: var(--bar-h, 36px); }
        }
        @keyframes thinking-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>

      {/* Progress bar header */}
      <div className="rounded-2xl p-4 space-y-2" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
            Câu {qIdx + 1}/{questions.length} — Phỏng vấn chuẩn</span>
          <span style={{ color: 'var(--color-text-muted)' }}>{Math.round(progress)}% hoàn thành</span>
        </div>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className="h-2 flex-1 rounded-full transition-all duration-500"
              style={{
                background: i < qIdx ? 'var(--color-primary)' : i === qIdx ? 'var(--color-primary)' : 'var(--color-border-strong)',
                opacity: i === qIdx ? 1 : i < qIdx ? 0.7 : 0.3,
              }}
            />
          ))}
        </div>
        <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>
          {qIdx === 0 ? 'Giới thiệu' : qIdx === 1 ? 'Kinh nghiệm' : qIdx === 2 ? 'Tình huống' : qIdx === 3 ? 'Kỹ năng' : qIdx === 4 ? 'Thách thức' : 'Tổng kết'}
        </p>
      </div>

      {/* Main 70/30 split */}
      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        {/* LEFT – Focus Area */}
        <div className="space-y-4">
          {/* AI Avatar Panel */}
          <div
            className="rounded-3xl p-6 space-y-5"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
          >
            {/* AI Avatar header */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: 'linear-gradient(135deg, var(--color-primary), #6366f1)' }}>
                <Brain size={22} className="text-white" />
                {isAISpeaking && (
                  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
                )}
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>FitHire AI Interviewer</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {isAIThinking ? '🧠 Đang suy nghĩ...' : isAISpeaking ? '🎙 Đang hỏi...' : '👂 Đang lắng nghe'}
                </p>
              </div>
              <div className="ml-auto">
                {isAIThinking ? (
                  <div className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold" style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}>
                    <div className="h-2 w-2 rounded-full" style={{ background: 'var(--color-primary)', animation: 'thinking-pulse 1s ease-in-out infinite' }} />
                    Đang xử lý
                  </div>
                ) : (
                  <div className="rounded-xl px-3 py-1.5 text-xs font-semibold" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}>
                    LIVE
                  </div>
                )}
              </div>
            </div>

            {/* Sound wave */}
            <AISoundWave active={isAISpeaking || isAIThinking} />

            {/* Current question subtitle */}
            <div className="rounded-2xl p-4" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>CÂU HỎI HIỆN TẠI</p>
              <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--color-text)' }}>
                {questions[qIdx]}
              </p>
            </div>

            {/* STAR reminder */}
            <div className="flex items-start gap-2 rounded-xl px-3 py-2" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <Lightbulb size={14} className="mt-0.5 shrink-0" style={{ color: '#f59e0b' }} />
              <p className="text-xs" style={{ color: '#b45309' }}>{STAR_REMINDER}</p>
            </div>
          </div>

          {/* Answer box */}
          <div className="rounded-2xl p-4 space-y-3" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg" style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}>
                <User size={13} />
              </div>
              <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>CÂU TRẢ LỜI CỦA BẠN</p>
              <div className="ml-auto flex items-center gap-1.5">
                <button
                  onClick={() => setMicOn(o => !o)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:opacity-80"
                  style={{ background: micOn ? 'rgba(16,185,129,0.15)' : 'var(--color-border-strong)', color: micOn ? '#10b981' : 'var(--color-text-muted)' }}
                >
                  {micOn ? <Mic size={13} /> : <MicOff size={13} />}
                </button>
                <span className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>
                  {micOn ? 'Mic bật' : 'Mic tắt'}
                </span>
              </div>
            </div>
            <textarea
              rows={4}
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="Nhập câu trả lời của bạn, hoặc bật mic để nói trực tiếp..."
              className="w-full resize-none bg-transparent text-sm outline-none"
              style={{ color: 'var(--color-text)' }}
            />
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={handleSkip}
                className="flex items-center gap-1.5 text-xs font-medium transition hover:opacity-70"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <SkipForward size={13} />
                Bỏ qua câu này
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>
                  {answer.trim().split(/\s+/).filter(Boolean).length} từ
                </span>
                <Button size="sm" variant="primary" onClick={handleSubmit} disabled={!answer.trim() || isAIThinking}>
                  <ChevronRight size={14} />
                  {qIdx >= questions.length - 1 ? 'Kết thúc' : 'Câu tiếp theo'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT – Live Coach Panel */}
        <div className="space-y-4">
          {/* Pacing */}
          <div className="rounded-2xl p-4 space-y-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
              Live Coach
            </p>
            <PacingMeter wpm={metrics.wpm} />
            <div className="h-px" style={{ background: 'var(--color-border)' }} />
            <FillerTracker counts={metrics.fillerCount} />
          </div>

          {/* AI Hint */}
          <div className="rounded-2xl p-4 space-y-3" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Gợi ý AI</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Hãy bắt đầu bằng <strong>bối cảnh</strong> (Situation), sau đó nêu rõ nhiệm vụ của bạn (Task), hành động cụ thể (Action) và kết quả đo lường được (Result).
            </p>
            <Button variant="outline" size="sm" className="w-full">
              <Lightbulb size={13} />
              Gợi ý thêm
            </Button>
          </div>

          {/* Session stats */}
          <div className="rounded-2xl p-4 space-y-2" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Tiến độ</p>
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ background: r.isStarMoment ? '#f59e0b' : r.score > 50 ? '#10b981' : '#94a3b8' }} />
                <span className="text-xs flex-1" style={{ color: 'var(--color-text-muted)' }}>Câu {i + 1}</span>
                <span className="text-xs font-bold" style={{ color: r.score > 70 ? '#10b981' : r.score > 50 ? '#f59e0b' : '#ef4444' }}>
                  {r.score > 0 ? `${r.score}/100` : '—'}
                </span>
                {r.isStarMoment && <Star size={11} className="text-amber-400" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Phase 3: Analytics ───────────────────────────────────────────────────────
function AnalyticsPhase({ results, mode, onRestart }: { results: QuestionResult[]; mode: InterviewMode; onRestart: () => void }) {
  const avg = Math.round(results.reduce((s, r) => s + r.score, 0) / Math.max(results.length, 1));
  const radarScores = [
    Math.min(avg + 5, 98),
    Math.min(avg - 8, 90),
    Math.min(avg + 12, 98),
    Math.min(avg - 3, 95),
    Math.min(avg + 7, 98),
  ];

  const totalTime = results.reduce((s, r) => s + r.duration, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="relative overflow-hidden rounded-3xl p-6 text-white"
        style={{ background: 'var(--hero-bg)' }}
      >
        <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl" style={{ background: 'var(--hero-orb-a)', opacity: 0.4 }} />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm opacity-70 mb-1">Phân tích kết quả</p>
            <h1 className="text-2xl font-black">Phỏng vấn hoàn thành! 🎉</h1>
            <p className="mt-1 text-sm opacity-60">
              {results.length} câu · {Math.floor(totalTime / 60)}p {totalTime % 60}s
            </p>
          </div>
          <div className="flex gap-3">
            <div className="text-center rounded-2xl px-5 py-3" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <p className="text-3xl font-black">{avg}</p>
              <p className="text-xs opacity-60 mt-0.5">Điểm TB</p>
            </div>
            <div className="text-center rounded-2xl px-5 py-3" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <p className="text-3xl font-black">{results.filter(r => r.isStarMoment).length}</p>
              <p className="text-xs opacity-60 mt-0.5">⭐ Star</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        {/* Radar chart */}
        <div className="space-y-4">
          <div className="rounded-3xl p-5 space-y-3" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Biểu đồ kỹ năng</p>
            <RadarChart scores={radarScores} />
            <div className="space-y-1.5">
              {RADAR_AXES.map((axis, i) => (
                <div key={axis} className="flex items-center justify-between text-xs">
                  <span style={{ color: 'var(--color-text-muted)' }}>{axis}</span>
                  <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{radarScores[i]}</span>
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={onRestart}>
            <RefreshCw size={14} />
            Luyện tập lại
          </Button>
        </div>

        {/* Timeline + per-answer */}
        <div className="space-y-5">
          {/* Timeline */}
          <div className="rounded-3xl p-5 space-y-3" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} style={{ color: 'var(--color-primary)' }} />
              <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Timeline phỏng vấn</p>
            </div>
            <div className="flex h-10 gap-1 items-end">
              {results.map((r, i) => {
                const isFast = r.wpm > 180;
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-t-lg relative group cursor-pointer"
                    style={{
                      height: `${30 + r.score * 0.4}px`,
                      background: isFast ? '#ef4444' : r.isStarMoment ? '#f59e0b' : r.score > 60 ? 'var(--color-primary)' : '#94a3b8',
                    }}
                    title={`Câu ${i + 1}: ${r.score} điểm`}
                  >
                    {r.isStarMoment && (
                      <Star size={10} className="absolute -top-4 left-1/2 -translate-x-1/2 text-amber-500" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3 text-xs flex-wrap" style={{ color: 'var(--color-text-muted)' }}>
              <span className="flex items-center gap-1"><span className="h-2 w-3 rounded bg-red-400 inline-block" /> Nói nhanh</span>
              <span className="flex items-center gap-1"><span className="h-2 w-3 rounded bg-amber-400 inline-block" /> ⭐ Xuất sắc</span>
              <span className="flex items-center gap-1"><span className="h-2 w-3 rounded inline-block" style={{ background: 'var(--color-primary)' }} /> Tốt</span>
              <span className="flex items-center gap-1"><span className="h-2 w-3 rounded bg-slate-400 inline-block" /> Cần cải thiện</span>
            </div>
          </div>

          {/* Per-answer cards */}
          <div className="space-y-3">
            {results.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 space-y-2"
                style={{ background: 'var(--color-surface)', border: `1px solid ${r.isStarMoment ? 'rgba(245,158,11,0.4)' : 'var(--color-border)'}` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold rounded-lg px-2 py-0.5" style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}>
                      Câu {i + 1}
                    </span>
                    {r.isStarMoment && <span className="text-xs">⭐ Xuất sắc</span>}
                  </div>
                  <span className="text-sm font-black" style={{ color: r.score > 75 ? '#10b981' : r.score > 50 ? '#f59e0b' : '#ef4444' }}>
                    {r.score > 0 ? `${r.score}/100` : 'Bỏ qua'}
                  </span>
                </div>
                <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{r.question}</p>
                {r.answer !== '(Bỏ qua)' && (
                  <p className="text-xs leading-relaxed p-2 rounded-xl" style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)' }}>
                    {r.answer.slice(0, 120)}{r.answer.length > 120 ? '...' : ''}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-xs gap-1">
                    <Zap size={11} />
                    AI Shadowing
                  </Button>
                  <span className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>
                    {r.wpm > 0 ? `${r.wpm} WPM` : ''} {r.duration > 0 ? `· ${r.duration}s` : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-4 flex items-center gap-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <AlertCircle size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Muốn nâng cao hơn?</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Nâng cấp lên Plus/Pro để phỏng vấn thực chiến với GPT-4o và voice AI.</p>
            </div>
            <Button size="sm" variant="primary">Xem gói</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function InterviewPage() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [results, setResults] = useState<QuestionResult[]>([]);

  const handleStart = () => {
    setPhase('interview');
  };

  const handleFinish = (res: QuestionResult[]) => {
    setResults(res);
    setPhase('analytics');
  };

  const handleRestart = () => {
    setResults([]);
    setPhase('setup');
  };

  return (
    <div className="space-y-0">
      {phase === 'setup' && <SetupPhase onStart={handleStart} />}
      {phase === 'interview' && <InterviewPhase mode="standard" onFinish={handleFinish} />}
      {phase === 'analytics' && <AnalyticsPhase results={results} mode="standard" onRestart={handleRestart} />}
    </div>
  );
}
