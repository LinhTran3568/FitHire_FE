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
  Layout,
  Settings,
  User,
  Zap as ZapIcon,
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
    description:
      'AI hỏi thông tin và tạo CV chuẩn ATS chỉ trong 5 phút. Không cần template phức tạp.',
    link: '/cv-builder?flow=build',
    cta: 'Tạo CV ngay',
    color: '#0d9488',
    image: '/hero_product_showcase_1774194387593.png',
  },
  {
    number: '02',
    icon: ScanSearch,
    title: 'Chấm điểm CV',
    description: 'AI phân tích chất lượng hồ sơ, chấm điểm ATS và gợi ý tối ưu chuyên sâu.',
    link: '/cv-scoring',
    cta: 'Chấm điểm CV',
    color: '#3b82f6',
    image: '/feature_ats_scan_v2_1774195216889.png',
  },
  {
    number: '03',
    icon: MicVocal,
    title: 'Luyện phỏng vấn với AI',
    description:
      'Mock interview theo JD thực tế. Nhận nhận xét chi tiết và gợi ý cải thiện ngay lập tức.',
    link: '/interview',
    cta: 'Luyện ngay',
    color: '#8b5cf6',
    image: '/feature_ai_interview_1774194843962.png',
  },
];

const FEATURES = [
  {
    icon: ZapIcon,
    title: 'Tạo CV trong 5 phút',
    description: 'AI tự điền nội dung theo thông tin bạn cung cấp, chuẩn format nhà tuyển dụng.',
    color: '#f59e0b',
    image: '/feature_ats_scan_v2_1774195216889.png',
  },
  {
    icon: ScanSearch,
    title: 'Phân tích ATS thông minh',
    description: 'Kiểm tra điểm ATS, phát hiện từ khóa còn thiếu và đề xuất cải thiện tức thì.',
    color: '#0d9488',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Gợi ý việc phù hợp',
    description: 'So khớp hồ sơ với hàng trăm JD, tìm ra vị trí bạn có cơ hội cao nhất.',
    color: '#3b82f6',
  },
  {
    icon: MicVocal,
    title: 'Mock interview AI',
    description: 'Phỏng vấn thử với AI theo đúng JD bạn muốn apply, nhận góp ý chi tiết.',
    color: '#8b5cf6',
    image: '/feature_ai_interview_1774194843962.png',
  },
  {
    icon: Target,
    title: 'Theo dõi tiến độ',
    description: 'Dashboard rõ ràng giúp bạn biết mình đang ở đâu trong hành trình ứng tuyển.',
    color: '#ec4899',
  },
  {
    icon: BookOpen,
    title: 'Test tính cách & văn hóa',
    description: 'Khám phá phong cách làm việc và đánh giá mức độ phù hợp với doanh nghiệp.',
    color: '#10b981',
  },
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

// --- Mockup Component for Hero ---
const ProductMockup = () => (
  <div className="relative flex h-full w-full flex-col gap-4 p-4 text-white lg:p-8">
    {/* Sidebar Mock */}
    <div className="absolute top-4 bottom-4 left-4 hidden w-12 flex-col items-center gap-4 rounded-l-2xl border-r border-white/10 bg-white/5 py-4 md:flex">
      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-500/20">
        <Layout size={14} className="text-teal-400" />
      </div>
      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5">
        <FileText size={14} className="text-white/40" />
      </div>
      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5">
        <User size={14} className="text-white/40" />
      </div>
      <div className="mt-auto flex h-6 w-6 items-center justify-center rounded-lg bg-white/5">
        <Settings size={14} className="text-white/40" />
      </div>
    </div>

    {/* Header Mock */}
    <div className="flex h-10 w-full items-center justify-between rounded-t-2xl border-b border-white/10 bg-white/5 px-4 md:pl-16">
      <div className="flex gap-1.5">
        <div className="h-2 w-2 rounded-full bg-red-500/50" />
        <div className="h-2 w-2 rounded-full bg-amber-500/50" />
        <div className="h-2 w-2 rounded-full bg-emerald-500/50" />
      </div>
      <div className="flex items-center gap-3">
        <div className="h-5 w-16 rounded-full bg-white/5 md:w-24" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-teal-400 to-blue-500" />
      </div>
    </div>

    {/* Main Content Mock */}
    <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden md:grid-cols-2 md:pl-12">
      {/* Left: CV Content */}
      <div className="space-y-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-500 hover:bg-white/[0.05]">
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-lg bg-white/5 md:h-12 md:w-12" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/2 rounded-full bg-white/10" />
            <div className="h-2 w-1/3 rounded-full bg-white/5" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full rounded-full bg-white/5" />
          <div className="h-2 w-full rounded-full bg-white/5" />
          <div className="h-2 w-3/4 rounded-full bg-white/5" />
        </div>
        <div className="space-y-2 pt-2 md:pt-4">
          <div className="h-2 w-1/4 rounded-full bg-teal-500/20" />
          <div className="flex h-10 w-full items-center rounded-lg border border-white/10 bg-white/10 px-4 md:h-14">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '70%' }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              className="h-1.5 rounded-full bg-teal-500/40"
            />
          </div>
        </div>
      </div>

      {/* Right: AI Analysis */}
      <div className="space-y-3 md:space-y-4">
        <div className="glass-card-bright space-y-2 rounded-xl p-3 shadow-xl md:space-y-3 md:p-4">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-black tracking-wider text-white/40 uppercase md:text-[10px]">
              ATS MATCH RATE
            </span>
            <span className="text-base font-black text-teal-400 md:text-lg">92%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '92%' }}
              transition={{ duration: 1.5, delay: 1 }}
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <div className="glass-card rounded-xl border-blue-500/20 p-2 md:p-3">
            <div className="mb-1.5 h-1.5 w-1/2 rounded-full bg-white/20 md:mb-2 md:h-2" />
            <div className="h-3 w-3/4 rounded-full bg-blue-400/20 md:h-4" />
          </div>
          <div className="glass-card rounded-xl border-emerald-500/20 p-2 md:p-3">
            <div className="mb-1.5 h-1.5 w-1/2 rounded-full bg-white/20 md:mb-2 md:h-2" />
            <div className="h-3 w-3/4 rounded-full bg-emerald-400/20 md:h-4" />
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 md:p-4">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400 md:h-8 md:w-8">
            <Sparkles size={14} />
          </div>
          <div className="flex-1 space-y-1 text-left md:space-y-1.5">
            <div className="h-1.5 w-1/2 rounded-full bg-white/40 md:h-2" />
            <div className="h-1 w-full rounded-full bg-white/5 md:h-1.5" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function HomePage() {
  return (
    <div
      className="w-full overflow-hidden transition-colors duration-500"
      style={{ background: 'var(--color-background)' }}
    >
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden px-6 pt-24 pb-36 lg:px-10 lg:pt-36"
        style={{ background: 'var(--hero-bg)' }}
      >
        {/* Ambient orbs */}
        <div
          className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--hero-orb-a) 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -top-20 right-[-100px] h-[500px] w-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--hero-orb-b) 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(ellipse, var(--hero-orb-c) 0%, transparent 70%)' }}
        />

        {/* Dot grid */}
        <div className="bg-dot-grid absolute inset-0 opacity-[0.035]" />

        {/* Horizontal lines texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '100% 64px',
          }}
        />

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
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full"
                  style={{ background: 'rgba(13,148,136,0.3)' }}
                >
                  <Sparkles size={11} />
                </span>
                Nền tảng AI số 1 cho sinh viên & người tìm việc
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="hero-title mt-8 text-white">
              Tìm việc đúng, <span className="text-gradient-hero">nhanh hơn</span>
              <br />
              với trợ lý AI
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed font-medium"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              FitHire giúp bạn thiết kế định hướng sự nghiệp, làm đẹp CV chuẩn ATS và luyện phỏng
              vấn mô phỏng hệt như thật — tất cả trên một bệ phóng mượt mà.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Link to="/cv-builder?flow=build">
                <button
                  className="group glow-primary inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #0d9488, #0891b2)',
                  }}
                >
                  Bắt đầu miễn phí
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </Link>
              <Link to="/jobs">
                <button className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/8 px-9 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-white/35 hover:bg-white/14">
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
              {['Miễn phí trọn bộ cơ bản', 'Tạo CV nhanh trong 5 phút', 'Tuyệt đối bảo mật'].map(
                item => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <CheckCircle2 size={14} style={{ color: '#0d9488' }} />
                    {item}
                  </span>
                ),
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, type: 'spring', bounce: 0.2 }}
            className="relative mx-auto mt-20 max-w-3xl px-4 lg:px-0"
          >
            {/* Floating labels */}
            <div className="animate-float glow-primary absolute -top-6 -right-10 z-30 hidden flex-col gap-1 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl lg:flex">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-[10px] font-black tracking-widest text-white/50 uppercase">
                  ATS Score
                </span>
              </div>
              <span
                className="text-2xl font-black text-emerald-400"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                91%
              </span>
            </div>

            <div className="animate-float-d1 absolute -bottom-6 -left-10 z-30 hidden flex-col gap-1 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl lg:flex">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                <span className="text-[10px] font-black tracking-widest text-white/50 uppercase">
                  Matching
                </span>
              </div>
              <span
                className="text-2xl font-black text-blue-400"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Top 5%
              </span>
            </div>

            <div
              className="group relative overflow-hidden rounded-[2.5rem] p-px shadow-2xl transition-all duration-500"
              style={{
                background:
                  'linear-gradient(135deg, rgba(13,148,136,0.5), rgba(6,182,212,0.3), rgba(59,130,246,0.2))',
              }}
            >
              <div
                className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-[2.45rem] md:aspect-[16/10]"
                style={{ background: 'rgba(8,13,28,0.95)' }}
              >
                {/* Dots background layer */}
                <div className="bg-dot-grid absolute inset-0 opacity-20" />

                {/* Interactive Mockup Component */}
                <ProductMockup />

                {/* Floating orbs for extra tech feel */}
                <div className="animate-pulse-soft absolute top-1/4 -left-20 h-48 w-48 rounded-full bg-teal-500/20 blur-[100px]" />
                <div className="animate-pulse-soft absolute -right-20 -bottom-1/4 h-48 w-48 rounded-full bg-blue-500/20 blur-[100px]" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section
        style={{
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
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
                <p
                  className="mt-1.5 text-sm font-medium"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 STEPS ── */}
      <section
        className="relative px-6 py-28 transition-colors lg:px-10"
        style={{ background: 'var(--color-background-alt)' }}
      >
        {/* Background pattern */}
        <div className="bg-dot-grid absolute inset-0 opacity-[0.02]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <span className="section-label">
              <Sparkles size={13} /> Lộ trình bài bản
            </span>
            <h2
              className="mt-5 text-4xl font-extrabold tracking-tight md:text-5xl"
              style={{ color: 'var(--color-text)' }}
            >
              3 bước đến công việc mơ ước
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-lg"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Tối ưu hóa hành trình của bạn với quy trình khép kín, được bảo trợ toàn diện bởi AI.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="card-hover relative flex flex-col rounded-[2.5rem] p-6 lg:p-8"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="group/img relative mb-6 h-56 w-full overflow-hidden rounded-[1.8rem] shadow-2xl">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover/img:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)]/80 via-transparent to-transparent opacity-60" />
                  <div
                    className="absolute bottom-5 left-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 backdrop-blur-xl"
                    style={{
                      background: `${step.color}aa`,
                      boxShadow: `0 8px 32px ${step.color}40`,
                    }}
                  >
                    <step.icon size={26} className="text-white" />
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl font-black opacity-10" style={{ color: step.color }}>
                    {step.number}
                  </span>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                    {step.title}
                  </h3>
                </div>

                <p
                  className="mb-8 flex-1 text-base leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {step.description}
                </p>
                <Link to={step.link}>
                  <button
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.03] active:scale-95"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)`,
                      boxShadow: `0 10px 25px ${step.color}40`,
                    }}
                  >
                    {step.cta}
                    <ArrowRight size={18} />
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section
        className="relative px-6 py-28 transition-colors lg:px-10"
        style={{ background: 'var(--color-surface)' }}
      >
        <div className="absolute top-0 right-0 h-1/2 w-1/3 rounded-full bg-teal-500/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <span className="section-label">
              <Zap size={13} /> Bộ công cụ mạnh mẽ
            </span>
            <h2
              className="mt-5 text-4xl font-extrabold tracking-tight md:text-5xl"
              style={{ color: 'var(--color-text)' }}
            >
              Hệ thống công cụ đắc lực
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-lg"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Các tính năng chuyên sâu giúp bạn thống trị mọi bài ứng tuyển khó nhằn nhất.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="card-hover group relative overflow-hidden rounded-[2rem] p-8"
                style={{
                  background: 'var(--color-background-alt)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {/* Background image preview if available */}
                {f.image && (
                  <div className="absolute -right-8 -bottom-8 h-32 w-32 opacity-[0.08] grayscale transition-opacity duration-500 group-hover:opacity-[0.14]">
                    <img src={f.image} alt="" className="h-full w-full object-cover" />
                  </div>
                )}

                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${f.color}14`,
                    border: `1px solid ${f.color}28`,
                    color: f.color,
                  }}
                >
                  <f.icon size={26} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                  {f.title}
                </h3>
                <p
                  className="mt-3 text-base leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        className="relative px-6 py-28 transition-colors lg:px-10"
        style={{ background: 'var(--color-background-alt)' }}
      >
        <div className="bg-dot-grid absolute inset-0 opacity-[0.02]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <span className="section-label">
              <Users size={13} /> Cộng đồng FitHire
            </span>
            <h2
              className="mt-5 text-4xl font-extrabold tracking-tight md:text-5xl"
              style={{ color: 'var(--color-text)' }}
            >
              Được tin dùng bởi hàng ngàn bạn trẻ
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="card-hover relative rounded-[2.5rem] p-8 lg:p-10"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="flex items-center gap-5">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[1.2rem] border-2 border-white/10 shadow-2xl">
                    {t.avatar.startsWith('/') ? (
                      <img src={t.avatar} alt={t.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 text-xl font-black text-white">
                        {t.avatar}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                      {t.name}
                    </p>
                    <p
                      className="mt-0.5 text-sm font-semibold opacity-60"
                      style={{ color: t.color }}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>
                {/* Stars */}
                <div className="mt-6 flex gap-1.5">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={15} fill="#fbbf24" className="text-amber-400" />
                  ))}
                </div>
                <p
                  className="mt-6 text-base leading-relaxed italic"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
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
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[3rem] p-12 text-center shadow-[0_40px_100px_rgba(0,0,0,0.4)] md:p-24"
          style={{ background: 'var(--hero-bg)' }}
        >
          {/* CTA orbs */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full"
            style={{ background: 'radial-gradient(circle, var(--hero-orb-a) 0%, transparent 70%)' }}
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full"
            style={{ background: 'radial-gradient(circle, var(--hero-orb-b) 0%, transparent 70%)' }}
          />
          {/* Dot grid */}
          <div className="bg-dot-grid absolute inset-0 opacity-[0.06]" />

          <div className="relative z-10">
            <span
              className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-2.5 text-sm font-bold text-white shadow-xl backdrop-blur-xl"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <Award size={16} className="text-teal-400" />
              Gia nhập cùng 5,000+ người dùng thông thái
            </span>
            <h2
              className="mt-10 text-4xl leading-tight font-black tracking-tighter text-white md:text-5xl lg:text-7xl"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Bắt đầu sự nghiệp
              <br />
              <span className="text-gradient-hero">đột phá ngay hôm nay</span>
            </h2>
            <p
              className="mx-auto mt-8 max-w-2xl text-xl font-medium opacity-70"
              style={{ color: 'white' }}
            >
              Chỉ mất 5 phút để có một bộ hồ sơ chuẩn chỉnh và lộ trình nghề nghiệp vững vàng. Hoàn
              toàn miễn phí khởi đầu.
            </p>
            <div className="mt-14 flex flex-wrap justify-center gap-6">
              <Link to="/cv-builder?flow=build">
                <button
                  className="group relative flex items-center gap-3 rounded-2xl bg-white px-12 py-5 text-lg font-black shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-teal-50"
                  style={{ color: '#0d9488' }}
                >
                  Khám phá ngay
                  <ArrowRight
                    size={22}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                </button>
              </Link>
              <Link to="/subscription">
                <button className="flex items-center gap-3 rounded-2xl border-2 border-white/20 bg-white/5 px-12 py-5 text-lg font-bold text-white shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/10">
                  <Sparkles size={20} className="text-teal-400" />
                  Gói Pro
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
