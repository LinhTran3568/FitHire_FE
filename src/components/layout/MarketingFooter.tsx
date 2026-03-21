import { Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MarketingFooter() {
  return (
    <footer
      className="transition-colors duration-300"
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div>
            <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
              FitHire AI
            </p>
            <p className="mt-0.5 text-xs flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
              Made with <Heart size={11} style={{ color: 'var(--color-primary)' }} fill="currentColor" /> for job seekers
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            {[
              { to: '/', label: 'Trang chủ' },
              { to: '/jobs', label: 'Tìm việc' },
              { to: '/subscription', label: 'Gói Pro' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="font-medium transition-colors hover:opacity-80"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social + Copyright */}
          <div className="flex items-center gap-4">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <button
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-all hover:scale-105"
                style={{
                  background: 'var(--color-surface-raised)',
                  color: 'var(--color-text-muted)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Icon size={15} />
              </button>
            ))}
            <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>
              © 2026 FitHire AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
