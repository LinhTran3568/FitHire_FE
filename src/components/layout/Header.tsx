import { useAppStore } from '@store/useAppStore';
import { Bell, Menu, Search, X } from 'lucide-react';


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

      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-semibold text-white">
          F
        </div>
        <span className="text-sm font-semibold text-slate-900">FitHire AI</span>
      </div>

      <div className="hidden max-w-xs flex-1 md:flex">
        <div className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
          <Search size={16} />
          <span>Tìm kiếm ứng viên, JD, báo cáo...</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
          <Bell size={18} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-blue-600" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          M
        </div>
      </div>
    </header>
  );
}
