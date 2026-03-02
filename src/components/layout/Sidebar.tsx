import { Home, LayoutDashboard } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { cn } from '@lib/utils';
import { useAppStore } from '@store/useAppStore';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: false },
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
        sidebarOpen ? 'w-56' : 'w-16',
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-4 border-b border-gray-200">
        <span className="text-xl font-bold text-blue-600">
          {sidebarOpen ? 'MyApp' : 'M'}
        </span>
      </div>

      {/* Navigation */}
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
                {sidebarOpen && <span>{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
