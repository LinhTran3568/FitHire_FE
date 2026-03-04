import { cn } from '@lib/utils';
import { BriefcaseBusiness, BookOpen, FileSearch, FileUser, MicVocal } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/cv-builder', label: 'Tạo CV với AI', icon: FileSearch, end: false },
  { to: '/my-cv', label: 'CV của tôi', icon: FileUser, end: false },
  { to: '/jobs', label: 'Tìm việc', icon: BriefcaseBusiness, end: false },
  { to: '/interview', label: 'Luyện phỏng vấn', icon: MicVocal, end: false },
  { to: '/culture/tests', label: 'Test tính cách', icon: BookOpen, end: false },
];

/**
 * Full-width horizontal navigation for candidate flows.
 */
export function Sidebar() {
  return (
    <aside className="border-b border-slate-200 bg-white">
      <nav className="mx-auto w-full max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-10">
        <ul className="flex min-w-max items-center gap-2 py-3">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                  )
                }
              >
                <Icon size={16} className="shrink-0" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
