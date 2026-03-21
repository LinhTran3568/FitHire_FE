import { Input } from '@components/ui';
import { useAuthStore } from '@features/auth/store/authStore';
import type { AuthUser } from '@features/auth/types';
import { ArrowLeft, BriefcaseBusiness, CheckCircle2, FileText, MicVocal, Sparkles } from 'lucide-react';
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
  { icon: FileText, text: 'Tạo CV chuẩn ATS chỉ trong 5 phút' },
  { icon: BriefcaseBusiness, text: 'Khớp hồ sơ với việc làm thực tế' },
  { icon: MicVocal, text: 'Luyện phỏng vấn AI mọi lúc mọi nơi' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore(state => state.setAuth);

  const [email, setEmail] = useState(MOCK_EMAIL);
  const [password, setPassword] = useState(MOCK_PASSWORD);
  const [errorMessage, setErrorMessage] = useState('');

  const redirectTo = (() => {
    const state = location.state as { from?: string } | null;
    if (!state?.from || state.from === '/login') return '/';
    return state.from;
  })();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    const isValidCredential =
      email.trim().toLowerCase() === MOCK_EMAIL && password.trim() === MOCK_PASSWORD;

    if (!isValidCredential) {
      setErrorMessage('Sai email hoặc mật khẩu. Vui lòng dùng tài khoản demo để đăng nhập.');
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
          className="pointer-events-none absolute -top-28 -left-28 h-80 w-80 rounded-full blur-3xl"
          style={{ background: 'var(--hero-orb-a)' }}
        />
        <div
          className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'var(--hero-orb-b)' }}
        />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <Link
          to="/"
          className="relative inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          <ArrowLeft size={15} />
          Trang chủ
        </Link>

        <div className="relative">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}
          >
            <Sparkles size={14} style={{ color: 'var(--color-primary)' }} />
            Chào mừng trở lại!
          </div>
          <h2 className="mt-6 text-4xl leading-tight font-bold text-white">
            Hành trình nhận việc
            <br />
            <span className="text-gradient-hero">đang chờ bạn.</span>
          </h2>
          <p className="mt-4 text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Đăng nhập để tiếp tục hành trình tạo CV, tìm việc và luyện phỏng vấn AI.
          </p>

          <ul className="mt-8 space-y-4">
            {PERKS.map(perk => (
              <li key={perk.text} className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
                >
                  <perk.icon size={16} />
                </span>
                <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {perk.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
          © 2026 FitHire AI
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
            <h1 className="text-3xl font-extrabold" style={{ color: 'var(--color-text)' }}>
              Đăng nhập
            </h1>
            <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Nhập thông tin tài khoản của bạn
            </p>
          </div>

          {/* Demo hint */}
          <div
            className="mb-6 flex items-start gap-3 rounded-2xl p-4"
            style={{
              background: 'var(--color-primary-muted)',
              border: '1px solid var(--color-primary)',
              borderOpacity: '0.3',
            }}
          >
            <CheckCircle2
              size={16}
              className="mt-0.5 shrink-0"
              style={{ color: 'var(--color-primary)' }}
            />
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <span className="font-bold" style={{ color: 'var(--color-primary)' }}>Tài khoản demo: </span>
              {MOCK_EMAIL} / {MOCK_PASSWORD}
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
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-base font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:opacity-90"
              style={{ background: 'var(--color-primary)', boxShadow: 'var(--shadow-primary)' }}
            >
              Đăng nhập
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
