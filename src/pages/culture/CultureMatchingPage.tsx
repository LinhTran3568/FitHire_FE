import { Button, SurfaceCard, Badge } from '@components/ui';
import { ArrowRight, CheckCircle, ChevronLeft, ChevronRight, Sparkles, Building2, Compass, Target, CreditCard, ShoppingCart, CloudCog, Gamepad2 } from 'lucide-react';
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
  icon: React.ElementType;
  match: number;
  tagline: string;
  color: string;
  radarScores: number[];
  whyFit: string;
  logoUrl?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const ECOSYSTEMS = [
  { label: 'Fintech', icon: CreditCard, color: 'var(--color-info)', bg: 'var(--color-info-light)', desc: 'MoMo, VNPay, ZaloPay' },
  { label: 'E-commerce', icon: ShoppingCart, color: 'var(--color-warning)', bg: 'var(--color-warning-light)', desc: 'Tiki, Shopee, Lazada' },
  { label: 'SaaS / B2B', icon: CloudCog, color: 'var(--color-primary)', bg: 'var(--color-primary-muted)', desc: 'Base.vn, KiotViet, Misa' },
  { label: 'Big Tech', icon: Gamepad2, color: 'var(--color-success)', bg: 'var(--color-success-light)', desc: 'VNG, FPT, CMC' },
];

const SURVEY_QUESTIONS: SliderQuestion[] = [
  { id: 'q1', leftLabel: 'Ưu tiên quy trình chuẩn mực, hệ thống và bài bản', rightLabel: 'Đề cao sự linh hoạt, tự chủ và quyền tự quyết định', leftKeyword: 'Quy trình chuẩn', rightKeyword: 'Linh hoạt & Tự chủ', leftCompanies: ['VNPT', 'Viettel', 'Techcombank'], rightCompanies: ['Base.vn', 'MoMo', 'Startups'] },
  { id: 'q2', leftLabel: 'Sự ổn định và phúc lợi dài hạn là ưu tiên hàng đầu', rightLabel: 'Cơ hội phát triển và thử thách mới là động lực chính', leftKeyword: 'Ổn định & Bền vững', rightKeyword: 'Thử thách & Tốc độ', leftCompanies: ['FPT', 'Vietcombank'], rightCompanies: ['VNG', 'Shopee'] },
  { id: 'q3', leftLabel: 'Cống hiến tốt nhất trong tập thể lớn, phân công rõ ràng', rightLabel: 'Tỏa sáng khi làm việc nhóm nhỏ, linh hoạt và tốc độ', leftKeyword: 'Tập đoàn lớn', rightKeyword: 'Mô hình Agile', leftCompanies: ['Viettel', 'VinGroup'], rightCompanies: ['KiotViet', 'Base.vn'] },
  { id: 'q4', leftLabel: 'Sản phẩm cần đạt sự hoàn thiện tuyệt đối trước khi ra mắt', rightLabel: 'Ưu tiên ra mắt nhanh (MVP) và cải thiện dựa trên dữ liệu', leftKeyword: 'Chất lượng tuyệt đối', rightKeyword: 'Tối ưu hóa tốc độ', leftCompanies: ['Ngân hàng', 'Outsource'], rightCompanies: ['Tiki', 'VNG'] },
  { id: 'q5', leftLabel: 'Mong muốn được đào tạo bài bản và có lộ trình rõ ràng', rightLabel: 'Ưu tiên tự nghiên cứu, đề xuất và đột phá hướng đi mới', leftKeyword: 'Đào tạo & Hướng dẫn', rightKeyword: 'Tự chủ nghiên cứu', leftCompanies: ['Logistics', 'Enterprise'], rightCompanies: ['Startups', 'Got It'] },
  { id: 'q6', leftLabel: 'Đánh giá dựa trên sự tuân thủ quy trình và kỷ luật chung', rightLabel: 'Đánh giá dựa trên kết quả thực tế và tác động (Impact)', leftKeyword: 'Kỷ luật & Quy trình', rightKeyword: 'Tập trung kết quả', leftCompanies: ['Công ty Nhà nước'], rightCompanies: ['VNG', 'MoMo', 'Base.vn'] },
];

const RADAR_LABELS = ['Innovation', 'Discipline', 'Collaboration', 'Result-led', 'Agility'];

const COMPANY_DATABASE: CompanyMatch[] = [
  { name: 'VNG', icon: Gamepad2, match: 92, tagline: 'Tập đoàn Công nghệ & Giải trí hàng đầu Việt Nam', color: 'var(--color-success)', radarScores: [95, 60, 75, 90, 85], whyFit: 'Bạn có phong cách làm việc quyết đoán, tốc độ và sẵn sàng đối mặt với thử thách, tương tự như văn hóa "Move fast, break things" của VNG.', logoUrl: 'https://logo.clearbit.com/vng.com.vn' },
  { name: 'MoMo', icon: CreditCard, match: 85, tagline: 'Siêu ứng dụng Fintech hàng đầu Việt Nam', color: 'var(--color-primary)', radarScores: [92, 70, 85, 95, 90], whyFit: 'Tư duy "Khách hàng là trọng tâm" kết hợp cùng khả năng ra quyết định dựa trên dữ liệu giúp bạn hoàn toàn hòa nhập với môi trường MoMo.', logoUrl: 'https://logo.clearbit.com/momo.vn' },
  { name: 'Tiki', icon: ShoppingCart, match: 78, tagline: 'Nền tảng Thương mại điện tử chất lượng cao', color: 'var(--color-info)', radarScores: [85, 65, 88, 85, 90], whyFit: 'Sự tỉ mỉ, tinh thần trách nhiệm và lòng nhiệt huyết trong công việc của bạn rất phù hợp với nhịp độ vận hành chuyên nghiệp của Tiki.', logoUrl: 'https://logo.clearbit.com/tiki.vn' },
  { name: 'Base.vn', icon: CloudCog, match: 72, tagline: 'Nền tảng quản trị vận hành doanh nghiệp (SaaS)', color: 'var(--color-warning)', radarScores: [88, 65, 75, 98, 80], whyFit: 'Khát khao tự chủ và tư duy hướng đến kết quả cuối cùng (Result, No Reasons) là những giá trị cốt lõi mà Base.vn luôn tìm kiếm.', logoUrl: 'https://logo.clearbit.com/base.vn' },
];

function CompanyLogo({ logoUrl, icon: Icon, name, size = 20, className = "" }: { logoUrl?: string; icon: React.ElementType; name: string; size?: number; className?: string }) {
  const [error, setError] = useState(false);
  
  if (!logoUrl || error) {
    return <Icon size={size} className={className} />;
  }

  return (
    <img 
      src={logoUrl} 
      alt={name} 
      className={`w-full h-full object-contain ${className}`}
      onError={() => setError(true)}
    />
  );
}

// ─── Radar Chart SVG ─────────────────────────────────────────────────────────
function RadarChart({ scores, color = 'var(--color-primary)' }: { scores: number[]; color?: string }) {
  const cx = 120, cy = 120, r = 80;
  const n = RADAR_LABELS.length;
  const step = (2 * Math.PI) / n;
  const pt = (val: number, i: number) => {
    const a = i * step - Math.PI / 2;
    const d = (val / 100) * r;
    return { x: cx + d * Math.cos(a), y: cy + d * Math.sin(a) };
  };
  const outerPts = RADAR_LABELS.map((_, i) => pt(100, i));
  const scorePts = scores.map((s, i) => pt(s, i));
  const toD = (arr: { x: number; y: number }[]) => arr.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + 'Z';

  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-[220px] mx-auto filter drop-shadow-sm">
      {([25, 50, 75, 100] as const).map(pct => (
        <path key={pct} d={toD(RADAR_LABELS.map((_, i) => pt(pct, i)))} fill="none" stroke="var(--color-border)" strokeWidth={1} />
      ))}
      {outerPts.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--color-border)" strokeWidth={1} strokeDasharray="2 2" />
      ))}
      <path d={toD(scorePts)} fill={color} fillOpacity={0.15} stroke={color} strokeWidth={2} />
      {scorePts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={4.5} fill="var(--color-surface)" stroke={color} strokeWidth={2} className="drop-shadow-sm" />)}
      {outerPts.map((_, i) => {
        const a = i * step - Math.PI / 2;
        const lx = cx + (r + 25) * Math.cos(a);
        const ly = cy + (r + 25) * Math.sin(a);
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={9} fontWeight={600} fill="var(--color-text-muted)">
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
    <div className="mx-auto max-w-4xl space-y-8 py-6 animate-in fade-in duration-500">
      <SurfaceCard className="relative overflow-hidden !p-10 border-0 shadow-lg text-center" style={{ background: 'var(--color-primary-muted)' }}>
        <div className="relative z-10 flex flex-col items-center">
          <Badge variant="primary" className="mb-4">
            <Compass size={14} className="mr-1.5" /> AI Matching Engine
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black mb-3" style={{ color: 'var(--color-primary)' }}>
             Culture Fit Check
          </h1>
          <p className="mt-2 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium" style={{ color: 'var(--color-text)' }}>
            Năng lực chuyên môn giúp bạn có việc làm, nhưng văn hóa phù hợp mới giúp bạn thăng tiến. 
            Xác định hệ sinh thái doanh nghiệp lý tưởng với 6 câu hỏi phân tích phong cách làm việc.
          </p>
          <Button variant="primary" className="mt-8 h-12 px-10 text-sm font-bold shadow-md text-white" onClick={onStart}>
            <span className="flex items-center gap-2">
               Bắt đầu đánh giá (2 phút) <ArrowRight size={16} />
            </span>
          </Button>
        </div>
      </SurfaceCard>

      <div className="text-center pt-4">
        <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'var(--color-text-subtle)' }}>Đối chiếu với 4 Ecosystem hàng đầu Việt Nam</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ECOSYSTEMS.map(eco => {
            const Icon = eco.icon;
            return (
            <SurfaceCard key={eco.label} className="!p-5 text-center transition-all hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl mx-auto mb-3" style={{ background: eco.bg, color: eco.color }}>
                <Icon size={24} className="drop-shadow-sm" />
              </div>
              <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{eco.label}</p>
              <p className="text-xs mt-1.5 font-medium" style={{ color: 'var(--color-text-muted)' }}>{eco.desc}</p>
            </SurfaceCard>
            );
          })}
        </div>
      </div>
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

  const handleTouch = (e: React.TouchEvent) => updateValue(e.touches[0].clientX);

  const handleNext = () => {
    if (qIdx < SURVEY_QUESTIONS.length - 1) setQIdx(i => i + 1);
    else onComplete(values);
  };
  const handlePrev = () => { if (qIdx > 0) setQIdx(i => i - 1); };

  const leftOpacity = val < 40 ? 1 : val < 50 ? 0.3 : 0.05;
  const rightOpacity = val > 60 ? 1 : val > 50 ? 0.3 : 0.05;

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6 animate-in fade-in duration-500">
      <SurfaceCard className="!p-5">
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="font-bold flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
            <span className="flex h-6 w-6 items-center justify-center rounded-md border" style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)', borderColor: 'var(--color-border)' }}>
              <Target size={14} />
            </span>
            <span>Phân tích Tương thích Văn hóa</span>
            <span className="mx-1" style={{ color: 'var(--color-text-subtle)' }}>/</span>
            <span style={{ color: 'var(--color-text-muted)' }}>Bước {qIdx + 1}</span>
          </span>
          <span className="font-bold border px-2 py-0.5 rounded-md" style={{ color: 'var(--color-primary)', borderColor: 'var(--color-border)' }}>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden border" style={{ background: 'var(--color-surface-raised)', borderColor: 'var(--color-border)' }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'var(--color-primary)' }} />
        </div>
      </SurfaceCard>

      <SurfaceCard className="!p-8">
        <p className="text-center text-[11px] font-black uppercase tracking-widest mb-10" style={{ color: 'var(--color-primary)' }}>
          Di chuyển thanh trượt theo mức độ ưu tiên của bạn
        </p>

        <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-start">
          <div className="text-right space-y-3">
            <h3 className="text-base md:text-lg font-bold leading-relaxed" style={{ color: 'var(--color-text)' }}>{current.leftLabel}</h3>
            <div className="flex flex-wrap justify-end gap-1.5">
              {current.leftCompanies.map(c => (
                <Badge key={c} variant="default" className="font-semibold" style={{ opacity: leftOpacity, transition: 'opacity 0.3s ease' }}>{c}</Badge>
              ))}
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl font-black text-sm border" style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>VS</div>
          <div className="text-left space-y-3">
            <h3 className="text-base md:text-lg font-bold leading-relaxed" style={{ color: 'var(--color-text)' }}>{current.rightLabel}</h3>
            <div className="flex flex-wrap justify-start gap-1.5">
              {current.rightCompanies.map(c => (
                <Badge key={c} variant="default" className="font-semibold" style={{ opacity: rightOpacity, transition: 'opacity 0.3s ease' }}>{c}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 mb-8">
          <div className="flex justify-between text-[11px] font-black tracking-widest uppercase mb-4 px-2">
            <span style={{ color: 'var(--color-success)', opacity: leftOpacity, transition: 'opacity 0.3s' }}>← {current.leftKeyword}</span>
            <span style={{ color: 'var(--color-primary)', opacity: rightOpacity, transition: 'opacity 0.3s' }}>{current.rightKeyword} →</span>
          </div>

          <div ref={trackRef} className="relative h-6 cursor-pointer rounded-full select-none" style={{ background: 'var(--color-border-strong)' }} onMouseDown={handleMouseDown} onTouchMove={e => handleTouch(e)}>
            <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-75" style={{ width: `${val}%`, background: 'var(--color-primary)' }} />
            <div className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full border-[3px] shadow-sm transition-transform ${isDragging ? 'scale-110' : 'hover:scale-105'} cursor-grab active:cursor-grabbing flex items-center justify-center`} style={{ left: `${val}%`, background: 'var(--color-surface)', borderColor: 'var(--color-primary)' }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-primary)' }} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 mt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <Button variant="outline" onClick={handlePrev} disabled={qIdx === 0} className="h-12 px-6 font-bold shadow-sm">
            <span className="flex items-center gap-1.5">
              <ChevronLeft size={16} /> Quay lại
            </span>
          </Button>
          <Button variant="primary" onClick={handleNext} className="h-12 px-8 font-bold shadow-md text-white">
            {qIdx === SURVEY_QUESTIONS.length - 1 ? (
              <span className="flex items-center gap-2">
                <CheckCircle size={18} /> Hoàn tất
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Tiếp theo <ChevronRight size={18} />
              </span>
            )}
          </Button>
        </div>
      </SurfaceCard>
    </div>
  );
}

// ─── Matching Screen ──────────────────────────────────────────────────────────
function MatchingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentCompany, setCurrentCompany] = useState(0);
  const companies = ['VNG', 'MoMo', 'Tiki', 'Base.vn', 'Shopee', 'VNPT', 'Viettel', 'FPT', 'KiotViet'];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(onDone, 600); return 100; }
        return p + 1.5;
      });
    }, 40);
    const compInterval = setInterval(() => {
      setCurrentCompany(c => (c + 1) % companies.length);
    }, 150);
    return () => { clearInterval(interval); clearInterval(compInterval); };
  }, [onDone, companies.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 gap-8 text-center animate-in zoom-in-95 duration-500">
      <div className="relative h-48 w-48">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--color-border)" strokeWidth="6" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--color-primary)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 44}`} strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`} style={{ transition: 'stroke-dashoffset 0.1s linear' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black" style={{ color: 'var(--color-primary)' }}>{Math.round(progress)}%</span>
        </div>
      </div>
      <div>
        <Badge variant="primary" className="mb-3 animate-pulse">AI Đang Đồng Bộ Dữ Liệu</Badge>
        <h2 className="text-2xl font-black mb-1" style={{ color: 'var(--color-text)' }}>Scanning Culture Engine...</h2>
        <p className="text-sm font-medium flex items-center justify-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
          <Building2 size={16} /> Đối chiếu với: <span className="font-bold border-b border-dashed" style={{ color: 'var(--color-text)' }}>{companies[currentCompany]}</span>
        </p>
      </div>
    </div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────
function ResultScreen({ answers }: { answers: number[] }) {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState(0);

  const scoredCompanies = COMPANY_DATABASE.map(company => {
    const avgAnswer = answers.reduce((s, v) => s + v, 0) / answers.length;
    const autonomyBonus = company.name === 'VNG' || company.name === 'Base.vn' ? avgAnswer * 0.1 : (100 - avgAnswer) * 0.1;
    return { ...company, match: Math.min(98, Math.round(company.match + autonomyBonus - 5)) };
  }).sort((a, b) => b.match - a.match);

  const topCompany = scoredCompanies[selectedCompany] ?? scoredCompanies[0];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
      
      {/* Hero Result */}
      <SurfaceCard className="relative overflow-hidden !p-10 border-0 shadow-lg" style={{ background: 'var(--color-primary-muted)' }}>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <Badge variant="primary" className="mb-4">
              <Sparkles size={14} className="mr-1.5" /> MỨC ĐỘ PHÙ HỢP CAO NHẤT
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-3" style={{ color: 'var(--color-text)' }}>
              Điểm đến văn hóa lý tưởng của bạn là <br />
              <span style={{ color: 'var(--color-primary)' }}>{topCompany.name}!</span>
            </h1>
            <p className="font-medium max-w-lg leading-relaxed text-sm md:text-base" style={{ color: 'var(--color-text-secondary)' }}>{topCompany.tagline}</p>
          </div>
          
          <div className="shrink-0 flex flex-col items-center justify-center p-6 rounded-[2rem] border bg-white shadow-sm min-w-[160px]" style={{ borderColor: 'var(--color-border)' }}>
             <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>Chỉ số Tương thích</p>
             <div className="flex items-center gap-3">
                <p className="text-5xl font-black" style={{ color: 'var(--color-primary)', fontFamily: 'Outfit, sans-serif' }}>{topCompany.match}%</p>
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white p-1 shadow-sm border" style={{ borderColor: 'var(--color-border)' }}>
                  <CompanyLogo 
                    logoUrl={topCompany.logoUrl} 
                    icon={topCompany.icon} 
                    name={topCompany.name} 
                    size={28} 
                    className="text-[var(--color-primary)]" 
                  />
                </div>
             </div>
          </div>
        </div>
      </SurfaceCard>

      {/* Ranks Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {scoredCompanies.map((company, i) => (
          <SurfaceCard
            key={company.name}
            onClick={() => setSelectedCompany(i)}
            className={`cursor-pointer transition-all duration-300 flex flex-col gap-3 ${selectedCompany === i ? 'shadow-md scale-[1.02]' : ''}`}
            style={{
              background: selectedCompany === i ? 'var(--color-primary-muted)' : 'var(--color-surface)',
              borderColor: selectedCompany === i ? 'var(--color-primary)' : 'var(--color-border)',
            }}
          >
            <div className="flex items-center justify-between">
               <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-white p-2 shadow-sm" style={{ borderColor: selectedCompany === i ? 'var(--color-primary)' : 'var(--color-border)' }}>
                 <CompanyLogo 
                   logoUrl={company.logoUrl} 
                   icon={company.icon} 
                   name={company.name} 
                   size={20} 
                   className="text-[var(--color-primary)]" 
                 />
               </div>
               {selectedCompany === i && <CheckCircle size={20} style={{ color: 'var(--color-primary)' }} className="drop-shadow-sm" />}
            </div>
            <div>
               <p className="font-bold text-base" style={{ color: 'var(--color-text)' }}>{company.name}</p>
               <div className="flex items-center gap-2 mt-1.5">
                 <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--color-border-strong)' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${company.match}%`, background: 'var(--color-primary)' }} />
                 </div>
                 <p className="text-xs font-black" style={{ color: 'var(--color-primary)' }}>{company.match}%</p>
               </div>
            </div>
          </SurfaceCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <SurfaceCard className="!p-6 flex flex-col items-center">
          <p className="w-full text-left text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
            <Compass size={16} style={{ color: 'var(--color-primary)' }} /> Đặc điểm lõi
          </p>
          <div className="w-full relative py-4">
             <RadarChart scores={topCompany.radarScores} color={topCompany.color} />
          </div>
          <div className="w-full space-y-2.5 mt-auto pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
            {RADAR_LABELS.map((label, i) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded border" style={{ color: 'var(--color-primary)', borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>{topCompany.radarScores[i]}%</span>
              </div>
            ))}
          </div>
        </SurfaceCard>

        {/* Why it fits */}
        <div className="space-y-6 flex flex-col">
          <SurfaceCard className="!p-6 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} style={{ color: 'var(--color-primary)' }} />
              <p className="text-base font-bold" style={{ color: 'var(--color-text)' }}>Tại sao {topCompany.name} phù hợp với bạn?</p>
            </div>
            
            <div className="p-5 rounded-2xl border mb-6" style={{ background: 'var(--color-surface-raised)', borderColor: 'var(--color-border)' }}>
              <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                "{topCompany.whyFit}"
              </p>
            </div>

            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-subtle)' }}>Các giá trị văn hoá tương đồng</p>
            <div className="flex flex-wrap gap-2.5">
              {['Tự chủ', 'Quyết liệt', 'Minh bạch', 'Dựa trên dữ liệu'].map(k => (
                <div key={k} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold" style={{ background: 'var(--color-surface-raised)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                  <CheckCircle size={12} style={{ color: 'var(--color-success)' }} /> {k}
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard className="!p-6 border-0 shadow-md" style={{ background: 'var(--color-primary-muted)' }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="inline-block px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md mb-3 border bg-white" style={{ color: 'var(--color-danger)', borderColor: 'var(--color-border)' }}>ACTION REQUIRED</span>
                <p className="font-black text-lg leading-tight" style={{ color: 'var(--color-primary)' }}>Luyện tập phỏng vấn theo <br />phong cách {topCompany.name}</p>
                <p className="text-sm font-medium mt-1" style={{ color: 'var(--color-text)' }}>Hệ thống AI sẽ mô phỏng lại format phỏng vấn đặc thù của doanh nghiệp này.</p>
              </div>
              <Button onClick={() => navigate('/interview')} variant="primary" className="h-12 px-6 font-bold shadow-sm shrink-0 whitespace-nowrap text-white">
                <span className="flex items-center gap-2">
                  Bắt đầu Luyện tập <ArrowRight size={16} />
                </span>
              </Button>
            </div>
          </SurfaceCard>
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
  const handleMatchingDone = useCallback(() => setStep('result'), []);
  const handleRestart = () => { setAnswers([]); setStep('hook'); };

  return (
    <div className="pb-10">
      {step !== 'hook' && step !== 'result' && (
        <div className="mb-6 flex items-center gap-3 text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>
          <button onClick={handleRestart} className="hover:underline transition-all flex items-center gap-1.5 focus:outline-none" style={{ color: 'var(--color-primary)' }}>
            <ChevronLeft size={16} /> Bắt đầu lại
          </button>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-border-strong)' }} />
          <span>{step === 'survey' ? 'Khảo sát nhanh' : 'Đang phân tích AI...'}</span>
        </div>
      )}

      {step === 'hook' && <HookScreen onStart={() => setStep('survey')} />}
      {step === 'survey' && <SurveyScreen onComplete={handleSurveyComplete} />}
      {step === 'matching' && <MatchingScreen onDone={handleMatchingDone} />}
      {step === 'result' && <ResultScreen answers={answers} />}
    </div>
  );
}
