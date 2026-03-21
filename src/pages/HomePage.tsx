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
  Users,
  Zap,
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
    description:
      'AI hỏi thông tin và tạo CV chuẩn ATS chỉ trong 5 phút. Không cần template phức tạp.',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    border: 'border-blue-200 dark:border-blue-500/20',
    link: '/cv-builder?flow=build',
    cta: 'Tạo CV ngay',
  },
  {
    number: '02',
    icon: ScanSearch,
    title: 'Rà lỗi & nâng chất lượng',
    description: 'Upload CV để AI kiểm tra lỗi, gợi ý cải thiện ngôn ngữ và tăng điểm ATS đáng kể.',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    border: 'border-blue-200 dark:border-blue-500/20',
    link: '/cv-builder?flow=review',
    cta: 'Rà lỗi CV',
  },
  {
    number: '03',
    icon: MicVocal,
    title: 'Luyện phỏng vấn với AI',
    description:
      'Mock interview theo JD thực tế. Nhận nhận xét chi tiết và gợi ý cải thiện ngay lập tức.',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    border: 'border-emerald-200 dark:border-emerald-500/20',
    link: '/interview',
    cta: 'Luyện ngay',
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: 'Tạo CV trong 5 phút',
    description: 'AI tự điền nội dung theo thông tin bạn cung cấp, chuẩn format nhà tuyển dụng.',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    border: 'border-amber-200 dark:border-amber-500/20',
  },
  {
    icon: ScanSearch,
    title: 'Phân tích ATS thông minh',
    description: 'Kiểm tra điểm ATS, phát hiện từ khóa còn thiếu và đề xuất cải thiện tức thì.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    border: 'border-blue-200 dark:border-blue-500/20',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Gợi ý việc phù hợp',
    description: 'So khớp hồ sơ với hàng trăm JD, tìm ra vị trí bạn có cơ hội cao nhất.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    border: 'border-blue-200 dark:border-blue-500/20',
  },
  {
    icon: MicVocal,
    title: 'Mock interview AI',
    description: 'Phỏng vấn thử với AI theo đúng JD bạn muốn apply, nhận góp ý chi tiết.',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    border: 'border-emerald-200 dark:border-emerald-500/20',
  },
  {
    icon: TrendingUp,
    title: 'Theo dõi tiến độ',
    description: 'Dashboard rõ ràng giúp bạn biết mình đang ở đâu trong hành trình ứng tuyển.',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-500/10',
    border: 'border-rose-200 dark:border-rose-500/20',
  },
  {
    icon: Users,
    title: 'Cộng đồng & hỗ trợ',
    description: 'Kết nối với hàng nghìn bạn cùng lộ trình, chia sẻ kinh nghiệm thực chiến.',
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-50 dark:bg-cyan-500/10',
    border: 'border-cyan-200 dark:border-cyan-500/20',
  },
];

const TESTIMONIALS = [
  {
    name: 'Nguyễn Minh Khoa',
    role: 'Frontend Intern @ Techify',
    text: 'FitHire giúp mình tạo CV và luyện phỏng vấn chỉ trong 1 tuần. Kết quả là pass vòng kỹ thuật ngay lần đầu!',
    avatar: 'MK',
    color: 'from-blue-500 to-blue-500',
  },
  {
    name: 'Trần Thu Hương',
    role: 'Data Analyst @ FinStack',
    text: 'CV của mình tăng từ 62% lên 91% ATS score sau khi dùng tính năng rà lỗi. Cực kỳ hữu ích!',
    avatar: 'TH',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Lê Anh Tuấn',
    role: 'Backend Fresher @ NextGen',
    text: 'Mock interview AI chính xác không kém gì phỏng vấn thật. Mình tự tin hẳn sau 5 buổi luyện.',
    avatar: 'AT',
    color: 'from-emerald-500 to-teal-500',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.2, 1] } },
};

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-slate-950 px-6 pt-24 pb-32 lg:px-10 lg:pt-32">
        {/* Cinematic Orbs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-600/30 blur-[120px]" />
        <div className="pointer-events-none absolute top-10 right-0 h-[400px] w-[400px] rounded-full bg-blue-500/30 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[100px]" />

        {/* Ambient Grid */}
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dli41b1y5/image/upload/v1703135345/grid-bg_z1oigk.svg')] opacity-[0.03] bg-center bg-repeat" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={containerVariants} 
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2.5 text-sm font-semibold text-blue-300 shadow-inner backdrop-blur-md">
              <Sparkles size={16} className="text-blue-400" />
              Nền tảng AI số 1 cho sinh viên & người tìm việc
            </motion.div>

            <motion.h1 variants={itemVariants} className="mt-8 text-5xl leading-[1.1] font-extrabold tracking-tight text-white md:text-7xl lg:text-[5rem]">
              Tìm việc đúng, <span className="text-gradient-hero">nhanh hơn</span>
              <br />
              với trợ lý AI
            </motion.h1>

            <motion.p variants={itemVariants} className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl font-medium">
              FitHire giúp bạn thiết kế định hướng sự nghiệp, làm đẹp CV chuẩn ATS và luyện phỏng vấn mô phỏng hệt như thật — tất cả trên một bệ phóng mượt mà.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-12 flex flex-wrap justify-center gap-5">
              <Link to="/cv-builder?flow=build">
                <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-600 px-9 py-4 text-lg font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:scale-105 hover:shadow-blue-600/50 hover:from-blue-500 hover:to-blue-500">
                  Bắt đầu miễn phí
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </Link>
              <Link to="/jobs">
                <button className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-9 py-4 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30">
                  <BriefcaseBusiness size={20} />
                  Khám phá việc làm
                </button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={itemVariants} className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-400">
              {['Miễn phí trọn bộ cơ bản', 'Tạo CV nhanh trong 5 phút', 'Tuyệt đối bảo mật'].map(item => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero demo card */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, type: 'spring', bounce: 0.4 }}
            className="mx-auto mt-20 max-w-4xl"
          >
            <div className="rounded-[2.5rem] p-1.5 bg-gradient-to-br from-indigo-500/20 via-indigo-500/10 to-blue-500/20 glass-dark">
              <div className="rounded-[2.25rem] bg-slate-900/80 p-6 md:p-8 backdrop-blur-2xl shadow-2xl border border-white/10">
                <div className="mb-6 flex items-center gap-2.5">
                  <div className="h-3.5 w-3.5 rounded-full bg-red-400" />
                  <div className="h-3.5 w-3.5 rounded-full bg-amber-400" />
                  <div className="h-3.5 w-3.5 rounded-full bg-emerald-400" />
                  <span className="ml-4 rounded-md bg-white/5 px-3 py-1 text-xs font-semibold text-slate-400">Phân tích CV theo tiêu chuẩn ATS</span>
                </div>
                <div className="grid gap-5 sm:grid-cols-3">
                  {[
                    { label: 'Điểm chuẩn ATS', value: '91%', change: '+29% so với bản gốc', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    {
                      label: 'Cơ hội matching',
                      value: '24',
                      change: 'vị trí mới mở',
                      color: 'text-blue-400',
                      bg: 'bg-blue-500/10'
                    },
                    {
                      label: 'Độ lưu loát Interview',
                      value: '88/100',
                      change: 'xuất sắc hơn 82% ứng viên',
                      color: 'text-blue-400',
                      bg: 'bg-blue-500/10'
                    },
                  ].map(item => (
                    <div key={item.label} className="rounded-2xl border border-white/5 bg-white/5 p-5 transition-transform hover:-translate-y-1">
                      <p className="text-sm font-semibold text-slate-400">{item.label}</p>
                      <p className={`mt-2 text-3xl font-black ${item.color}`}>{item.value}</p>
                      <div className={`mt-2 inline-block rounded-md ${item.bg} px-2 py-1 text-xs font-medium ${item.color}`}>
                        {item.change}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-white/5 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-200">Backend System Engineer @ Techify Global</p>
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                      Top 5% Matching
                    </span>
                  </div>
                  <div className="mt-4 h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: '92%' }} 
                      transition={{ duration: 1.5, delay: 1 }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-b border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-950 px-6 py-12 lg:px-10 transition-colors">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20">
                  <stat.icon size={24} />
                </div>
                <p className="text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 STEPS ── */}
      <section className="bg-slate-50 dark:bg-slate-900/50 px-6 py-24 lg:px-10 transition-colors">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 dark:bg-indigo-500/20 px-4 py-1.5 text-sm font-bold text-indigo-700 dark:text-indigo-400">
              <Sparkles size={16} /> Lộ trình bài bản
            </span>
            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              3 bước đến công việc mơ ước
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
              Tối ưu hóa hành trình của bạn với quy trình khép kín, được bảo trợ toàn diện bởi AI.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className={`card-hover relative flex flex-col rounded-[2rem] border ${step.border} ${step.bg} p-8 shadow-sm backdrop-blur-lg`}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}
                  >
                    <step.icon size={28} className="text-white" />
                  </div>
                  <span className="text-5xl font-black text-slate-200 dark:text-slate-800">{step.number}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-slate-600 dark:text-slate-400 tracking-wide">{step.description}</p>
                <Link to={step.link} className="mt-8 block">
                  <button
                    className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${step.color} px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg w-full justify-center`}
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
      <section className="bg-white dark:bg-slate-950 px-6 py-24 lg:px-10 transition-colors">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Hệ thống công cụ đắc lực
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400 tracking-wide">
              Các tính năng chuyên sâu giúp bạn thống trị mọi bài ứng tuyển khó nhằn nhất.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`card-hover rounded-[1.5rem] border ${f.border} ${f.bg} p-8 backdrop-blur-md`}
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border ${f.border} bg-white dark:bg-slate-900 shadow-sm`}
                >
                  <f.icon size={26} className={f.color} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{f.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400 tracking-wide">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-slate-50 dark:bg-slate-900/30 px-6 py-24 lg:px-10 transition-colors">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Được tin dùng bởi hàng ngàn bạn trẻ
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="card-hover rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 p-8 shadow-sm backdrop-blur-sm transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-lg font-black text-white shadow-md`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-lg">{t.name}</p>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </div>
                <p className="mt-6 text-base italic leading-relaxed text-slate-600 dark:text-slate-300 tracking-wide">
                  "{t.text}"
                </p>
                <div className="mt-6 flex gap-1">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-24 lg:px-10 dark:bg-slate-950">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-blue-700 to-blue-800 p-12 text-center shadow-2xl md:p-20 relative"
        >
          <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dli41b1y5/image/upload/v1703135345/grid-bg_z1oigk.svg')] opacity-10 bg-center bg-repeat mix-blend-overlay" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-lg px-5 py-2 text-sm font-bold text-white shadow-inner">
              <Sparkles size={16} className="text-yellow-300" />
              Sử dụng nền tảng miễn phí
            </span>
            <h2 className="mt-8 text-4xl font-black text-white md:text-5xl lg:text-6xl tracking-tight">
              Khai phóng tiềm năng,
              <br />
              <span className="text-yellow-300">bứt tốc sự nghiệp</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-blue-100 font-medium tracking-wide">
              Đừng để tài năng của bạn chìm khuất sau thiết kế CV nhạt nhoà. Bắt đầu ngay chuyên nghiệp hoá hồ sơ.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-5">
              <Link to="/cv-builder?flow=build">
                <button className="group inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all hover:scale-105 hover:shadow-white/20 hover:bg-slate-50">
                  Tạo CV của bạn
                  <ArrowRight size={22} className="transition-transform group-hover:translate-x-1.5" />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
