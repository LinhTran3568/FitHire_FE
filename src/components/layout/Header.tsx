import { Menu, X } from 'lucide-react';

import { useAppStore } from '@store/useAppStore';

/**
 * Top navigation bar.
 */
export function Header() {
  const { toggleSidebar, sidebarOpen } = useAppStore();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6 shadow-sm">
      <button
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="flex-1" />

      {/* Right slot – add user menu, notifications, etc. here */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          U
        </div>
      </div>
    </header>
  );
}
