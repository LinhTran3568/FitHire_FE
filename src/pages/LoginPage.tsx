import { Input } from '@components/ui';
import { useAuthStore } from '@features/auth/store/authStore';
import type { AuthUser } from '@features/auth/types';
import { ArrowLeft, BriefcaseBusiness, CheckCircle2, FileText, MicVocal } from 'lucide-react';
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
      {/* Left panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 p-12 lg:flex">
        {/* Orbs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <Link
          to="/"
          className="relative inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Trang chủ
        </Link>

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
            ✨ Chào mừng trở lại!
          </div>
          <h2 className="mt-5 text-4xl leading-tight font-bold text-white">
            Hành trình nhận việc
            <br />
            <span className="text-gradient-hero">đang chờ bạn.</span>
          </h2>
          <p className="mt-4 text-slate-300">
            Đăng nhập để tiếp tục hành trình tạo CV, tìm việc và luyện phỏng vấn AI.
          </p>

          <ul className="mt-8 space-y-4">
            {PERKS.map(perk => (
              <li key={perk.text} className="flex items-center gap-3 text-sm text-slate-200">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <perk.icon size={15} className="text-violet-300" />
                </span>
                {perk.text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-slate-500">© 2026 FitHire AI</p>
      </div>

      {/* Right panel */}
      <div className="flex w-full flex-col items-center justify-center bg-white px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="w-full max-w-md">
          {/* Mobile back link */}
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-indigo-600 lg:hidden"
          >
            <ArrowLeft size={15} />
            Quay về trang chủ
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Đăng nhập</h1>
            <p className="mt-2 text-slate-500">Nhập thông tin tài khoản của bạn</p>
          </div>

          {/* Demo hint */}
          <div className="mb-6 flex items-start gap-2 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-500" />
            <p className="text-sm text-blue-700">
              <span className="font-semibold">Tài khoản demo:</span> {MOCK_EMAIL} / {MOCK_PASSWORD}
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
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] hover:shadow-indigo-300"
            >
              Đăng nhập
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Đăng ký miễn phí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
