import { Input } from '@components/ui';
import { useAuthStore } from '@features/auth/store/authStore';
import type { AuthUser } from '@features/auth/types';
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  MicVocal,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const MOCK_EMAIL = 'fithire@gmail.com';
const MOCK_PASSWORD = '123';

const mockUser: AuthUser = {
  id: 'mock-user-001',
  name: 'FitHire User',
  email: MOCK_EMAIL,
  role: 'user',
};

const PERKS = [
  { icon: FileText, text: 'Tạo CV chuẩn ATS chỉ trong 5 phút', color: '#5eead4' },
  { icon: BriefcaseBusiness, text: 'Khớp hồ sơ với việc làm thực tế', color: '#93c5fd' },
  { icon: MicVocal, text: 'Luyện phỏng vấn AI mọi lúc mọi nơi', color: '#c4b5fd' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore(state => state.setAuth);

  const [email, setEmail] = useState(MOCK_EMAIL);
  const [password, setPassword] = useState(MOCK_PASSWORD);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const redirectTo = (() => {
    const state = location.state as { from?: string } | null;
    if (!state?.from || state.from === '/login') return '/';
    return state.from;
  })();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    await new Promise(r => setTimeout(r, 500));

    const isValidCredential =
      email.trim().toLowerCase() === MOCK_EMAIL && password.trim() === MOCK_PASSWORD;

    if (!isValidCredential) {
      setErrorMessage('Sai email hoặc mật khẩu. Vui lòng dùng tài khoản demo để đăng nhập.');
      setIsLoading(false);
      return;
    }

    const accessToken = 'mock-access-token-fithire';
    localStorage.setItem('access_token', accessToken);
    setAuth(mockUser, accessToken);
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="flex min-h-screen">
      {/* ── LEFT PANEL ── */}
      <div
        className="relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 lg:flex"
        style={{ background: 'var(--hero-bg)' }}
      >
        {/* Orbs */}
        <div
          className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full"
          style={{ background: 'radial-gradient(circle, var(--hero-orb-a) 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full"
          style={{ background: 'radial-gradient(circle, var(--hero-orb-b) 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute top-1/2 -right-16 h-64 w-64 rounded-full"
          style={{ background: 'radial-gradient(circle, var(--hero-orb-c) 0%, transparent 70%)' }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Back link */}
        <Link
          to="/"
          className="relative inline-flex items-center gap-2 text-sm font-semibold transition-all hover:opacity-80"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          <ArrowLeft size={15} />
          Về trang chủ
        </Link>

        {/* Main content */}
        <div className="relative">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            <Sparkles size={14} style={{ color: '#5eead4' }} />
            Chào mừng trở lại!
          </div>
          <h2
            className="mt-6 text-4xl leading-tight font-black text-white"
            style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.04em' }}
          >
            Hành trình nhận việc
            <br />
            <span className="text-gradient-hero">đang chờ bạn.</span>
          </h2>
          <p className="mt-4 text-base font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Đăng nhập để tiếp tục hành trình tạo CV, tìm việc và luyện phỏng vấn AI.
          </p>

          <ul className="mt-10 space-y-4">
            {PERKS.map((perk, i) => (
              <li
                key={perk.text}
                className="flex items-center gap-4"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `${perk.color}18`,
                    border: `1px solid ${perk.color}30`,
                    color: perk.color,
                  }}
                >
                  <perk.icon size={17} />
                </span>
                <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.72)' }}>
                  {perk.text}
                </span>
              </li>
            ))}
          </ul>

          {/* Stats strip */}
          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              { value: '10K+', label: 'CV đã tạo' },
              { value: '85%', label: 'Tỷ lệ pass' },
              { value: '4.9★', label: 'Đánh giá' },
            ].map(s => (
              <div
                key={s.label}
                className="rounded-2xl p-3 text-center"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <p
                  className="text-xl font-black text-white"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {s.value}
                </p>
                <p
                  className="mt-0.5 text-xs font-medium"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          © 2026 FitHire AI · Bảo mật & Riêng tư
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 lg:px-16"
        style={{ background: 'var(--color-surface)' }}
      >
        <div className="w-full max-w-md">
          {/* Mobile back */}
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors lg:hidden"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <ArrowLeft size={14} />
            Quay về trang chủ
          </Link>

          <div className="mb-8">
            <h1
              className="text-3xl font-black"
              style={{
                color: 'var(--color-text)',
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '-0.03em',
              }}
            >
              Đăng nhập
            </h1>
            <p className="mt-2 text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
              Nhập thông tin tài khoản của bạn để tiếp tục
            </p>
          </div>

          {/* Demo hint */}
          <div
            className="mb-6 flex items-start gap-3 rounded-2xl p-4"
            style={{
              background: 'var(--color-primary-muted)',
              border: `1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)`,
            }}
          >
            <CheckCircle2
              size={16}
              className="mt-0.5 shrink-0"
              style={{ color: 'var(--color-primary)' }}
            />
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <span className="font-bold" style={{ color: 'var(--color-primary)' }}>
                Tài khoản demo:{' '}
              </span>
              {MOCK_EMAIL} · {MOCK_PASSWORD}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={event => setEmail(event.target.value)}
              autoComplete="email"
            />
            <Input
              type="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={event => setPassword(event.target.value)}
              autoComplete="current-password"
              errorMessage={errorMessage}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-bold text-white transition-all duration-300 hover:scale-[1.02] disabled:scale-100 disabled:opacity-70"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent-2))',
                boxShadow: 'var(--shadow-primary)',
              }}
            >
              {isLoading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  Đăng nhập
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Chưa có tài khoản?{' '}
            <Link
              to="/register"
              className="font-bold hover:underline"
              style={{ color: 'var(--color-primary)' }}
            >
              Đăng ký miễn phí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
