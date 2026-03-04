import { Button } from '@components/ui';
import { useAuthStore } from '@features/auth/store/authStore';
import { cn } from '@lib/utils';
import { ChevronDown, LogOut, User, UserCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '@assets/images/logo.png';

const CV_FLOWS = [
  {
    to: '/cv-builder?flow=build',
    label: 'Tạo CV',
    description: 'AI hỏi thông tin và tự tạo CV theo dữ liệu bạn cung cấp.',
  },
  {
    to: '/cv-builder?flow=review',
    label: 'Rà lỗi CV',
    description: 'Tải CV hiện có lên để chatbot kiểm tra lỗi và gợi ý sửa.',
  },
] as const;

export function MarketingHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);
  const clearAuth = useAuthStore(state => state.clearAuth);
  const cvActive = location.pathname === '/cv-builder';
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    clearAuth();
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center py-1">
          <img src={logoImg} alt="FitHire AI" className="h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                'text-base font-medium transition-colors',
                isActive ? 'text-blue-600' : 'text-slate-800 hover:text-blue-600',
              )
            }
          >
            Trang chủ
          </NavLink>

          <div className="group relative">
            <button
              type="button"
              className={cn(
                'inline-flex items-center gap-1 text-base font-medium transition-colors',
                cvActive ? 'text-blue-600' : 'text-slate-800 hover:text-blue-600',
              )}
            >
              CV
              <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
            </button>

            <div className="pointer-events-none invisible absolute top-full left-0 z-50 w-[22rem] rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
              {CV_FLOWS.map(flow => (
                <Link
                  key={flow.to}
                  to={flow.to}
                  className="block rounded-lg px-3 py-2 transition hover:bg-blue-50"
                >
                  <p className="text-sm font-semibold text-slate-900">{flow.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{flow.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              cn(
                'text-base font-medium transition-colors',
                isActive ? 'text-blue-600' : 'text-slate-800 hover:text-blue-600',
              )
            }
          >
            Tìm việc
          </NavLink>

          <NavLink
            to="/interview"
            className={({ isActive }) =>
              cn(
                'text-base font-medium transition-colors',
                isActive ? 'text-blue-600' : 'text-slate-800 hover:text-blue-600',
              )
            }
          >
            Phỏng vấn AI
          </NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 rounded-full p-1 text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none"
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-100"
                  />
                ) : (
                  <UserCircle size={36} className="text-blue-600" />
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute top-full right-0 z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-slate-900">{user?.name}</p>
                    <p className="truncate text-xs text-slate-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    <User size={16} />
                    Hồ sơ của tôi
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 transition-colors hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login">
                <Button variant="ghost" className="text-slate-700 hover:text-slate-900">
                  Đăng nhập
                </Button>
              </NavLink>
              <NavLink to="/register">
                <Button className="rounded-xl px-6">Đăng ký</Button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
