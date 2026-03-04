import { Button, Input } from '@components/ui';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Đăng ký tài khoản</h1>
        <p className="mt-1 text-sm text-slate-500">
          Tạo tài khoản để sử dụng FitHire AI cho hồ sơ và phỏng vấn.
        </p>

        <form className="mt-6 space-y-4">
          <Input type="text" label="Họ và tên" placeholder="Nguyễn Văn A" />
          <Input type="email" label="Email" placeholder="you@example.com" />
          <Input type="password" label="Mật khẩu" placeholder="Tạo mật khẩu" />
          <Input type="password" label="Xác nhận mật khẩu" placeholder="Nhập lại mật khẩu" />

          <Button className="w-full" type="button">
            Tạo tài khoản
          </Button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Đã có tài khoản?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
