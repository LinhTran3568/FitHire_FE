import { Button, FeatureCard } from '@components/ui';
import { BriefcaseBusiness, FileText, ScanSearch } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES = [
  {
    icon: ScanSearch,
    title: 'Luyện phỏng vấn AI',
    description: 'Phỏng vấn bằng voice + camera, đánh giá biểu cảm và tông giọng',
  },
  {
    icon: FileText,
    title: 'CV Studio thông minh',
    description: 'Tạo CV từ hội thoại với AI hoặc upload CV để rà lỗi',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Tìm việc theo CV',
    description: 'Lọc việc theo lĩnh vực, vị trí, lương và độ khớp hồ sơ',
  },
] as const;

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-10 lg:px-10 lg:pt-14">
      <section className="grid gap-10 pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-8">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Nền tảng AI cho sinh viên & người tìm việc
          </span>

          <h1 className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 bg-clip-text text-transparent">
              Tạo CV chuẩn.
            </span>{' '}
            Luyện phỏng vấn tốt. Tìm đúng việc.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">
            FitHire giúp bạn xây CV với AI, luyện phỏng vấn đa phương thức và chọn việc phù hợp hơn
            ngay từ hồ sơ.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/cv-builder">
              <Button size="lg" className="rounded-xl px-7">
                Bắt đầu tạo CV
              </Button>
            </Link>
            <Link to="/jobs">
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl border-slate-300 bg-white px-7 text-slate-700 hover:bg-slate-100"
              >
                Xem việc làm
              </Button>
            </Link>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-2xl font-semibold text-slate-900">+3.200</p>
              <p className="mt-1 text-sm text-slate-600">CV đã tạo với AI</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-2xl font-semibold text-slate-900">+1.500</p>
              <p className="mt-1 text-sm text-slate-600">Phiên mock interview</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-2xl font-semibold text-slate-900">86%</p>
              <p className="mt-1 text-sm text-slate-600">Mức khớp việc trung bình</p>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-300/60">
          <div className="absolute -left-4 -top-4 z-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-600 to-indigo-500 text-3xl text-white shadow-sm">
            AI
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-medium text-blue-700">CV Assistant</p>
              <p className="mt-2 text-sm text-slate-700">
                Mình cần thêm thành tựu có số liệu để tăng điểm lọc CV.
              </p>
            </div>

            <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-medium text-slate-800">Backend Java Intern</p>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-blue-600 to-indigo-500" />
              </div>
              <p className="text-xs text-slate-500">Độ khớp hồ sơ: 86%</p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <p className="text-xs text-slate-500">Biểu cảm</p>
                <p className="text-lg font-semibold text-slate-900">82%</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <p className="text-xs text-slate-500">Tông giọng</p>
                <p className="text-lg font-semibold text-slate-900">78%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Tính năng nổi bật</h2>
        <p className="mt-2 text-sm text-slate-600">
          Thiết kế đồng bộ với luồng sử dụng chính của ứng viên từ CV đến phỏng vấn và tìm việc.
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(feature => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm shadow-slate-300/60 md:p-14">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Sẵn sàng nâng cấp hồ sơ ứng tuyển?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 md:text-xl">
          Bắt đầu với CV của bạn và để AI đồng hành xuyên suốt hành trình tìm việc.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/register">
            <Button size="lg" className="rounded-xl px-9">
              Tạo tài khoản miễn phí
            </Button>
          </Link>
          <Link to="/jobs">
            <Button variant="outline" size="lg" className="rounded-xl px-9">
              Xem danh sách việc làm
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
