import { Button } from '@components/ui';
import { ArrowRight, CheckCircle, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Types ──────────────────────────────────────────────────────────────────
type Step = 'hook' | 'survey' | 'matching' | 'result';

interface SliderQuestion {
  id: string;
  leftLabel: string;
  rightLabel: string;
  leftKeyword: string;
  rightKeyword: string;
  leftCompanies: string[];
  rightCompanies: string[];
}

interface CompanyMatch {
  name: string;
  emoji: string;
  match: number;
  tagline: string;
  color: string;
  radarScores: number[];
  whyFit: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const ECOSYSTEMS = [
  { label: 'Fintech', emoji: '💳', color: '#0891b2', desc: 'MoMo, VNPay, Timo' },
  { label: 'Ecommerce', emoji: '🛒', color: '#f59e0b', desc: 'Tiki, Shopee, Lazada' },
  { label: 'SaaS', emoji: '⚙️', color: '#8b5cf6', desc: 'Base.vn, KiotViet, Misa' },
  { label: 'Big Tech', emoji: '🎮', color: '#0d9488', desc: 'VNG, FPT, Axon' },
];

const SURVEY_QUESTIONS: SliderQuestion[] = [
  {
    id: 'q1',
    leftLabel: 'Tôi thích quy trình rõ ràng, bài bản',
    rightLabel: 'Tôi thích tự chủ, tự tạo quy trình',
    leftKeyword: 'Quy trình',
    rightKeyword: 'Tự chủ',
    leftCompanies: ['VNPT', 'Viettel'],
    rightCompanies: ['Base.vn', 'One Mount'],
  },
  {
    id: 'q2',
    leftLabel: 'Ổn định lâu dài quan trọng hơn',
    rightLabel: 'Thách thức và tốc độ quan trọng hơn',
    leftKeyword: 'Ổn định',
    rightKeyword: 'Tốc độ',
    leftCompanies: ['FPT', 'Vietcombank'],
    rightCompanies: ['VNG', 'MoMo'],
  },
  {
    id: 'q3',
    leftLabel: 'Tôi làm việc tốt hơn trong tập thể lớn',
    rightLabel: 'Tôi thích nhóm nhỏ, ra quyết định nhanh',
    leftKeyword: 'Tập thể',
    rightKeyword: 'Nhóm nhỏ',
    leftCompanies: ['Viettel', 'BIDV'],
    rightCompanies: ['Startups', 'Base.vn'],
  },
  {
    id: 'q4',
    leftLabel: 'Tôi ưu tiên sản phẩm hoàn chỉnh rồi mới ra mắt',
    rightLabel: 'Tôi thích ra mắt nhanh rồi cải tiến dần',
    leftKeyword: 'Hoàn chỉnh',
    rightKeyword: 'MVP nhanh',
    leftCompanies: ['Tập đoàn lớn'],
    rightCompanies: ['Tiki', 'VNG'],
  },
  {
    id: 'q5',
    leftLabel: 'Tôi thích được hướng dẫn chi tiết khi nhận việc',
    rightLabel: 'Tôi thích chủ động nghiên cứu và đề xuất cách làm',
    leftKeyword: 'Hướng dẫn',
    rightKeyword: 'Chủ động',
    leftCompanies: ['Corporate'],
    rightCompanies: ['Startup', 'Base.vn'],
  },
  {
    id: 'q6',
    leftLabel: 'Kết quả đo lường bằng quy trình & tuân thủ',
    rightLabel: 'Kết quả đo lường bằng impact & outcome',
    leftKeyword: 'Tuân thủ',
    rightKeyword: 'Impact',
    leftCompanies: ['VNPT', 'Viettel'],
    rightCompanies: ['VNG', 'MoMo'],
  },
  {
    id: 'q7',
    leftLabel: 'Tôi thích môi trường cạnh tranh, thẳng thắn',
    rightLabel: 'Tôi thích môi trường hợp tác, hỗ trợ lẫn nhau',
    leftKeyword: 'Cạnh tranh',
    rightKeyword: 'Hợp tác',
    leftCompanies: ['Axon', 'Big4'],
    rightCompanies: ['Tiki', 'Kyna'],
  },
];

const RADAR_LABELS = ['Innovation', 'Discipline', 'Collaboration', 'Result-oriented', 'Customer-centric'];

const COMPANY_DATABASE: CompanyMatch[] = [
  {
    name: 'VNG', emoji: '🎮', match: 92, tagline: 'Đế chế gaming & tech Việt Nam',
    color: '#0d9488',
    radarScores: [95, 60, 75, 90, 80],
    whyFit: 'Bạn có tư duy tốc độ và sẵn sàng thử thách giống văn hoá "Move fast, break things" của VNG.',
  },
  {
    name: 'MoMo', emoji: '💙', match: 85, tagline: 'Fintech dẫn đầu thị trường',
    color: '#8b5cf6',
    radarScores: [88, 70, 85, 92, 95],
    whyFit: 'Obsession với trải nghiệm khách hàng và dữ liệu là điểm chung giữa bạn và MoMo.',
  },
  {
    name: 'Tiki', emoji: '🛒', match: 78, tagline: 'Ecommerce & logistics innovator',
    color: '#0891b2',
    radarScores: [75, 72, 88, 85, 90],
    whyFit: 'Phong cách làm việc cộng tác, customer-first của bạn phù hợp tốt với Tiki.',
  },
  {
    name: 'Base.vn', emoji: '⚙️', match: 72, tagline: 'SaaS quản trị doanh nghiệp',
    color: '#f59e0b',
    radarScores: [80, 65, 70, 88, 75],
    whyFit: 'Bạn có tư duy kết quả (Result, No Reasons) giống văn hoá của Base.vn.',
  },
];

// ─── Radar Chart SVG ─────────────────────────────────────────────────────────
function RadarChart({ scores, color = 'var(--color-primary)' }: { scores: number[]; color?: string }) {
  const cx = 110, cy = 110, r = 75;
  const n = RADAR_LABELS.length;
  const step = (2 * Math.PI) / n;

  const pt = (val: number, i: number) => {
    const a = i * step - Math.PI / 2;
    const d = (val / 100) * r;
    return { x: cx + d * Math.cos(a), y: cy + d * Math.sin(a) };
  };
  const outerPts = RADAR_LABELS.map((_, i) => pt(100, i));
  const scorePts = scores.map((s, i) => pt(s, i));
  const toD = (arr: { x: number; y: number }[]) =>
    arr.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + 'Z';

  return (
    <svg viewBox="0 0 220 220" className="w-full max-w-[200px] mx-auto">
      {([25, 50, 75, 100] as const).map(pct => (
        <path key={pct} d={toD(RADAR_LABELS.map((_, i) => pt(pct, i)))} fill="none" stroke="var(--color-border)" strokeWidth={1} />
      ))}
      {outerPts.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--color-border)" strokeWidth={1} />
      ))}
      <path d={toD(scorePts)} fill={color} fillOpacity={0.2} stroke={color} strokeWidth={2} />
      {scorePts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={color} />)}
      {outerPts.map((p, i) => {
        const a = i * step - Math.PI / 2;
        const lx = cx + (r + 20) * Math.cos(a);
        const ly = cy + (r + 20) * Math.sin(a);
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={7.5} fill="var(--color-text-muted)">
            {RADAR_LABELS[i]}
          </text>
        );
      })}
    </svg>
  );
}

// ─── Hook Screen ─────────────────────────────────────────────────────────────
function HookScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="mx-auto max-w-2xl space-y-8 py-8 text-center">
      <div
        className="relative overflow-hidden rounded-3xl px-8 py-12"
        style={{ background: 'var(--hero-bg)' }}
      >
        <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full blur-3xl" style={{ background: 'var(--hero-orb-a)', opacity: 0.4 }} />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full blur-3xl" style={{ background: 'var(--hero-orb-b)', opacity: 0.3 }} />
        <div className="relative z-10">
          <div className="text-4xl mb-4">🧭</div>
          <h1 className="text-3xl font-black text-white leading-tight">
            Tìm môi trường làm việc<br />
            <span style={{ color: '#5eead4' }}>"thuộc về"</span> bạn
          </h1>
          <p className="mt-3 text-sm text-white/60 max-w-md mx-auto">
            Bạn là một <strong className="text-white/80">Builder tự do</strong> hay một <strong className="text-white/80">Chiến binh kỷ luật</strong>? 
            7 câu hỏi, 2 phút, kết quả matching với 14 doanh nghiệp hàng đầu Việt Nam.
          </p>
        </div>
      </div>

      {/* Ecosystem icons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ECOSYSTEMS.map(eco => (
          <div
            key={eco.label}
            className="rounded-2xl p-4 transition-all hover:scale-105 hover:-translate-y-1 cursor-default"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <div className="text-2xl mb-2">{eco.emoji}</div>
            <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{eco.label}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-subtle)' }}>{eco.desc}</p>
          </div>
        ))}
      </div>

      <Button variant="primary" className="text-base px-8 py-3 font-black" onClick={onStart}>
        <Sparkles size={17} />
        Bắt đầu khám phá (2 phút)
        <ArrowRight size={17} />
      </Button>

      <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>
        Dựa trên nghiên cứu văn hoá từ báo cáo thường niên của 14 doanh nghiệp hàng đầu Việt Nam.
      </p>
    </div>
  );
}

// ─── Survey Screen ────────────────────────────────────────────────────────────
function SurveyScreen({ onComplete }: { onComplete: (answers: number[]) => void }) {
  const [qIdx, setQIdx] = useState(0);
  const [values, setValues] = useState<number[]>(Array(SURVEY_QUESTIONS.length).fill(50));
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const current = SURVEY_QUESTIONS[qIdx];
  const val = values[qIdx];
  const progress = ((qIdx + 1) / SURVEY_QUESTIONS.length) * 100;

  const updateValue = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setValues(prev => {
      const next = [...prev];
      next[qIdx] = Math.round(pct);
      return next;
    });
  }, [qIdx]);

  const handleMouseDown = (e: React.MouseEvent) => { setIsDragging(true); updateValue(e.clientX); };
  const handleMouseMove = useCallback((e: MouseEvent) => { if (isDragging) updateValue(e.clientX); }, [isDragging, updateValue]);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseup', handleMouseUp); };
  }, [handleMouseMove, handleMouseUp]);

  const handleTouch = (e: React.TouchEvent) => {
    updateValue(e.touches[0].clientX);
  };

  const handleNext = () => {
    if (qIdx < SURVEY_QUESTIONS.length - 1) setQIdx(i => i + 1);
    else onComplete(values);
  };

  const handlePrev = () => { if (qIdx > 0) setQIdx(i => i - 1); };

  // Derived keyword visibility
  const leftOpacity = val < 40 ? 1 : val < 50 ? 0.5 : 0.1;
  const rightOpacity = val > 60 ? 1 : val > 50 ? 0.5 : 0.1;

  return (
    <div className="mx-auto max-w-xl space-y-6 py-4">
      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <span>Câu {qIdx + 1} / {SURVEY_QUESTIONS.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full" style={{ background: 'var(--color-border-strong)' }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'var(--color-primary)' }} />
        </div>
      </div>

      {/* Question card */}
      <div className="rounded-3xl p-6 space-y-8" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
        <p className="text-center text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-subtle)' }}>
          Kéo thanh về phía bạn đồng ý hơn
        </p>

        {/* Opposing labels */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
          <div className="text-right space-y-1.5">
            <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--color-text)' }}>{current.leftLabel}</p>
            <div className="flex justify-end flex-wrap gap-1">
              {current.leftCompanies.map(c => (
                <span key={c} className="text-xs rounded-full px-2 py-0.5 transition-opacity duration-300"
                  style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)', opacity: leftOpacity }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="text-lg font-black" style={{ color: 'var(--color-text-subtle)' }}>VS</div>
          <div className="text-left space-y-1.5">
            <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--color-text)' }}>{current.rightLabel}</p>
            <div className="flex flex-wrap gap-1">
              {current.rightCompanies.map(c => (
                <span key={c} className="text-xs rounded-full px-2 py-0.5 transition-opacity duration-300"
                  style={{ background: 'rgba(13,148,136,0.12)', color: '#0d9488', opacity: rightOpacity }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Slider track */}
        <div className="space-y-3">
          <div
            ref={trackRef}
            className="relative h-5 cursor-pointer rounded-full select-none"
            style={{ background: 'var(--color-border-strong)' }}
            onMouseDown={handleMouseDown}
            onTouchMove={e => handleTouch(e)}
          >
            <div className="absolute inset-y-0 left-0 rounded-full transition-all"
              style={{ width: `${val}%`, background: 'linear-gradient(90deg, var(--color-primary), #6366f1)' }} />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-7 w-7 rounded-full shadow-lg transition-transform hover:scale-110 cursor-grab active:cursor-grabbing"
              style={{ left: `${val}%`, background: 'white', border: '2.5px solid var(--color-primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            />
          </div>

          {/* Keyword flash */}
          <div className="flex justify-between text-xs font-semibold">
            <span className="transition-opacity duration-300" style={{ color: 'var(--color-primary)', opacity: leftOpacity }}>
              ← {current.leftKeyword}
            </span>
            <span className="transition-opacity duration-300" style={{ color: '#0d9488', opacity: rightOpacity }}>
              {current.rightKeyword} →
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrev}
            disabled={qIdx === 0}
            className="flex items-center gap-1.5 text-sm font-medium disabled:opacity-30 transition hover:opacity-70"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <ChevronLeft size={16} /> Quay lại
          </button>
          <Button variant="primary" onClick={handleNext} className="font-bold px-6">
            {qIdx === SURVEY_QUESTIONS.length - 1 ? (
              <><CheckCircle size={14} /> Xem kết quả</>
            ) : (
              <>Tiếp theo <ChevronRight size={14} /></>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Matching Screen ──────────────────────────────────────────────────────────
function MatchingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentCompany, setCurrentCompany] = useState(0);
  const companies = ['VNG', 'MoMo', 'Tiki', 'Base.vn', 'Shopee', 'VNPT', 'Viettel', 'FPT', 'KiotViet', 'Misa', 'Axon', 'One Mount', 'Kyna', 'GrowthLab'];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(onDone, 600); return 100; }
        return p + 2;
      });
    }, 40);
    const compInterval = setInterval(() => {
      setCurrentCompany(c => (c + 1) % companies.length);
    }, 150);
    return () => { clearInterval(interval); clearInterval(compInterval); };
  }, [onDone, companies.length]);

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-8 text-center">
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--color-border-strong)" strokeWidth="5" />
          <circle
            cx="50" cy="50" r="44" fill="none"
            stroke="var(--color-primary)" strokeWidth="5" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 44}`}
            strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black" style={{ color: 'var(--color-text)' }}>{progress}%</span>
          <Sparkles size={13} style={{ color: 'var(--color-primary)' }} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Đang phân tích văn hoá...</h2>
        <p className="text-sm mt-1 font-mono" style={{ color: 'var(--color-primary)' }}>
          Scanning: {companies[currentCompany]}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-sm">
        {companies.map((c, i) => (
          <span
            key={c}
            className="text-xs rounded-full px-3 py-1 transition-all duration-200"
            style={{
              background: i === currentCompany ? 'var(--color-primary)' : 'var(--color-surface)',
              color: i === currentCompany ? 'white' : 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
              transform: i === currentCompany ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────
function ResultScreen({ answers }: { answers: number[] }) {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState(0);

  // Compute matches based on slider answers
  const scoredCompanies = COMPANY_DATABASE.map(company => {
    // Simplified scoring: companies with higher autonomy index match better with right-leaning answers
    const avgAnswer = answers.reduce((s, v) => s + v, 0) / answers.length;
    const autonomyBonus = company.name === 'VNG' || company.name === 'Base.vn' ? avgAnswer * 0.1 : (100 - avgAnswer) * 0.1;
    return { ...company, match: Math.min(98, Math.round(company.match + autonomyBonus - 5)) };
  }).sort((a, b) => b.match - a.match);

  const topCompany = scoredCompanies[selectedCompany] ?? scoredCompanies[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="relative overflow-hidden rounded-3xl p-7 text-white"
        style={{ background: 'var(--hero-bg)' }}
      >
        <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full blur-3xl" style={{ background: 'var(--hero-orb-a)', opacity: 0.4 }} />
        <div className="relative z-10">
          <div className="text-4xl mb-3">🎯</div>
          <h1 className="text-3xl font-black">
            You are a <span style={{ color: '#5eead4' }}>{topCompany.name}-er!</span>
          </h1>
          <p className="mt-2 text-base opacity-80 font-semibold">{topCompany.match}% Culture Match</p>
          <p className="mt-1 text-sm opacity-60 max-w-md">{topCompany.tagline}</p>
        </div>
      </div>

      {/* Company cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {scoredCompanies.map((company, i) => (
          <button
            key={company.name}
            onClick={() => setSelectedCompany(i)}
            className="rounded-2xl p-4 text-left transition-all hover:scale-[1.02]"
            style={{
              background: selectedCompany === i ? `${company.color}15` : 'var(--color-surface)',
              border: `2px solid ${selectedCompany === i ? company.color : 'var(--color-border)'}`,
            }}
          >
            <div className="text-2xl mb-2">{company.emoji}</div>
            <p className="font-bold text-sm" style={{ color: selectedCompany === i ? company.color : 'var(--color-text)' }}>{company.name}</p>
            <p className="text-xs font-black mt-1" style={{ color: company.color }}>{company.match}% Match</p>
          </button>
        ))}
      </div>

      {/* Detail dashboard */}
      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        {/* Radar */}
        <div className="rounded-3xl p-5 space-y-3" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Biểu đồ văn hoá</p>
          <RadarChart scores={topCompany.radarScores} color={topCompany.color} />
          <div className="space-y-1.5">
            {RADAR_LABELS.map((label, i) => (
              <div key={label} className="flex items-center justify-between text-xs">
                <span style={{ color: 'var(--color-text-muted)' }}>{label}</span>
                <span className="font-bold" style={{ color: topCompany.color }}>{topCompany.radarScores[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why fit + CTA */}
        <div className="space-y-4">
          {/* Why fit */}
          <div className="rounded-3xl p-5 space-y-3" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} style={{ color: topCompany.color }} />
              <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Tại sao bạn hợp với {topCompany.name}?</p>
            </div>
            <div className="rounded-2xl p-4" style={{ background: `${topCompany.color}10`, border: `1px solid ${topCompany.color}30` }}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {topCompany.whyFit}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {RADAR_LABELS.slice(0, 3).map((label, i) => (
                <span key={label} className="text-xs rounded-full px-3 py-1 font-semibold"
                  style={{ background: `${topCompany.color}15`, color: topCompany.color }}>
                  {label}: {topCompany.radarScores[i]}%
                </span>
              ))}
            </div>
          </div>

          {/* Match bar for others */}
          <div className="rounded-3xl p-5 space-y-3" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Các lựa chọn tiềm năng</p>
            {scoredCompanies.map((company, i) => (
              <div key={company.name} className="flex items-center gap-3">
                <span className="text-base w-7 text-center">{company.emoji}</span>
                <span className="text-xs font-semibold w-16 shrink-0" style={{ color: 'var(--color-text)' }}>{company.name}</span>
                <div className="flex-1 h-2 rounded-full" style={{ background: 'var(--color-border-strong)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${company.match}%`, background: i === 0 ? company.color : 'var(--color-border-strong)' }}
                  />
                </div>
                <span className="text-xs font-black w-12 text-right" style={{ color: i === 0 ? company.color : 'var(--color-text-muted)' }}>
                  {company.match}%
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="rounded-3xl p-5 flex items-center gap-4"
            style={{ background: `${topCompany.color}12`, border: `1px solid ${topCompany.color}30` }}
          >
            <div className="flex-1">
              <p className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>
                Luyện phỏng vấn theo phong cách {topCompany.name}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                AI sẽ hỏi theo văn hoá và phong cách tuyển dụng của {topCompany.name}.
              </p>
            </div>
            <Button variant="primary" onClick={() => navigate('/interview')} className="font-bold shrink-0">
              <Sparkles size={14} />
              Luyện ngay
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CultureMatchingPage() {
  const [step, setStep] = useState<Step>('hook');
  const [answers, setAnswers] = useState<number[]>([]);

  const handleSurveyComplete = (vals: number[]) => {
    setAnswers(vals);
    setStep('matching');
  };

  const handleMatchingDone = useCallback(() => {
    setStep('result');
  }, []);

  const handleRestart = () => {
    setAnswers([]);
    setStep('hook');
  };

  return (
    <div>
      {step !== 'hook' && step !== 'result' && (
        <div className="mb-4 flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          <button onClick={handleRestart} className="hover:opacity-70 transition">← Bắt đầu lại</button>
          <span>/</span>
          <span style={{ color: 'var(--color-text)' }}>
            {step === 'survey' ? 'Khảo sát' : step === 'matching' ? 'Phân tích...' : 'Kết quả'}
          </span>
        </div>
      )}

      {step === 'hook' && <HookScreen onStart={() => setStep('survey')} />}
      {step === 'survey' && <SurveyScreen onComplete={handleSurveyComplete} />}
      {step === 'matching' && <MatchingScreen onDone={handleMatchingDone} />}
      {step === 'result' && <ResultScreen answers={answers} />}
    </div>
  );
}
