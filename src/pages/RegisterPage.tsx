import { Input } from '@components/ui';
import { ArrowLeft, BriefcaseBusiness, FileText, MicVocal, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PERKS = [
  { icon: FileText, text: 'Tạo CV chuẩn ATS chỉ trong 5 phút' },
  { icon: BriefcaseBusiness, text: 'Gợi ý việc làm phù hợp theo hồ sơ' },
  { icon: MicVocal, text: 'Luyện phỏng vấn AI không giới hạn' },
];

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      {/* ── LEFT PANEL ── */}
      <div
        className="relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 lg:flex"
        style={{ background: 'var(--hero-bg)' }}
      >
        <div
          className="pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full blur-3xl"
          style={{ background: 'var(--hero-orb-a)' }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'var(--hero-orb-b)' }}
        />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <Link
          to="/"
          className="relative inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          <ArrowLeft size={14} />
          Trang chủ
        </Link>

        <div className="relative">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}
          >
            <Sparkles size={13} style={{ color: 'var(--color-primary)' }} />
            Hoàn toàn miễn phí
          </div>
          <h2 className="mt-6 text-4xl leading-tight font-bold text-white">
            Bắt đầu hành trình
            <br />
            <span className="text-gradient-hero">sự nghiệp của bạn.</span>
          </h2>
          <p className="mt-4 text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Tạo tài khoản miễn phí và nhận ngay bộ công cụ AI đầy đủ cho hành trình ứng tuyển.
          </p>

          <ul className="mt-8 space-y-4">
            {PERKS.map(perk => (
              <li key={perk.text} className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
                >
                  <perk.icon size={15} />
                </span>
                <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {perk.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>© 2026 FitHire AI</p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 lg:px-16"
        style={{ background: 'var(--color-surface)' }}
      >
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors lg:hidden"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <ArrowLeft size={14} />
            Quay về trang chủ
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold" style={{ color: 'var(--color-text)' }}>
              Đăng ký tài khoản
            </h1>
            <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Miễn phí, không cần thẻ tín dụng
            </p>
          </div>

          <form className="space-y-4">
            <Input type="text" label="Họ và tên" placeholder="Nguyễn Văn A" />
            <Input type="email" label="Email" placeholder="you@example.com" />
            <Input type="password" label="Mật khẩu" placeholder="Tạo mật khẩu (tối thiểu 6 ký tự)" />
            <Input type="password" label="Xác nhận mật khẩu" placeholder="Nhập lại mật khẩu" />

            <button
              type="button"
              className="mt-2 w-full rounded-xl py-3 text-base font-bold text-white transition-all hover:scale-[1.02] hover:opacity-90"
              style={{ background: 'var(--color-primary)', boxShadow: 'var(--shadow-primary)' }}
            >
              Tạo tài khoản
            </button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Đã có tài khoản?{' '}
            <Link
              to="/login"
              className="font-bold hover:underline"
              style={{ color: 'var(--color-primary)' }}
            >
              Đăng nhập
            </Link>
          </p>

          <p className="mt-4 text-center text-xs" style={{ color: 'var(--color-text-subtle)' }}>
            Bằng cách tạo tài khoản, bạn đồng ý với{' '}
            <span className="underline cursor-pointer">Chính sách bảo mật</span> của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
}
