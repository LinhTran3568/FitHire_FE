import { cn } from '@lib/utils';
import { Compass, FileUser, LayoutDashboard, Mic, FileText, ScanSearch } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/cv-builder', label: 'Tạo CV với AI', icon: FileText, end: false },
  { to: '/cv-scoring', label: 'Chấm điểm CV', icon: ScanSearch, end: false },
  { to: '/my-cv', label: 'CV của tôi', icon: FileUser, end: false },
  { to: '/interview', label: 'Phỏng vấn giả lập', icon: Mic, end: false },
  { to: '/culture/matching', label: 'Khảo sát văn hoá', icon: Compass, end: false },
];

export function Sidebar() {
  return (
    <aside
      className="transition-colors duration-300"
      style={{
        background: 'var(--sidebar-bg)',
        borderBottom: '1px solid var(--sidebar-border)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <nav className="mx-auto w-full max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-10">
        <ul className="flex min-w-max items-center gap-0.5 py-1.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200',
                    isActive ? 'shadow-sm' : 'hover:scale-[1.01]',
                  )
                }
                style={({ isActive }) => ({
                  background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                  color: isActive ? 'var(--sidebar-active-text)' : 'var(--sidebar-text)',
                  ...(isActive ? {
                    boxShadow: `inset 3px 0 0 var(--sidebar-active-text)`,
                  } : {}),
                })}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  if (!el.getAttribute('aria-current')) {
                    el.style.background = 'var(--sidebar-hover-bg)';
                    el.style.color = 'var(--color-primary)';
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  if (!el.getAttribute('aria-current')) {
                    el.style.background = 'transparent';
                    el.style.color = 'var(--sidebar-text)';
                  }
                }}
              >
                <Icon size={15} className="shrink-0" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
