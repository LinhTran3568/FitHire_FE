import { Button, Input } from '@components/ui';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Đăng nhập</h1>
        <p className="mt-1 text-sm text-slate-500">Truy cập tài khoản để tiếp tục hành trình ứng tuyển.</p>

        <form className="mt-6 space-y-4">
          <Input type="email" label="Email" placeholder="you@example.com" />
          <Input type="password" label="Mật khẩu" placeholder="Nhập mật khẩu" />

          <Button className="w-full" type="button">
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
