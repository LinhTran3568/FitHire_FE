import { Button } from '@components/ui';
import { cn } from '@lib/utils';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/cv-analyzer', label: 'CV' },
  { to: '/interview', label: 'Interview' },
  { to: '/dashboard', label: 'Jobs' },
];

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm">
            F
          </div>
          <span className="text-2xl font-semibold text-slate-900">FitHire AI</span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'text-base font-medium transition-colors',
                  isActive ? 'text-blue-600' : 'text-slate-800 hover:text-blue-600',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <NavLink to="/dashboard">
            <Button variant="ghost" className="text-slate-700 hover:text-slate-900">
              Login
            </Button>
          </NavLink>
          <NavLink to="/dashboard">
            <Button className="rounded-xl px-6">Sign Up</Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
