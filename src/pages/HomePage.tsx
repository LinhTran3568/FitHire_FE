import { Button, FeatureCard } from '@components/ui';
import { BriefcaseBusiness, FileText, ScanSearch } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES = [
  {
    icon: FileText,
    title: 'Bước 1: Xây CV có định hướng',
    description: 'Điền thông tin theo gợi ý AI để tạo CV chuẩn ATS cho đúng vị trí mục tiêu.',
  },
  {
    icon: ScanSearch,
    title: 'Bước 2: Rà lỗi và nâng chất lượng',
    description: 'Upload CV để kiểm tra chính tả, ngữ pháp và cải thiện cách diễn đạt thành tựu.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Bước 3: Tìm việc và luyện phỏng vấn',
    description: 'Lọc việc theo mức độ khớp hồ sơ và luyện mock interview trước khi ứng tuyển.',
  },
] as const;

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pt-10 pb-24 lg:px-10 lg:pt-14">
      <section className="grid gap-10 pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-8">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Nền tảng AI cho sinh viên & người tìm việc
          </span>

          <h1 className="max-w-2xl text-5xl leading-[1.05] font-bold tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 bg-clip-text text-transparent">
              Tạo CV chuẩn.
            </span>{' '}
            Luyện phỏng vấn tốt. Tìm đúng việc.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">
            FitHire giúp bạn đi theo một lộ trình rõ ràng: tạo CV, tối ưu chất lượng hồ sơ, sau đó
            tìm đúng việc và chuẩn bị phỏng vấn với AI.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/cv-builder?flow=build">
              <Button size="lg" className="rounded-xl px-7">
                Bắt đầu tạo CV
              </Button>
            </Link>
            <Link to="/cv-builder?flow=review">
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl border-slate-300 bg-white px-7 text-slate-700 hover:bg-slate-100"
              >
                Tải CV để rà lỗi
              </Button>
            </Link>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Intern/Fresher-first</p>
              <p className="mt-1 text-sm text-slate-600">
                Tập trung nhu cầu ứng tuyển người mới đi làm.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">CV chuẩn ATS</p>
              <p className="mt-1 text-sm text-slate-600">
                Gợi ý nội dung rõ ràng, dễ qua vòng lọc hồ sơ.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Mock interview AI</p>
              <p className="mt-1 text-sm text-slate-600">
                Nhận góp ý để cải thiện câu trả lời trước khi apply.
              </p>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-300/60">
          <div className="absolute -top-4 -left-4 z-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-600 to-indigo-500 text-3xl text-white shadow-sm">
            AI
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Demo trải nghiệm chính</p>

            <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-medium text-slate-800">Backend Java Intern</p>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-blue-600 to-indigo-500" />
              </div>
              <p className="text-xs text-slate-500">Độ khớp hồ sơ: 86%</p>
              <p className="text-sm text-slate-700">
                AI gợi ý: thêm thành tựu có số liệu để tăng sức thuyết phục.
              </p>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-medium text-blue-700">Bước tiếp theo</p>
              <p className="mt-1 text-sm text-slate-700">
                Chạy mock interview theo JD để luyện cách trả lời trước khi nộp hồ sơ.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-slate-900">Phù hợp cho:</span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
            Sinh viên năm cuối
          </span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
            Intern/Fresher IT
          </span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
            Người chuyển hướng nghề nghiệp
          </span>
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Lộ trình 3 bước rõ ràng
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Tối ưu cho hành trình ứng tuyển thực tế: từ CV đến phỏng vấn và chọn công việc phù hợp.
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

      <section className="mx-auto mt-8 max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm shadow-slate-300/60 md:p-14">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Sẵn sàng bắt đầu với CV của bạn?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 md:text-xl">
          Ưu tiên bắt đầu từ CV để hệ thống gợi ý việc làm và phỏng vấn chính xác hơn.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/cv-builder?flow=build">
            <Button size="lg" className="rounded-xl px-9">
              Bắt đầu tạo CV
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" size="lg" className="rounded-xl px-9">
              Tạo tài khoản
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
