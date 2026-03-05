import logoImg from '@assets/images/logo.png';
import { Button } from '@components/ui';
import { Bell, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Top application header.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link to="/" className="flex items-center">
          <img
            src={logoImg}
            alt="FitHire AI"
            className="h-20 w-auto object-contain drop-shadow-md transition-transform hover:scale-105"
          />
        </Link>

        <div className="hidden max-w-sm flex-1 md:flex">
          <div className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
            <Search size={16} />
            <span>Tìm việc theo vị trí, kỹ năng, mức lương...</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
            <Bell size={18} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-600" />
          </button>
          <Link to="/login">
            <Button variant="outline" size="sm">
              Đăng xuất
            </Button>
          </Link>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
