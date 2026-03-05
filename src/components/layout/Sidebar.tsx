import { cn } from '@lib/utils';
import {
  Bookmark,
  BriefcaseBusiness,
  BookOpen,
  FileSearch,
  FileUser,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/cv-builder', label: 'Tạo CV với AI', icon: FileSearch, end: false },
  { to: '/my-cv', label: 'CV của tôi', icon: FileUser, end: false },
  { to: '/jobs', label: 'Tìm việc', icon: BriefcaseBusiness, end: false },
  { to: '/saved-jobs', label: 'Việc đã lưu', icon: Bookmark, end: false },

  { to: '/culture/tests', label: 'Test tính cách', icon: BookOpen, end: false },
];

/**
 * Full-width horizontal navigation for candidate flows.
 */
export function Sidebar() {
  return (
    <aside className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 shadow-md">
      <nav className="mx-auto w-full max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-10">
        <ul className="flex min-w-max items-center gap-1 py-2.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-indigo-500/30 text-white shadow-sm ring-1 ring-indigo-400/50'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white',
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
