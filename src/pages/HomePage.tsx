import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  MicVocal,
  ScanSearch,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
  Target,
  BookOpen,
  Users,
  Award,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const STATS = [
  { value: '10,000+', label: 'CV đã tạo', icon: FileText, color: '#0d9488' },
  { value: '85%', label: 'Tỷ lệ trúng phỏng vấn', icon: TrendingUp, color: '#3b82f6' },
  { value: '500+', label: 'Công ty đối tác', icon: BriefcaseBusiness, color: '#8b5cf6' },
  { value: '4.9★', label: 'Đánh giá từ người dùng', icon: Star, color: '#f59e0b' },
];

const STEPS = [
  {
    number: '01',
    icon: FileText,
    title: 'Xây CV có định hướng',
    description: 'AI hỏi thông tin và tạo CV chuẩn ATS chỉ trong 5 phút. Không cần template phức tạp.',
    link: '/cv-builder?flow=build',
    cta: 'Tạo CV ngay',
    color: '#0d9488',
    image: '/hero_product_showcase_1774194387593.png'
  },
  {
    number: '02',
    icon: ScanSearch,
    title: 'Chấm điểm CV',
    description: 'AI phân tích chất lượng hồ sơ, chấm điểm ATS và gợi ý tối ưu chuyên sâu.',
    link: '/cv-scoring',
    cta: 'Chấm điểm CV',
    color: '#3b82f6',
    image: '/feature_ats_scan_v2_1774195216889.png'
  },
  {
    number: '03',
    icon: MicVocal,
    title: 'Luyện phỏng vấn với AI',
    description: 'Mock interview theo JD thực tế. Nhận nhận xét chi tiết và gợi ý cải thiện ngay lập tức.',
    link: '/interview',
    cta: 'Luyện ngay',
    color: '#8b5cf6',
    image: '/feature_ai_interview_1774194843962.png'
  },
];

const FEATURES = [
  { icon: Zap, title: 'Tạo CV trong 5 phút', description: 'AI tự điền nội dung theo thông tin bạn cung cấp, chuẩn format nhà tuyển dụng.', color: '#f59e0b' },
  { icon: ScanSearch, title: 'Phân tích ATS thông minh', description: 'Kiểm tra điểm ATS, phát hiện từ khóa còn thiếu và đề xuất cải thiện tức thì.', color: '#0d9488' },
  { icon: BriefcaseBusiness, title: 'Gợi ý việc phù hợp', description: 'So khớp hồ sơ với hàng trăm JD, tìm ra vị trí bạn có cơ hội cao nhất.', color: '#3b82f6' },
  { icon: MicVocal, title: 'Mock interview AI', description: 'Phỏng vấn thử với AI theo đúng JD bạn muốn apply, nhận góp ý chi tiết.', color: '#8b5cf6' },
  { icon: Target, title: 'Theo dõi tiến độ', description: 'Dashboard rõ ràng giúp bạn biết mình đang ở đâu trong hành trình ứng tuyển.', color: '#ec4899' },
  { icon: BookOpen, title: 'Test tính cách & văn hóa', description: 'Khám phá phong cách làm việc và đánh giá mức độ phù hợp với doanh nghiệp.', color: '#10b981' },
];

const TESTIMONIALS = [
  {
    name: 'Nguyễn Minh Khoa',
    role: 'Frontend Intern @ Techify',
    text: 'FitHire giúp mình tạo CV và luyện phỏng vấn chỉ trong 1 tuần. Kết quả là pass vòng kỹ thuật ngay lần đầu!',
    avatar: '/avatar_khoa_1774195237192.png',
    color: '#0d9488',
    stars: 5,
  },
  {
    name: 'Trần Thu Hương',
    role: 'Data Analyst @ FinStack',
    text: 'CV của mình tăng từ 62% lên 91% ATS score sau khi dùng tính năng rà lỗi. Cực kỳ hữu ích!',
    avatar: '/avatar_huong_1774195145967.png',
    color: '#3b82f6',
    stars: 5,
  },
  {
    name: 'Lê Anh Tuấn',
    role: 'Backend Fresher @ NextGen',
    text: 'Mock interview AI chính xác không kém gì phỏng vấn thật. Mình tự tin hẳn sau 5 buổi luyện.',
    avatar: 'AT',
    color: '#8b5cf6',
    stars: 5,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden transition-colors duration-500" style={{ background: 'var(--color-background)' }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden px-6 pt-24 pb-36 lg:px-10 lg:pt-36"
        style={{ background: 'var(--hero-bg)' }}
      >
        {/* Ambient orbs */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--hero-orb-a) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -top-20 right-[-100px] h-[500px] w-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--hero-orb-b) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, var(--hero-orb-c) 0%, transparent 70%)' }} />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        {/* Horizontal lines texture */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '100% 64px',
        }} />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mx-auto max-w-4xl text-center"
          >
            {/* Label badge */}
            <motion.div variants={itemVariants}>
              <span
                className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-bold backdrop-blur-xl"
                style={{
                  background: 'rgba(13,148,136,0.15)',
                  border: '1px solid rgba(13,148,136,0.35)',
                  color: '#5eead4',
                }}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: 'rgba(13,148,136,0.3)' }}>
                  <Sparkles size={11} />
                </span>
                Nền tảng AI số 1 cho sinh viên & người tìm việc
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="hero-title mt-8 text-white"
            >
              Tìm việc đúng,{' '}
              <span className="text-gradient-hero">nhanh hơn</span>
              <br />
              với trợ lý AI
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed font-medium"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              FitHire giúp bạn thiết kế định hướng sự nghiệp, làm đẹp CV chuẩn ATS và luyện phỏng vấn mô phỏng hệt như thật — tất cả trên một bệ phóng mượt mà.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/cv-builder?flow=build">
                <button
                  className="group glow-primary inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #0d9488, #0891b2)',
                  }}
                >
                  Bắt đầu miễn phí
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
              <Link to="/jobs">
                <button className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/8 px-9 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/14 hover:border-white/35">
                  <BriefcaseBusiness size={18} />
                  Khám phá việc làm
                </button>
              </Link>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-semibold"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              {['Miễn phí trọn bộ cơ bản', 'Tạo CV nhanh trong 5 phút', 'Tuyệt đối bảo mật'].map(item => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={14} style={{ color: '#0d9488' }} />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, type: 'spring', bounce: 0.2 }}
            className="relative mx-auto mt-20 max-w-3xl px-4 lg:px-0"
          >
            {/* Floating labels - Adjusted for smaller container */}
            <div className="absolute -top-6 -right-10 z-30 bg-white/10 backdrop-blur-2xl border border-white/20 p-4 rounded-2xl animate-float lg:flex hidden flex-col gap-1 shadow-2xl glow-primary">
               <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                 <span className="text-[10px] uppercase font-black text-white/50 tracking-widest">ATS Score</span>
               </div>
               <span className="text-2xl font-black text-emerald-400" style={{ fontFamily: 'Outfit, sans-serif' }}>91%</span>
            </div>

            <div className="absolute -bottom-6 -left-10 z-30 bg-white/10 backdrop-blur-2xl border border-white/20 p-4 rounded-2xl animate-float-d1 lg:flex hidden flex-col gap-1 shadow-2xl">
               <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                 <span className="text-[10px] uppercase font-black text-white/50 tracking-widest">Matching</span>
               </div>
               <span className="text-2xl font-black text-blue-400" style={{ fontFamily: 'Outfit, sans-serif' }}>Top 5%</span>
            </div>

            <div
              className="rounded-[2.5rem] p-px relative group transition-all duration-500 overflow-hidden shadow-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.5), rgba(6,182,212,0.3), rgba(59,130,246,0.2))' }}
            >
              {/* Glass overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />
              
              <div
                className="rounded-[2.45rem] overflow-hidden relative z-10"
                style={{ background: 'rgba(8,13,28,0.92)' }}
              >
                <img 
                  src="/hero_product_showcase_1774194387593.png" 
                  alt="FitHire AI Product Showcase"
                  className="w-full h-auto object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.01]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="group text-center"
              >
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${stat.color}14`,
                    border: `1px solid ${stat.color}28`,
                    color: stat.color,
                  }}
                >
                  <stat.icon size={22} />
                </div>
                <p className="stat-value">{stat.value}</p>
                <p className="mt-1.5 text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 STEPS ── */}
      <section className="px-6 py-28 lg:px-10 transition-colors" style={{ background: 'var(--color-background-alt)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="section-label">
              <Sparkles size={13} /> Lộ trình bài bản
            </span>
            <h2 className="mt-5 text-4xl font-extrabold tracking-tight md:text-5xl" style={{ color: 'var(--color-text)' }}>
              3 bước đến công việc mơ ước
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: 'var(--color-text-muted)' }}>
              Tối ưu hóa hành trình của bạn với quy trình khép kín, được bảo trợ toàn diện bởi AI.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3 relative">
            {/* Connecting line (desktop) */}
            <div className="absolute top-14 left-1/6 right-1/6 h-px hidden md:block" style={{
              background: 'linear-gradient(90deg, transparent 0%, var(--color-border-strong) 20%, var(--color-border-strong) 80%, transparent 100%)',
            }} />

            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="card-hover relative flex flex-col rounded-3xl p-8"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Step number badge */}
                <div
                  className="absolute -top-4 -right-3 flex h-10 w-10 items-center justify-center rounded-2xl text-lg font-black"
                  style={{
                    background: `${step.color}15`,
                    border: `2px solid ${step.color}30`,
                    color: step.color,
                    fontFamily: 'Outfit, sans-serif',
                  }}
                >
                  {step.number}
                </div>

                <div className="mb-6 relative h-48 w-full overflow-hidden rounded-2xl group/img">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-60" />
                  <div
                    className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-md border border-white/20"
                    style={{
                      background: `${step.color}88`,
                      boxShadow: `0 8px 24px ${step.color}35`,
                    }}
                  >
                    <step.icon size={22} className="text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {step.description}
                </p>
                <Link to={step.link} className="mt-8 block">
                  <button
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:opacity-92"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)`,
                      boxShadow: `0 6px 20px ${step.color}30`,
                    }}
                  >
                    {step.cta}
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="px-6 py-28 lg:px-10 transition-colors" style={{ background: 'var(--color-surface)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="section-label">
              <Zap size={13} /> Bộ công cụ mạnh mẽ
            </span>
            <h2 className="mt-5 text-4xl font-extrabold tracking-tight md:text-5xl" style={{ color: 'var(--color-text)' }}>
              Hệ thống công cụ đắc lực
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: 'var(--color-text-muted)' }}>
              Các tính năng chuyên sâu giúp bạn thống trị mọi bài ứng tuyển khó nhằn nhất.
            </p>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="card-hover group rounded-3xl p-7"
                style={{
                  background: 'var(--color-background-alt)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${f.color}14`,
                    border: `1px solid ${f.color}28`,
                    color: f.color,
                  }}
                >
                  <f.icon size={22} />
                </div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                  {f.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="px-6 py-28 lg:px-10 transition-colors" style={{ background: 'var(--color-background-alt)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="section-label">
              <Users size={13} /> Cộng đồng FitHire
            </span>
            <h2 className="mt-5 text-4xl font-extrabold tracking-tight md:text-5xl" style={{ color: 'var(--color-text)' }}>
              Được tin dùng bởi hàng ngàn bạn trẻ
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="card-hover relative rounded-3xl p-8"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Quote mark */}
                <div
                  className="absolute top-6 right-7 text-5xl font-black leading-none opacity-10"
                  style={{ color: t.color, fontFamily: 'Georgia, serif' }}
                >
                  "
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl shadow-lg border-2 border-white/10"
                  >
                    {t.avatar.startsWith('/') ? (
                      <img src={t.avatar} alt={t.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 text-base font-black text-white">
                        {t.avatar}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-base" style={{ color: 'var(--color-text)' }}>{t.name}</p>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{t.role}</p>
                  </div>
                </div>
                {/* Stars */}
                <div className="mt-5 flex gap-1">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={13} fill="#fbbf24" className="text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  "{t.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-28 lg:px-10" style={{ background: 'var(--color-surface)' }}>
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] p-12 text-center md:p-20 relative"
          style={{ background: 'var(--hero-bg)' }}
        >
          {/* CTA orbs */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full"
            style={{ background: 'radial-gradient(circle, var(--hero-orb-a) 0%, transparent 70%)' }} />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full"
            style={{ background: 'radial-gradient(circle, var(--hero-orb-b) 0%, transparent 70%)' }} />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />

          <div className="relative z-10">
            <span
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-white backdrop-blur-lg"
              style={{ background: 'rgba(13,148,136,0.2)', border: '1px solid rgba(13,148,136,0.4)' }}
            >
              <Award size={14} style={{ color: '#5eead4' }} />
              Sử dụng nền tảng miễn phí
            </span>
            <h2 className="mt-8 text-4xl font-black text-white md:text-5xl lg:text-6xl tracking-tight" style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.04em' }}>
              Khai phóng tiềm năng,
              <br />
              <span className="text-gradient-hero">bứt tốc sự nghiệp</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-xl font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Đừng để tài năng của bạn chìm khuất sau thiết kế CV nhạt nhoà. Bắt đầu ngay chuyên nghiệp hoá hồ sơ.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link to="/cv-builder?flow=build">
                <button
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white px-10 py-4 text-base font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_48px_rgba(255,255,255,0.25)]"
                  style={{ color: '#0d9488' }}
                >
                  Tạo CV của bạn
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </Link>
              <Link to="/subscription">
                <button
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/8 px-10 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/14 hover:border-white/35"
                >
                  <Sparkles size={16} />
                  Xem gói Pro
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
