import { Badge, Button, SurfaceCard } from '@components/ui';
import { sleep } from '@lib/utils';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  FileText,
  LoaderCircle,
  ScanSearch,
  Sparkles,
  UploadCloud,
  XCircle,
  Brain,
} from 'lucide-react';
import { useEffect, useState } from 'react';

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 1000;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress === 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display}</>;
}

export default function CvScoringPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<null | {
    score: number;
    missing: string[];
    matched: string[];
    breakdown: { label: string; score: number; desc: string }[];
  }>(null);

  const handleScan = async () => {
    if (!file) return alert('Vui lòng upload CV để phân tích!');
    setIsScanning(true);
    await sleep(2000);
    setResult({
      score: 82,
      missing: [
        'Action Verbs mạnh',
        'Số liệu cụ thể (Quantifiable data)',
        'Mục tiêu nghề nghiệp rõ ràng',
      ],
      matched: [
        'Bố cục chuyên nghiệp',
        'Thông tin liên lạc đầy đủ',
        'Kỹ năng chuyên môn tốt',
        'Học vấn phù hợp',
      ],
      breakdown: [
        {
          label: 'Bố cục & Trình bày',
          score: 95,
          desc: 'Font chữ và khoảng cách rất chuyên nghiệp.',
        },
        { label: 'Thông tin liên lạc', score: 100, desc: 'Đầy đủ Email, SĐT, LinkedIn, GitHub.' },
        {
          label: 'Nội dung Kinh nghiệm',
          score: 75,
          desc: 'Cần thêm các con số cụ thể về thành tựu.',
        },
        { label: 'Kỹ năng chuyên môn', score: 80, desc: 'Danh sách kỹ năng đa dạng và rõ ràng.' },
        {
          label: 'Tính tương thích ATS',
          score: 85,
          desc: 'Dễ dàng được đọc bởi các hệ thống lọc hồ sơ.',
        },
      ],
    });
    setIsScanning(false);
  };

  return (
    <div className="animate-in fade-in mx-auto max-w-6xl space-y-8 p-6 duration-500 lg:p-10">
      {/* Header */}
      <div className="bg-gradient-brand relative overflow-hidden rounded-3xl p-8 text-white shadow-xl">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 opacity-70 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[var(--color-primary-muted)] opacity-70 blur-2xl" />
        <div className="relative z-10 max-w-2xl">
          <Badge
            variant="primary"
            className="mb-4 border-[var(--color-primary)]/30 bg-[var(--color-primary-muted)] text-[var(--color-primary)]"
          >
            <Sparkles size={14} className="mr-1.5" /> AI Profile Audit
          </Badge>
          <h1 className="mb-3 text-3xl font-black text-white md:text-4xl">Chấm điểm CV</h1>
          <p className="text-sm leading-relaxed font-medium text-slate-300 md:text-base">
            Upload CV của bạn để AI phân tích chất lượng hồ sơ. Chúng tôi sẽ đánh giá bố cục, nội
            dung, tác động và khả năng vượt qua vòng lọc ATS dựa trên các tiêu chuẩn tuyển nghiệp
            hàng đầu.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column: Input */}
        <div className="space-y-6">
          <SurfaceCard className="p-6">
            <h2
              className="mb-4 flex items-center gap-2 text-lg font-bold"
              style={{ color: 'var(--color-text)' }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary-muted)] text-[10px] font-black text-[var(--color-primary)]">
                1
              </span>
              Upload CV
            </h2>
            <div
              className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed py-12 text-center transition-all hover:border-indigo-500/50 hover:bg-indigo-500/5"
              style={{
                borderColor: 'var(--color-border)',
                background: 'var(--color-surface-raised)',
              }}
            >
              <input
                type="file"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={e => setFile(e.target.files?.[0] || null)}
              />
              {file ? (
                <div className="flex flex-col items-center gap-2 text-indigo-500">
                  <FileText size={40} className="mb-2" />
                  <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                    {file.name}
                  </p>
                  <p className="text-[10px] font-black tracking-widest uppercase opacity-60">
                    Nhấn để thay đổi file
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="mb-2 rounded-2xl p-4 text-indigo-500 shadow-lg"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border-subtle)',
                    }}
                  >
                    <UploadCloud size={32} />
                  </div>
                  <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                    Kéo thả file CV vào đây
                  </p>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                    Hỗ trợ PDF, DOCX (Tối đa 5MB)
                  </p>
                </div>
              )}
            </div>
          </SurfaceCard>

          <Button
            size="lg"
            className="h-16 w-full rounded-2xl text-base font-bold shadow-lg"
            onClick={handleScan}
            disabled={isScanning}
          >
            {isScanning ? (
              <span className="flex items-center gap-2">
                <LoaderCircle size={22} className="animate-spin" /> Đang kiểm toán bằng AI...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles size={22} /> Bắt đầu Chấm điểm CV
              </span>
            )}
          </Button>
        </div>

        {/* Right Column: Results */}
        <div className="h-full">
          {!result && !isScanning && (
            <SurfaceCard
              className="flex h-full min-h-[400px] flex-col items-center justify-center border-dashed p-8 text-center"
              style={{
                background: 'var(--color-surface-raised)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div
                className="mb-6 rounded-3xl p-5 text-[var(--color-primary)] shadow-xl"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <ScanSearch size={48} className="opacity-40" />
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                Chưa có dữ liệu phân tích
              </h3>
              <p
                className="mt-3 max-w-sm text-sm leading-relaxed font-medium"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Vui lòng upload CV ở cột bên trái để AI tiến hành phân tích và kiểm toán hồ sơ của
                bạn.
              </p>
            </SurfaceCard>
          )}

          {isScanning && (
            <SurfaceCard className="flex h-full min-h-[400px] flex-col items-center justify-center p-8 text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 animate-pulse rounded-full bg-[var(--color-primary-muted)] blur-2xl" />
                <LoaderCircle
                  size={64}
                  className="relative animate-spin text-[var(--color-primary)]"
                />
              </div>
              <h3
                className="mb-2 text-2xl font-black tracking-tight"
                style={{ color: 'var(--color-text)' }}
              >
                AI đang kiểm toán hồ sơ...
              </h3>
              <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                Phân tích cấu trúc câu, từ ngữ chuyên môn và tính nhất quán
              </p>
            </SurfaceCard>
          )}

          {result && !isScanning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full"
            >
              <SurfaceCard className="flex h-full flex-col overflow-hidden border-none p-0 shadow-2xl">
                <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 p-8 text-center text-white">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 50% 50%, var(--color-primary) 0%, transparent 70%)',
                    }}
                  />
                  <p className="relative mb-6 text-xs font-bold tracking-widest text-white/60 uppercase">
                    Sức Mạnh Hồ Sơ (Profile Strength)
                  </p>

                  <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-slate-800/50 shadow-inner backdrop-blur-md">
                    <div
                      className="absolute inset-0 rounded-full opacity-50 blur-2xl"
                      style={{
                        background:
                          result.score >= 75
                            ? '#22c55e'
                            : result.score >= 50
                              ? '#eab308'
                              : '#ef4444',
                      }}
                    />
                    <svg className="absolute inset-0 h-full w-full scale-110 -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="10"
                      />
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke={
                          result.score >= 75
                            ? '#22c55e'
                            : result.score >= 50
                              ? '#eab308'
                              : '#ef4444'
                        }
                        strokeWidth="10"
                        strokeDasharray="440"
                        initial={{ strokeDashoffset: 440 }}
                        animate={{ strokeDashoffset: 440 - (result.score / 100) * 440 }}
                        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="relative flex flex-col items-center">
                      <span
                        className="text-5xl font-black tracking-tighter"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        <AnimatedNumber value={result.score} />%
                      </span>
                    </div>
                  </div>

                  <div
                    className="relative mt-10 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-bold shadow-lg backdrop-blur-md"
                    style={{
                      background:
                        result.score >= 75
                          ? 'rgba(34,197,94,0.15)'
                          : result.score >= 50
                            ? 'rgba(234,179,8,0.15)'
                            : 'rgba(239,68,68,0.15)',
                      color:
                        result.score >= 75 ? '#4ade80' : result.score >= 50 ? '#fde047' : '#f87171',
                      borderColor:
                        result.score >= 75
                          ? 'rgba(34,197,94,0.3)'
                          : result.score >= 50
                            ? 'rgba(234,179,8,0.3)'
                            : 'rgba(239,68,68,0.3)',
                    }}
                  >
                    {result.score >= 75 ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    {result.score >= 85
                      ? 'Hồ sơ cực kỳ ấn tượng!'
                      : result.score >= 70
                        ? 'Hồ sơ đạt chuẩn, cần một ít tinh chỉnh.'
                        : 'Cần tối ưu thêm để vượt qua vòng lọc ATS.'}
                  </div>
                </div>

                <div
                  className="flex-1 space-y-8 overflow-y-auto p-6 md:p-8"
                  style={{ background: 'var(--color-surface)' }}
                >
                  <div className="space-y-6">
                    <h4
                      className="mb-2 text-sm font-bold tracking-wider uppercase"
                      style={{ color: 'var(--color-text)' }}
                    >
                      Chi tiết chấm điểm
                    </h4>
                    <div className="space-y-4">
                      {result.breakdown.map((item, idx) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="group"
                        >
                          <div className="mb-1.5 flex items-end justify-between px-1">
                            <div>
                              <p
                                className="text-sm font-bold"
                                style={{ color: 'var(--color-text)' }}
                              >
                                {item.label}
                              </p>
                              <p
                                className="text-[10px] font-medium opacity-60"
                                style={{ color: 'var(--color-text-muted)' }}
                              >
                                {item.desc}
                              </p>
                            </div>
                            <span className="text-sm font-black text-[var(--color-primary)]">
                              {item.score}%
                            </span>
                          </div>
                          <div
                            className="h-2 w-full overflow-hidden rounded-full"
                            style={{ background: 'var(--color-surface-raised)' }}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.score}%` }}
                              transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                              className="h-full rounded-full bg-[var(--color-primary)] shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="border-t pt-4"
                    style={{ borderColor: 'var(--color-border-subtle)' }}
                  >
                    <div>
                      <h4
                        className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wider uppercase"
                        style={{ color: 'var(--color-text)' }}
                      >
                        <CheckCircle2 size={18} className="text-emerald-500" /> Kỹ năng đã khớp (
                        {result.matched.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.matched.map((kw, i) => (
                          <motion.div
                            key={kw}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                            <Badge
                              variant="success"
                              className="border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 font-bold text-emerald-500"
                            >
                              {kw}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4
                      className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wider uppercase"
                      style={{ color: 'var(--color-text)' }}
                    >
                      <XCircle size={18} className="text-rose-500" /> Kỹ năng còn thiếu (
                      {result.missing.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.missing.map((kw, i) => (
                        <motion.div
                          key={kw}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                        >
                          <Badge
                            variant="danger"
                            className="border-rose-500/20 bg-rose-500/10 px-3 py-1.5 font-bold text-rose-500"
                          >
                            {kw}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="flex flex-col gap-4 border-t pt-8"
                    style={{ borderColor: 'var(--color-border-subtle)' }}
                  >
                    <div
                      className="relative overflow-hidden rounded-3xl border p-5"
                      style={{
                        background: 'var(--color-primary-muted)',
                        borderColor: 'var(--color-primary)/20',
                      }}
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Brain size={64} />
                      </div>
                      <p className="mb-2 flex items-center gap-2 text-xs font-black tracking-widest text-[var(--color-primary)] uppercase">
                        <Sparkles size={16} /> AI Advice
                      </p>
                      <p
                        className="text-sm leading-relaxed font-medium"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        Bạn có nền tảng tốt về mềm nhưng đang thiếu{' '}
                        <strong className="text-[var(--color-primary)]">Technical Skills</strong>{' '}
                        quan trọng. Hãy thử cập nhật thêm phần <strong>Agile/Scrum</strong> và{' '}
                        <strong>Data Analysis</strong> để đạt trên 85% điểm khớp.
                      </p>
                    </div>

                    <Button
                      variant="primary"
                      className="ring-offset-background h-14 w-full rounded-2xl text-base font-black tracking-tight text-white shadow-xl transition-transform active:scale-95"
                    >
                      Cải thiện CV với AI Sidekick <ChevronRight size={20} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </SurfaceCard>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
