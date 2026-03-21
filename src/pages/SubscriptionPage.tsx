import { Badge, Button } from '@components/ui';
import { Check, CircleHelp, Crown, Sparkles, Target, Zap, Star, ArrowRight, Shield, Clock } from 'lucide-react';
import { useState } from 'react';

interface Plan {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  highlighted?: boolean;
  badge?: string;
  badgeVariant?: 'default' | 'primary' | 'success' | 'warning' | 'info';
  details: string[];
  color: string;
  glow: string;
}

const PLANS: Plan[] = [
  {
    id: 'freemium',
    name: 'Freemium',
    price: '0',
    priceNote: 'VND / mãi mãi',
    description: 'Phù hợp để bắt đầu trải nghiệm hệ thống.',
    icon: Sparkles,
    badge: 'Miễn phí',
    badgeVariant: 'default',
    color: '#64748b',
    glow: 'rgba(100,116,139,0.15)',
    details: [
      '5 lượt JD-CV scan cơ bản/tháng',
      '1 mock interview mini (3 câu hỏi)',
      'Personality snapshot rút gọn',
    ],
  },
  {
    id: 'pay-per-use',
    name: 'Pay-per-Use',
    price: '49.000',
    priceNote: 'VND / lượt',
    description: 'Trả theo lượt sử dụng, linh hoạt theo nhu cầu.',
    icon: Zap,
    badge: 'Linh hoạt',
    badgeVariant: 'info',
    color: '#0891b2',
    glow: 'rgba(8,145,178,0.15)',
    details: [
      'Khuyến mãi ra mắt: 39.000 VND/lượt',
      'Full JD-CV scoring + gap analysis',
      'Mock interview 30 phút + feedback',
      'Personality report + cultural fit',
    ],
  },
  {
    id: 'basic-monthly',
    name: 'Basic Monthly',
    price: '149.000',
    priceNote: 'VND / tháng',
    description: 'Dành cho người dùng có nhu cầu ổn định.',
    icon: Target,
    badge: 'Cân bằng',
    badgeVariant: 'success',
    color: '#0f9e6c',
    glow: 'rgba(15,158,108,0.15)',
    details: [
      '15 scans/tháng',
      '3 mock interviews full',
      '1 cultural-fit report',
      'Lưu lịch sử + theo dõi tiến bộ',
    ],
  },
  {
    id: 'pro-monthly',
    name: 'Pro Monthly',
    price: '199.000',
    priceNote: 'VND / tháng',
    description: 'Gói đầy đủ cho ứng viên muốn tăng tốc tối đa.',
    icon: Crown,
    highlighted: true,
    badge: '⭐ Khuyến nghị',
    badgeVariant: 'warning',
    color: '#0d9488',
    glow: 'rgba(13,148,136,0.25)',
    details: [
      'Scan không giới hạn',
      '8 mock interviews full',
      'Cultural fit + portfolio builder',
      'Priority support + premium templates',
    ],
  },
];

const FEATURES = [
  { icon: Shield, title: 'Bảo mật dữ liệu', desc: 'Dữ liệu CV được mã hóa và không chia sẻ' },
  { icon: Clock, title: 'Nâng cấp linh hoạt', desc: 'Đổi gói bất kỳ lúc nào, không phí ẩn' },
  { icon: Star, title: 'Hoàn tiền 7 ngày', desc: 'Không hài lòng, hoàn 100% trong 7 ngày' },
];

export default function SubscriptionPage() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <div
      className="min-h-screen transition-colors"
      style={{ background: 'var(--color-background)' }}
    >
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(5deg); }
          66% { transform: translateY(8px) rotate(-3deg); }
        }
        @keyframes shimmer-slide {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 0.8; }
          70% { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(0.9); opacity: 0; }
        }
        @keyframes count-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -15px); }
          50% { transform: translate(-5px, -25px); }
          75% { transform: translate(-15px, -10px); }
        }
        .plan-card {
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
        }
        .plan-card:hover {
          transform: translateY(-6px);
        }
        .plan-card.highlighted-card {
          animation: count-up 0.5s ease both;
        }
        .shimmer-bar {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: inherit;
          pointer-events: none;
        }
        .shimmer-bar::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 40%;
          height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          animation: shimmer-slide 2.8s ease-in-out infinite;
        }
        .orb-drift { animation: drift 8s ease-in-out infinite; }
        .orb-drift-slow { animation: drift 12s ease-in-out infinite reverse; }
        .icon-float { animation: float-medium 4s ease-in-out infinite; }
        .pulse-ring-el {
          position: absolute;
          inset: -4px;
          border-radius: 999px;
          border: 2px solid var(--color-primary);
          animation: pulse-ring 2s ease-out infinite;
          pointer-events: none;
        }
      `}</style>

      <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-8 sm:px-6 sm:py-12 lg:px-10">

        {/* ── Hero Banner ── */}
        <div
          className="relative overflow-hidden rounded-3xl p-8"
          style={{ background: 'var(--hero-bg)' }}
        >
          {/* Animated orbs */}
          <div className="orb-drift pointer-events-none absolute -top-12 -right-12 h-56 w-56 rounded-full blur-3xl opacity-60"
            style={{ background: 'var(--hero-orb-a)' }} />
          <div className="orb-drift-slow pointer-events-none absolute -bottom-12 left-1/3 h-40 w-40 rounded-full blur-3xl opacity-50"
            style={{ background: 'var(--hero-orb-b)' }} />
          <div className="orb-drift pointer-events-none absolute top-1/2 -right-4 h-28 w-28 rounded-full blur-2xl opacity-40"
            style={{ background: 'var(--hero-orb-c)' }} />

          {/* Dot pattern decoration */}
          <div className="pointer-events-none absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-lg">
              <h3 className="text-2xl font-extrabold text-white md:text-3xl">
                Tối ưu cơ hội nghề nghiệp<br />
                <span className="text-teal-400">với AI của FitHire</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Từ Freemium đến Pro Monthly, bạn có thể bắt đầu miễn phí rồi nâng cấp khi cần tiến xa hơn.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Không phí ẩn', 'Hủy bất kỳ lúc nào', 'Dữ liệu bảo mật'].map(tag => (
                  <span key={tag}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <Check size={10} strokeWidth={3} /> {tag}
                  </span>
                ))}
              </div>
            </div>
            <div
              className="shrink-0 rounded-2xl px-6 py-5 text-center"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)' }}
            >
              <p className="text-4xl font-black text-white">4</p>
              <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>gói linh hoạt</p>
              <div className="mt-3 h-px" style={{ background: 'rgba(255,255,255,0.12)' }} />
              <p className="mt-3 text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.8)' }}>Bắt đầu từ 0₫</p>
            </div>
          </div>
        </div>

        {/* ── Plans Grid ── */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {PLANS.map((plan, index) => (
            <div
              key={plan.id}
              className={`plan-card flex flex-col rounded-3xl p-6 relative overflow-hidden ${plan.highlighted ? 'highlighted-card' : ''}`}
              style={{
                background: plan.highlighted ? `linear-gradient(145deg, var(--color-surface) 0%, ${plan.glow}55 100%)` : 'var(--color-surface)',
                border: `1.5px solid ${plan.highlighted ? 'var(--color-primary)' : hoveredPlan === plan.id ? plan.color : 'var(--color-border)'}`,
                boxShadow: plan.highlighted
                  ? `0 0 0 1px ${plan.color}30, 0 20px 60px ${plan.glow}, var(--shadow-primary)`
                  : hoveredPlan === plan.id
                    ? `0 12px 40px ${plan.glow}, var(--shadow-md)`
                    : 'var(--shadow-sm)',
                animationDelay: `${index * 0.1}s`,
              }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Shimmer on highlighted */}
              {plan.highlighted && <div className="shimmer-bar" />}

              {/* Background glow bubble on hover */}
              <div
                className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full blur-2xl transition-opacity duration-500"
                style={{
                  background: plan.color,
                  opacity: hoveredPlan === plan.id || plan.highlighted ? 0.1 : 0,
                }}
              />

              {/* HOT ribbon for Pro */}
              {plan.highlighted && (
                <div className="absolute -right-8 top-5 rotate-45 bg-gradient-to-r from-amber-400 to-orange-400 px-10 py-1 text-xs font-black text-white shadow-lg">
                  HOT
                </div>
              )}

              {/* Icon */}
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div
                    className="icon-float flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                    style={{
                      background: plan.highlighted
                        ? `linear-gradient(135deg, var(--color-primary), ${plan.color})`
                        : `${plan.color}18`,
                      color: plan.highlighted ? '#fff' : plan.color,
                      animationDelay: `${index * 0.3}s`,
                    }}
                  >
                    <plan.icon size={22} />
                  </div>
                  {plan.highlighted && <div className="pulse-ring-el" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <Badge variant={plan.badgeVariant ?? 'default'} className="mt-1">
                      {plan.badge}
                    </Badge>
                  )}
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {plan.description}
              </p>

              {/* Price */}
              <div className="my-4 border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-3xl font-black tracking-tight"
                    style={{ color: plan.highlighted ? 'var(--color-primary)' : plan.color }}
                  >
                    {plan.price}
                  </span>
                </div>
                <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--color-text-subtle)' }}>
                  {plan.priceNote}
                </p>
              </div>

              {/* Features */}
              <div className="flex-1 space-y-2.5">
                {plan.details.map(detail => (
                  <div key={detail} className="flex items-start gap-2.5 group/item">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-transform group-hover/item:scale-110"
                      style={{ background: `${plan.color}20`, color: plan.color }}
                    >
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <p className="text-sm leading-snug" style={{ color: 'var(--color-text-secondary)' }}>
                      {detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                {plan.highlighted ? (
                  <Button className="w-full font-bold" variant="primary">
                    <Star size={15} />
                    Chọn gói Pro
                    <ArrowRight size={15} />
                  </Button>
                ) : (
                  <Button
                    className="w-full font-semibold transition-all"
                    variant="outline"
                    style={hoveredPlan === plan.id ? {
                      borderColor: plan.color,
                      color: plan.color,
                    } : {}}
                  >
                    Bắt đầu ngay
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Trust signals ── */}
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all group-hover:scale-110"
                style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
              >
                <feature.icon size={18} />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{feature.title}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Note ── */}
        <div
          className="flex items-start gap-3 rounded-2xl p-4"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <CircleHelp size={18} style={{ color: 'var(--color-text-muted)', marginTop: '2px', flexShrink: 0 }} />
          <div>
            <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>Ghi chú giá</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Giá gói và giới hạn sử dụng có thể được điều chỉnh theo chính sách vận hành và chi phí hệ thống trong từng giai đoạn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
