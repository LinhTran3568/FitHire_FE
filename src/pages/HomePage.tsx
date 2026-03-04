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
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    link: '/cv-builder?flow=build',
    cta: 'Tạo CV ngay',
  },
  {
    number: '02',
    icon: ScanSearch,
    title: 'Rà lỗi & nâng chất lượng',
    description: 'Upload CV để AI kiểm tra lỗi, gợi ý cải thiện ngôn ngữ và tăng điểm ATS đáng kể.',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
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
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    link: '/interview',
    cta: 'Luyện ngay',
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: 'Tạo CV trong 5 phút',
    description: 'AI tự điền nội dung theo thông tin bạn cung cấp, chuẩn format nhà tuyển dụng.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  {
    icon: ScanSearch,
    title: 'Phân tích ATS thông minh',
    description: 'Kiểm tra điểm ATS, phát hiện từ khóa còn thiếu và đề xuất cải thiện tức thì.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Gợi ý việc phù hợp',
    description: 'So khớp hồ sơ với hàng trăm JD, tìm ra vị trí bạn có cơ hội cao nhất.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
  },
  {
    icon: MicVocal,
    title: 'Mock interview AI',
    description: 'Phỏng vấn thử với AI theo đúng JD bạn muốn apply, nhận góp ý chi tiết.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  {
    icon: TrendingUp,
    title: 'Theo dõi tiến độ',
    description: 'Dashboard rõ ràng giúp bạn biết mình đang ở đâu trong hành trình ứng tuyển.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
  },
  {
    icon: Users,
    title: 'Cộng đồng & hỗ trợ',
    description: 'Kết nối với hàng nghìn bạn cùng lộ trình, chia sẻ kinh nghiệm thực chiến.',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
  },
];

const TESTIMONIALS = [
  {
    name: 'Nguyễn Minh Khoa',
    role: 'Frontend Intern @ Techify',
    text: 'FitHire giúp mình tạo CV và luyện phỏng vấn chỉ trong 1 tuần. Kết quả là pass vòng kỹ thuật ngay lần đầu!',
    avatar: 'MK',
    color: 'from-violet-500 to-blue-500',
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

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-6 pt-20 pb-32 lg:px-10 lg:pt-28">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="pointer-events-none absolute top-10 right-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-300">
              <Sparkles size={14} className="text-violet-400" />
              Nền tảng AI số 1 cho sinh viên & người tìm việc
            </div>

            <h1 className="animate-fade-up-d1 mt-8 text-5xl leading-[1.08] font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              Tìm việc đúng, <span className="text-gradient-hero">nhanh hơn</span>
              <br />
              với trợ lý AI
            </h1>

            <p className="animate-fade-up-d2 mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
              FitHire giúp bạn tạo CV chuẩn ATS, rà lỗi hồ sơ, tìm đúng việc và luyện phỏng vấn với
              AI — tất cả trong một nền tảng duy nhất.
            </p>

            <div className="animate-fade-up-d3 mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/cv-builder?flow=build">
                <button className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:scale-105 hover:shadow-violet-500/50">
                  Bắt đầu miễn phí
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </Link>
              <Link to="/jobs">
                <button className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                  <BriefcaseBusiness size={18} />
                  Khám phá việc làm
                </button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="animate-fade-up-d4 mt-10 flex flex-wrap justify-center gap-3 text-sm text-slate-400">
              {['Miễn phí', 'Không cần thẻ tín dụng', 'Tạo CV trong 5 phút'].map(item => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Hero demo card */}
          <div className="animate-fade-up-d4 mx-auto mt-16 max-w-3xl">
            <div className="glass rounded-3xl p-1">
              <div className="rounded-[22px] bg-slate-900/80 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="ml-3 text-xs text-slate-500">FitHire AI — Dashboard</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: 'Điểm CV', value: '91%', change: '+29%', color: 'text-emerald-400' },
                    {
                      label: 'Việc phù hợp',
                      value: '24',
                      change: 'mới hôm nay',
                      color: 'text-blue-400',
                    },
                    {
                      label: 'Điểm phỏng vấn',
                      value: '88/100',
                      change: 'tốt',
                      color: 'text-violet-400',
                    },
                  ].map(item => (
                    <div key={item.label} className="rounded-xl bg-white/5 p-4">
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className={`mt-1 text-2xl font-bold ${item.color}`}>{item.value}</p>
                      <p className="mt-1 text-xs text-slate-400">{item.change}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-300">Backend Java Intern @ Techify Vietnam</p>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-400">
                      89% phù hợp
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-700">
                    <div className="h-full w-[89%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-b border-slate-100 bg-white px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`card-hover animate-fade-up text-center`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <p className="text-gradient-primary text-3xl font-extrabold tracking-tight md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 STEPS ── */}
      <section className="bg-gradient-to-b from-slate-50 to-white px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
              <Sparkles size={14} /> Lộ trình rõ ràng
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              3 bước đến công việc mơ ước
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Từ CV đến offer letter — hành trình được tối ưu hoàn toàn bằng AI.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className={`card-hover animate-fade-up relative rounded-2xl border ${step.border} ${step.bg} p-7`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}
                  >
                    <step.icon size={22} className="text-white" />
                  </div>
                  <span className="text-4xl font-black text-slate-200">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
                <Link to={step.link} className="mt-5 block">
                  <button
                    className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${step.color} px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-105`}
                  >
                    {step.cta}
                    <ArrowRight size={15} />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="bg-white px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Mọi thứ bạn cần để ứng tuyển thành công
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Bộ công cụ toàn diện được thiết kế riêng cho sinh viên và người tìm việc tại Việt Nam.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`card-hover animate-fade-up rounded-2xl border ${f.border} ${f.bg} p-6`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border ${f.border} bg-white`}
                >
                  <f.icon size={20} className={f.color} />
                </div>
                <h3 className="font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-gradient-to-b from-slate-50 to-white px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Được tin dùng bởi hàng ngàn bạn trẻ
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className={`card-hover animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-sm font-bold text-white`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">"{t.text}"</p>
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-violet-900 to-blue-900 p-12 text-center shadow-2xl md:p-16">
          <div className="pointer-events-none absolute inset-0 rounded-3xl" />
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80">
            <Sparkles size={13} className="text-yellow-400" />
            Hoàn toàn miễn phí
          </span>
          <h2 className="mt-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Sẵn sàng tìm được
            <br />
            <span className="text-gradient-hero">công việc đầu tiên?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">
            Bắt đầu bằng CV — hệ thống sẽ gợi ý việc và luyện phỏng vấn chính xác hơn.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/cv-builder?flow=build">
              <button className="group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-indigo-700 shadow-xl transition-all hover:scale-105">
                Tạo CV miễn phí
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <Link to="/register">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                Tạo tài khoản
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
