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
} from 'lucide-react';
import { Link } from 'react-router-dom';

const STATS = [
  { value: '10,000+', label: 'CV đã tạo', icon: FileText },
  { value: '85%', label: 'Tỷ lệ trúng phỏng vấn', icon: TrendingUp },
  { value: '500+', label: 'Công ty đối tác', icon: BriefcaseBusiness },
  { value: '4.9★', label: 'Đánh giá trung bình', icon: Star },
];

const STEPS = [
  {
    number: '01',
    icon: FileText,
    title: 'Xây CV có định hướng',
    description: 'AI hỏi thông tin và tạo CV chuẩn ATS chỉ trong 5 phút. Không cần template phức tạp.',
    link: '/cv-builder?flow=build',
    cta: 'Tạo CV ngay',
  },
  {
    number: '02',
    icon: ScanSearch,
    title: 'Rà lỗi & nâng chất lượng',
    description: 'Upload CV để AI kiểm tra lỗi, gợi ý cải thiện ngôn ngữ và tăng điểm ATS đáng kể.',
    link: '/cv-builder?flow=review',
    cta: 'Rà lỗi CV',
  },
  {
    number: '03',
    icon: MicVocal,
    title: 'Luyện phỏng vấn với AI',
    description: 'Mock interview theo JD thực tế. Nhận nhận xét chi tiết và gợi ý cải thiện ngay lập tức.',
    link: '/interview',
    cta: 'Luyện ngay',
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: 'Tạo CV trong 5 phút',
    description: 'AI tự điền nội dung theo thông tin bạn cung cấp, chuẩn format nhà tuyển dụng.',
  },
  {
    icon: ScanSearch,
    title: 'Phân tích ATS thông minh',
    description: 'Kiểm tra điểm ATS, phát hiện từ khóa còn thiếu và đề xuất cải thiện tức thì.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Gợi ý việc phù hợp',
    description: 'So khớp hồ sơ với hàng trăm JD, tìm ra vị trí bạn có cơ hội cao nhất.',
  },
  {
    icon: MicVocal,
    title: 'Mock interview AI',
    description: 'Phỏng vấn thử với AI theo đúng JD bạn muốn apply, nhận góp ý chi tiết.',
  },
  {
    icon: Target,
    title: 'Theo dõi tiến độ',
    description: 'Dashboard rõ ràng giúp bạn biết mình đang ở đâu trong hành trình ứng tuyển.',
  },
  {
    icon: BookOpen,
    title: 'Test tính cách & văn hóa',
    description: 'Khám phá phong cách làm việc và đánh giá mức độ phù hợp với doanh nghiệp.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Nguyễn Minh Khoa',
    role: 'Frontend Intern @ Techify',
    text: 'FitHire giúp mình tạo CV và luyện phỏng vấn chỉ trong 1 tuần. Kết quả là pass vòng kỹ thuật ngay lần đầu!',
    avatar: 'MK',
  },
  {
    name: 'Trần Thu Hương',
    role: 'Data Analyst @ FinStack',
    text: 'CV của mình tăng từ 62% lên 91% ATS score sau khi dùng tính năng rà lỗi. Cực kỳ hữu ích!',
    avatar: 'TH',
  },
  {
    name: 'Lê Anh Tuấn',
    role: 'Backend Fresher @ NextGen',
    text: 'Mock interview AI chính xác không kém gì phỏng vấn thật. Mình tự tin hẳn sau 5 buổi luyện.',
    avatar: 'AT',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.4, 0.2, 1] } },
};

export default function HomePage() {
  return (
    <div
      className="w-full overflow-hidden transition-colors duration-500"
      style={{ background: 'var(--color-background)' }}
    >
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden px-6 pt-24 pb-32 lg:px-10 lg:pt-32"
        style={{ background: 'var(--hero-bg)' }}
      >
        {/* Themed Orbs */}
        <div
          className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ background: 'var(--hero-orb-a)' }}
        />
        <div
          className="pointer-events-none absolute top-10 right-0 h-[400px] w-[400px] rounded-full blur-[120px]"
          style={{ background: 'var(--hero-orb-b)' }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full blur-[100px]"
          style={{ background: 'var(--hero-orb-c)' }}
        />

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold backdrop-blur-md"
              style={{
                background: 'var(--color-primary-muted)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'var(--color-primary)',
              }}
            >
              <Sparkles size={15} />
              Nền tảng AI số 1 cho sinh viên & người tìm việc
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-8 text-5xl leading-[1.1] font-extrabold tracking-tight text-white md:text-7xl lg:text-[5rem]"
            >
              Tìm việc đúng,{' '}
              <span className="text-gradient-hero">nhanh hơn</span>
              <br />
              với trợ lý AI
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed md:text-xl font-medium"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              FitHire giúp bạn thiết kế định hướng sự nghiệp, làm đẹp CV chuẩn ATS và luyện phỏng vấn mô phỏng hệt như thật — tất cả trên một bệ phóng mượt mà.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-12 flex flex-wrap justify-center gap-4">
              <Link to="/cv-builder?flow=build">
                <button
                  className="group inline-flex items-center gap-2 rounded-full px-9 py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-105"
                  style={{
                    background: 'var(--color-primary)',
                    boxShadow: 'var(--shadow-primary)',
                  }}
                >
                  Bắt đầu miễn phí
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link to="/jobs">
                <button className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-9 py-4 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30">
                  <BriefcaseBusiness size={20} />
                  Khám phá việc làm
                </button>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-semibold"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              {['Miễn phí trọn bộ cơ bản', 'Tạo CV nhanh trong 5 phút', 'Tuyệt đối bảo mật'].map(item => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={15} style={{ color: 'var(--color-primary)' }} />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Demo Card */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, type: 'spring', bounce: 0.3 }}
            className="mx-auto mt-20 max-w-4xl"
          >
            <div
              className="rounded-[2.5rem] p-px"
              style={{ background: 'linear-gradient(135deg, var(--hero-orb-a), var(--hero-orb-b))' }}
            >
              <div
                className="rounded-[2.4rem] p-6 md:p-8 backdrop-blur-2xl"
                style={{ background: 'rgba(10,15,30,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {/* Window chrome */}
                <div className="mb-6 flex items-center gap-2.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span
                    className="ml-4 rounded-md px-3 py-1 text-xs font-semibold"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}
                  >
                    Phân tích CV theo tiêu chuẩn ATS
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: 'Điểm chuẩn ATS', value: '91%', change: '+29% so với bản gốc', varName: '--color-success' },
                    { label: 'Cơ hội matching', value: '24', change: 'vị trí mới mở', varName: '--color-info' },
                    { label: 'Độ lưu loát Interview', value: '88/100', change: 'xuất sắc hơn 82%', varName: '--color-primary' },
                  ].map(item => (
                    <div
                      key={item.label}
                      className="rounded-2xl p-5 transition-transform hover:-translate-y-1"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.label}</p>
                      <p className={`mt-2 text-3xl font-black`} style={{ color: `var(${item.varName})` }}>{item.value}</p>
                      <div
                        className="mt-2 inline-block rounded-md px-2 py-0.5 text-xs font-semibold"
                        style={{ background: `color-mix(in srgb, var(${item.varName}) 15%, transparent)`, color: `var(${item.varName})` }}
                      >
                        {item.change}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-4 rounded-2xl p-5"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-white/80">Backend System Engineer @ Techify Global</p>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold"
                      style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}
                    >
                      Top 5% Matching
                    </span>
                  </div>
                  <div className="mt-4 h-2.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent-2))' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        className="px-6 py-14 lg:px-10 transition-colors"
        style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center group"
              >
                <div
                  className="mx-auto mb-3 flex h-13 w-13 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                  style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
                >
                  <stat.icon size={22} />
                </div>
                <p
                  className="text-3xl font-black tracking-tight md:text-4xl"
                  style={{ color: 'var(--color-text)' }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 font-medium text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 STEPS ── */}
      <section
        className="px-6 py-24 lg:px-10 transition-colors"
        style={{ background: 'var(--color-background-alt)' }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold"
              style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
            >
              <Sparkles size={14} /> Lộ trình bài bản
            </span>
            <h2
              className="mt-5 text-4xl font-extrabold tracking-tight md:text-5xl"
              style={{ color: 'var(--color-text)' }}
            >
              3 bước đến công việc mơ ước
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: 'var(--color-text-muted)' }}>
              Tối ưu hóa hành trình của bạn với quy trình khép kín, được bảo trợ toàn diện bởi AI.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="card-hover relative flex flex-col rounded-[2rem] p-8"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Step number decorative */}
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: 'var(--color-primary)', boxShadow: 'var(--shadow-primary)' }}
                  >
                    <step.icon size={26} className="text-white" />
                  </div>
                  <span
                    className="text-5xl font-black"
                    style={{ color: 'var(--color-border-strong)', opacity: 0.6 }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                  {step.title}
                </h3>
                <p
                  className="mt-3 flex-1 text-base leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {step.description}
                </p>
                <Link to={step.link} className="mt-8 block">
                  <button
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:scale-105 hover:opacity-90"
                    style={{ background: 'var(--color-primary)', boxShadow: 'var(--shadow-primary)' }}
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
      <section
        className="px-6 py-24 lg:px-10 transition-colors"
        style={{ background: 'var(--color-surface)' }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2
              className="text-4xl font-extrabold tracking-tight md:text-5xl"
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

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-hover rounded-[1.5rem] p-7"
                style={{
                  background: 'var(--color-background-alt)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl"
                  style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
                >
                  <f.icon size={24} />
                </div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: 'var(--color-text)' }}
                >
                  {f.title}
                </h3>
                <p
                  className="mt-2.5 text-sm leading-relaxed"
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
        className="px-6 py-24 lg:px-10 transition-colors"
        style={{ background: 'var(--color-background-alt)' }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2
              className="text-4xl font-extrabold tracking-tight md:text-5xl"
              style={{ color: 'var(--color-text)' }}
            >
              Được tin dùng bởi hàng ngàn bạn trẻ
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="card-hover rounded-3xl p-8"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-black text-white"
                    style={{ background: 'var(--color-primary)', boxShadow: 'var(--shadow-primary)' }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>
                      {t.name}
                    </p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                      {t.role}
                    </p>
                  </div>
                </div>
                <p
                  className="mt-6 text-sm italic leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  "{t.text}"
                </p>
                <div className="mt-5 flex gap-1">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="px-6 py-24 lg:px-10"
        style={{ background: 'var(--color-surface)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] p-12 text-center md:p-20 relative"
          style={{ background: 'var(--hero-bg)' }}
        >
          {/* CTA orbs */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full blur-[100px]"
            style={{ background: 'var(--hero-orb-a)' }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full blur-[80px]"
            style={{ background: 'var(--hero-orb-b)' }}
          />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          <div className="relative z-10">
            <span
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-white backdrop-blur-lg"
              style={{ background: 'var(--color-primary-muted)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <Sparkles size={14} style={{ color: 'var(--color-primary)' }} />
              Sử dụng nền tảng miễn phí
            </span>
            <h2 className="mt-8 text-4xl font-black text-white md:text-5xl lg:text-6xl tracking-tight">
              Khai phóng tiềm năng,
              <br />
              <span className="text-gradient-hero">bứt tốc sự nghiệp</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-xl font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Đừng để tài năng của bạn chìm khuất sau thiết kế CV nhạt nhoà. Bắt đầu ngay chuyên nghiệp hoá hồ sơ.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link to="/cv-builder?flow=build">
                <button
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-lg font-bold shadow-2xl transition-all hover:scale-105"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Tạo CV của bạn
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5" />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
