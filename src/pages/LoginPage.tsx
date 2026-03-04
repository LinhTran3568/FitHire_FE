import { Button, Input } from '@components/ui';
import { useAuthStore } from '@features/auth/store/authStore';
import type { AuthUser } from '@features/auth/types';
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

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore(state => state.setAuth);

  const [email, setEmail] = useState(MOCK_EMAIL);
  const [password, setPassword] = useState(MOCK_PASSWORD);
  const [errorMessage, setErrorMessage] = useState('');

  const redirectTo = (() => {
    const state = location.state as { from?: string } | null;
    if (!state?.from || state.from === '/login') return '/jobs';
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
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Đăng nhập</h1>
        <p className="mt-1 text-sm text-slate-500">Truy cập tài khoản để tiếp tục hành trình ứng tuyển.</p>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
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

          <Button className="w-full" type="submit">
            Đăng nhập
          </Button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
