import { Badge, Button, SectionTitle, SurfaceCard } from '@components/ui';
import { Check, CircleHelp, Crown, Sparkles, Target, Zap } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  highlighted?: boolean;
  badge?: string;
  details: string[];
}

const PLANS: Plan[] = [
  {
    id: 'freemium',
    name: 'Freemium',
    price: '0 VND',
    description: 'Phù hợp để bắt đầu trải nghiệm hệ thống.',
    icon: Sparkles,
    badge: 'Miễn phí',
    details: [
      '5 lượt JD-CV scan cơ bản/tháng (fit score + top gaps).',
      '1 mock interview mini (5-10 phút, 3 câu hỏi).',
      'Personality snapshot rút gọn (4 traits + work-style tip).',
    ],
  },
  {
    id: 'pay-per-use',
    name: 'Pay-per-Use',
    price: '49.000 VND/lượt',
    description: 'Trả theo lượt sử dụng, linh hoạt theo nhu cầu.',
    icon: Zap,
    badge: 'Linh hoạt',
    details: [
      'Launch promotion (0-3 tháng đầu): 39.000 VND/lượt (sau đó quay về 49.000 VND/lượt).',
      'Full JD-CV scoring + gap analysis + edit suggestions: 49.000 VND/lượt.',
      'Mock interview 30 phút (10 câu) + score/feedback: 49.000 VND/lượt.',
      'Personality report + cultural fit tips: 49.000 VND/lượt.',
    ],
  },
  {
    id: 'basic-monthly',
    name: 'Basic Monthly',
    price: '149.000 VND/tháng',
    description: 'Dành cho người dùng có nhu cầu ổn định mỗi tháng.',
    icon: Target,
    badge: 'Cân bằng',
    details: [
      '15 scans/tháng.',
      '3 mock interviews full.',
      '1 cultural-fit report full.',
      'Lưu lịch sử + theo dõi tiến bộ.',
    ],
  },
  {
    id: 'pro-monthly',
    name: 'Pro Monthly',
    price: '199.000 VND/tháng',
    description: 'Gói đầy đủ cho ứng viên muốn tăng tốc tối đa.',
    icon: Crown,
    highlighted: true,
    badge: 'Khuyến nghị',
    details: [
      'Scan nhiều/không giới hạn (tuỳ cost policy).',
      '8 mock interviews full.',
      'Cultural fit + portfolio builder.',
      'Priority support + premium templates.',
    ],
  },
];

export default function SubscriptionPage() {
  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <SectionTitle
          title="Gói Subscription"
          subtitle="Chọn gói phù hợp với nhu cầu sử dụng và lộ trình ứng tuyển của bạn."
        />

        <SurfaceCard className="overflow-hidden border-indigo-100 bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-800 p-0 text-white">
          <div className="grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide">
                <Sparkles size={14} />
                Bảng giá cập nhật
              </p>
              <h3 className="mt-3 text-2xl font-bold">Tối ưu chi phí theo đúng nhu cầu sử dụng</h3>
              <p className="mt-2 max-w-2xl text-sm text-blue-100">
                Từ Freemium đến Pro Monthly, bạn có thể bắt đầu miễn phí rồi nâng cấp khi cần.
              </p>
            </div>
            <Badge className="w-fit bg-amber-100 text-amber-800">Có gói trả theo lượt</Badge>
          </div>
        </SurfaceCard>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {PLANS.map(plan => (
            <SurfaceCard
              key={plan.id}
              className={`flex flex-col border ${
                plan.highlighted
                  ? 'border-blue-300 bg-gradient-to-b from-blue-50/80 via-white to-white shadow-xl shadow-blue-500/10 scale-105 z-10 relative'
                  : 'border-slate-200 bg-white shadow-sm'
              }`}
            >
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      plan.highlighted ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <plan.icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">{plan.name}</h3>
                    {plan.badge && (
                      <Badge
                        className={
                          plan.highlighted
                            ? 'bg-blue-100 text-blue-700 mt-1'
                            : 'bg-slate-100 text-slate-700 mt-1'
                        }
                      >
                        {plan.badge}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-slate-500 min-h-[40px] leading-relaxed">{plan.description}</p>

                <div className="mt-2 text-center pb-4 border-b border-slate-100">
                  <p className="text-3xl font-extrabold tracking-tight text-slate-900">
                    {plan.price}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex-1 space-y-3">
                {plan.details.map(detail => (
                  <div key={detail} className="flex items-start gap-2.5">
                    <span className="mt-0.5 rounded-full bg-emerald-100 p-1 text-emerald-600 shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <p className="text-sm text-slate-700 leading-snug">{detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button
                  className={`w-full rounded-xl py-6 font-bold text-base ${
                    plan.highlighted ? 'shadow-lg shadow-blue-500/30' : ''
                  }`}
                  variant={plan.highlighted ? 'primary' : 'outline'}
                >
                  {plan.highlighted ? 'Chọn gói Pro' : 'Bắt đầu ngay'}
                </Button>
              </div>
            </SurfaceCard>
          ))}
        </div>

        <SurfaceCard>
          <div className="mb-2 flex items-center gap-2">
            <CircleHelp size={16} className="text-slate-700" />
            <h3 className="text-lg font-semibold text-slate-900">Ghi chú giá</h3>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            Giá gói và giới hạn sử dụng có thể được điều chỉnh theo chính sách vận hành và chi phí
            hệ thống trong từng giai đoạn.
          </p>
        </SurfaceCard>
      </div>
    </section>
  );
}
