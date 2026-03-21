import { Input } from '@components/ui';
import { ArrowLeft, BriefcaseBusiness, FileText, MicVocal, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const PERKS = [
  { icon: FileText, text: 'Tạo CV chuẩn ATS chỉ trong 5 phút' },
  { icon: BriefcaseBusiness, text: 'Gợi ý việc làm phù hợp theo hồ sơ' },
  { icon: MicVocal, text: 'Luyện phỏng vấn AI không giới hạn' },
];

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-950 to-blue-900 p-12 lg:flex">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <Link
          to="/"
          className="relative inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Trang chủ
        </Link>

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
            <Sparkles size={13} className="text-yellow-400" />
            Hoàn toàn miễn phí
          </div>
          <h2 className="mt-5 text-4xl leading-tight font-bold text-white">
            Bắt đầu hành trình
            <br />
            <span className="text-gradient-hero">sự nghiệp của bạn.</span>
          </h2>
          <p className="mt-4 text-slate-300">
            Tạo tài khoản miễn phí và nhận ngay bộ công cụ AI đầy đủ cho hành trình ứng tuyển.
          </p>

          <ul className="mt-8 space-y-4">
            {PERKS.map(perk => (
              <li key={perk.text} className="flex items-center gap-3 text-sm text-slate-200">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <perk.icon size={15} className="text-blue-300" />
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
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-indigo-600 lg:hidden"
          >
            <ArrowLeft size={15} />
            Quay về trang chủ
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Đăng ký tài khoản</h1>
            <p className="mt-2 text-slate-500">Miễn phí, không cần thẻ tín dụng</p>
          </div>

          <form className="space-y-5">
            <Input type="text" label="Họ và tên" placeholder="Nguyễn Văn A" />
            <Input type="email" label="Email" placeholder="you@example.com" />
            <Input
              type="password"
              label="Mật khẩu"
              placeholder="Tạo mật khẩu (tối thiểu 6 ký tự)"
            />
            <Input type="password" label="Xác nhận mật khẩu" placeholder="Nhập lại mật khẩu" />

            <button
              type="button"
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] hover:shadow-blue-300"
            >
              Tạo tài khoản
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Đăng nhập
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-slate-400">
            Bằng cách tạo tài khoản, bạn đồng ý với{' '}
            <span className="underline">Chính sách bảo mật</span> của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
}
