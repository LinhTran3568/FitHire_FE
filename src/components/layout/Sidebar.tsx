import { cn } from '@lib/utils';
import { useAppStore } from '@store/useAppStore';
import {
  BarChart3,
  BookOpen,
  Compass,
  FileSearch,
  Home,
  MessageSquareText,
  UsersRound,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Tong quan', icon: Home, end: true },
  { to: '/cv-analyzer', label: 'Toi uu CV', icon: FileSearch, end: false },
  { to: '/interview', label: 'Luyen phong van AI', icon: MessageSquareText, end: false },
  { to: '/self-discovery', label: 'Kham pha ban than', icon: Compass, end: false },
  { to: '/culture/tests', label: 'Culture Fit Test', icon: BookOpen, end: false },
  { to: '/report', label: 'Bao cao ket qua', icon: BarChart3, end: false },
  { to: '/hr/candidates', label: 'HR Dashboard', icon: UsersRound, end: false },
];

/**
 * Collapsible side navigation.
 * Collapses to icon-only mode when `sidebarOpen` is false.
 */
export function Sidebar() {
  const { sidebarOpen } = useAppStore();

  return (
    <aside
      className={cn(
        'flex flex-col border-r border-gray-200 bg-white transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-16',
      )}
    >
      <div className="flex h-16 items-center border-b border-gray-200 px-4">
        <span className="text-xl font-bold text-blue-600">{sidebarOpen ? 'FitHire' : 'F'}</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="flex flex-col gap-1 px-2">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                  )
                }
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && <span className="truncate">{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
