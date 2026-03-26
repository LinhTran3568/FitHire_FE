import {
  Check,
  CircleHelp,
  Crown,
  Sparkles,
  Target,
  Zap,
  Star,
  ArrowRight,
  Shield,
  Clock,
  ChevronRight,
} from 'lucide-react';
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
  details: string[];
  color: string;
  glow: string;
  aiModel?: string;
  tier: 'free' | 'session' | 'plus' | 'pro';
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '0',
    priceNote: 'VNĐ · mãi mãi',
    description: 'Trải nghiệm nền tảng, không cần thẻ ngân hàng.',
    icon: Sparkles,
    badge: 'Miễn phí',
    color: '#64748b',
    glow: 'rgba(100,116,139,0.18)',
    aiModel: 'Gemini 1.5 Flash',
    tier: 'free',
    details: [
      '3 lượt Scan JD-CV',
      '1 buổi Mock Interview dạng Text',
      '3 câu Mock Voice',
      'Báo cáo cơ bản sau phỏng vấn',
    ],
  },
  {
    id: 'per-session',
    name: 'Lượt lẻ',
    price: '29.000',
    priceNote: 'VNĐ / buổi · Giá Beta',
    description: 'Trả từng buổi, không cần đăng ký. Linh hoạt hoàn toàn.',
    icon: Zap,
    badge: '🔥 Beta 29k',
    color: '#0891b2',
    glow: 'rgba(8,145,178,0.22)',
    aiModel: 'GPT-4o + Whisper',
    tier: 'session',
    details: [
      '1 buổi Mock Interview Voice đầy đủ',
      'Phân tích nội dung chuyên sâu',
      'Giọng đọc AI chất lượng cao',
      'Feedback chi tiết từng câu trả lời',
      'Giá gốc 39K → Beta 29K',
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    price: '129.000',
    priceNote: 'VNĐ / tháng',
    description: 'Chất lượng vượt trội, hiệu quả ổn định cho người dùng tích cực.',
    icon: Target,
    badge: 'Phổ biến',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.22)',
    aiModel: 'Gemini 1.5 Pro',
    tier: 'plus',
    details: [
      '15 lượt Scan CV',
      '5 buổi Mock Interview Text',
      '5 buổi Mock Voice đầy đủ',
      'Lưu lịch sử & theo dõi tiến bộ',
      'Radar chart kỹ năng sau phỏng vấn',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '349.000',
    priceNote: 'VNĐ / tháng',
    description: 'Trải nghiệm cao cấp nhất với GPT-4o intelligence không giới hạn.',
    icon: Crown,
    highlighted: true,
    badge: '⭐ Khuyến nghị',
    color: '#0d9488',
    glow: 'rgba(13,148,136,0.28)',
    aiModel: 'GPT-4o',
    tier: 'pro',
    details: [
      'Scan CV không giới hạn',
      '10 buổi Mock Interview Text',
      '15 buổi Mock Voice đầy đủ',
      'Ưu tiên hỗ trợ + template premium',
      'Cultural fit analysis toàn diện',
    ],
  },
];

export default function SubscriptionPage() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <div
      className="min-h-screen transition-colors"
      style={{ background: 'var(--color-background)' }}
    >
      <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
        {/* ── Hero Banner ── */}
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-12 md:px-12"
          style={{ background: 'var(--hero-bg)' }}
        >
          {/* Ambient orbs */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full"
            style={{ background: 'radial-gradient(circle, var(--hero-orb-a) 0%, transparent 70%)' }}
          />
          <div
            className="pointer-events-none absolute -bottom-16 left-1/3 h-56 w-56 rounded-full"
            style={{ background: 'radial-gradient(circle, var(--hero-orb-b) 0%, transparent 70%)' }}
          />
          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative z-10 text-center">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold"
              style={{
                background: 'rgba(13,148,136,0.2)',
                border: '1px solid rgba(13,148,136,0.4)',
                color: '#5eead4',
              }}
            >
              <Crown size={13} />
              Chọn gói phù hợp với bạn
            </span>
            <h1
              className="mt-5 text-4xl font-black text-white md:text-5xl"
              style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.04em' }}
            >
              Tối ưu cơ hội nghề nghiệp
              <br />
              <span className="text-gradient-hero">với AI của FitHire</span>
            </h1>
            <p className="mt-4 text-base font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Từ Freemium đến Pro Monthly — bắt đầu miễn phí, nâng cấp khi cần tiến xa hơn.
            </p>

            {/* Trust pills */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {['Không phí ẩn', 'Hủy bất kỳ lúc nào', 'Dữ liệu bảo mật', 'Bắt đầu từ 0₫'].map(
                tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.75)',
                      border: '1px solid rgba(255,255,255,0.14)',
                    }}
                  >
                    <Check size={11} strokeWidth={3} color="#5eead4" /> {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* ── Plans Grid ── */}
        <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan, index) => {
            const isHovered = hoveredPlan === plan.id;
            const isActive = plan.highlighted || isHovered;
            return (
              <div
                key={plan.id}
                className="relative flex flex-col overflow-hidden rounded-3xl"
                style={{
                  background: plan.highlighted
                    ? `linear-gradient(160deg, var(--color-surface) 0%, color-mix(in srgb, ${plan.color} 8%, var(--color-surface)) 100%)`
                    : 'var(--color-surface)',
                  border: `1.5px solid ${plan.highlighted ? plan.color : isHovered ? `${plan.color}80` : 'var(--color-border)'}`,
                  boxShadow: plan.highlighted
                    ? `0 0 0 1px ${plan.color}20, 0 20px 60px ${plan.glow}, var(--shadow-lg)`
                    : isHovered
                      ? `0 12px 40px ${plan.glow}, var(--shadow-md)`
                      : 'var(--shadow-sm)',
                  transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  animationDelay: `${index * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {/* Shimmer overlay on Pro */}
                {plan.highlighted && <div className="shimmer-overlay" />}

                {/* Most popular ribbon */}
                {plan.highlighted && (
                  <div
                    className="absolute top-6 -right-9 rotate-45 px-12 py-1 text-xs font-black text-white"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}
                  >
                    HOT
                  </div>
                )}

                <div className="flex-1 p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{
                        background: plan.highlighted
                          ? `linear-gradient(135deg, ${plan.color}, ${plan.color}bb)`
                          : `${plan.color}14`,
                        color: plan.highlighted ? '#fff' : plan.color,
                        boxShadow: plan.highlighted ? `0 8px 24px ${plan.glow}` : 'none',
                      }}
                    >
                      <plan.icon size={22} />
                    </div>
                    {plan.badge && (
                      <span
                        className="rounded-full px-2.5 py-1 text-xs font-black"
                        style={{
                          background: `${plan.color}15`,
                          color: plan.color,
                          border: `1px solid ${plan.color}30`,
                        }}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <h3
                    className="mt-4 text-xl font-black"
                    style={{ color: 'var(--color-text)', fontFamily: 'Outfit, sans-serif' }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className="mt-1.5 text-sm leading-relaxed"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div
                    className="my-5 border-b pb-5"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className="text-4xl font-black"
                        style={{
                          color: plan.color,
                          fontFamily: 'Outfit, sans-serif',
                          letterSpacing: '-0.04em',
                        }}
                      >
                        {plan.price}
                      </span>
                      {plan.id !== 'free' && (
                        <span className="text-lg font-bold" style={{ color: plan.color }}>
                          ₫
                        </span>
                      )}
                    </div>
                    <p
                      className="mt-1 text-xs font-semibold"
                      style={{ color: 'var(--color-text-subtle)' }}
                    >
                      {plan.priceNote}
                    </p>
                    {plan.aiModel && (
                      <span
                        className="mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold"
                        style={{ background: `${plan.color}12`, color: plan.color }}
                      >
                        <Sparkles size={9} /> {plan.aiModel}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5">
                    {plan.details.map(detail => (
                      <li key={detail} className="flex items-start gap-2.5">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{ background: `${plan.color}18`, color: plan.color }}
                        >
                          <Check size={11} strokeWidth={3} />
                        </span>
                        <span
                          className="text-sm leading-snug"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="p-6 pt-0">
                  {plan.highlighted ? (
                    <button
                      className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-black text-white transition-all duration-300 hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${plan.color}, ${plan.color}bb)`,
                        boxShadow: `0 8px 24px ${plan.glow}`,
                      }}
                    >
                      <Star size={14} />
                      Chọn gói Pro
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all duration-300 hover:scale-105"
                      style={{
                        background: isHovered ? `${plan.color}14` : 'var(--color-surface-raised)',
                        color: isHovered ? plan.color : 'var(--color-text-secondary)',
                        border: `1.5px solid ${isHovered ? plan.color : 'var(--color-border)'}`,
                      }}
                    >
                      Bắt đầu ngay
                      <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Trust signals ── */}
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: Shield,
              title: 'Bảo mật dữ liệu',
              desc: 'Dữ liệu CV được mã hóa AES-256 và tuyệt đối không chia sẻ với bên thứ ba.',
            },
            {
              icon: Clock,
              title: 'Nâng cấp linh hoạt',
              desc: 'Đổi gói bất kỳ lúc nào, hủy chỉ 1 click. Không có khoản phí ẩn nào.',
            },
          ].map(feature => (
            <div
              key={feature.title}
              className="card-hover group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
              >
                <feature.icon size={20} />
              </div>
              <div>
                <p className="font-bold" style={{ color: 'var(--color-text)' }}>
                  {feature.title}
                </p>
                <p className="mt-0.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Note ── */}
        <div
          className="flex items-start gap-3 rounded-2xl p-5"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <CircleHelp
            size={18}
            style={{ color: 'var(--color-text-muted)', marginTop: '2px', flexShrink: 0 }}
          />
          <div>
            <h3 className="mb-1 text-sm font-bold" style={{ color: 'var(--color-text)' }}>
              Ghi chú giá
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Giá gói và giới hạn sử dụng có thể được điều chỉnh theo chính sách vận hành và chi phí
              hệ thống trong từng giai đoạn phát triển của dịch vụ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
