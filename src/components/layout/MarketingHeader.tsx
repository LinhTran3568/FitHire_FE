import logoImg from '@assets/images/logo.png';
import { Button } from '@components/ui';
import { useAuthStore } from '@features/auth/store/authStore';
import { cn } from '@lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, ChevronDown, FileUser, LogOut, User, Sun, Moon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const CV_FLOWS = [
  {
    to: '/cv-builder?flow=build',
    label: 'Tạo CV',
    description: 'AI hỏi thông tin và tự tạo CV dựa trên dữ liệu bạn cung cấp.',
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
  const cvActive = location.pathname.includes('/cv-builder');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === 'dark' || (!theme && systemDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

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
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 border-b border-white/20 dark:border-slate-800/50 glass dark:glass-dark transition-colors duration-300"
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center group">
          <img
            src={logoImg}
            alt="FitHire AI"
            className="h-16 w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                'text-base font-semibold transition-all duration-300',
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400',
              )
            }
          >
            Trang chủ
          </NavLink>

          <div className="group/dropdown relative py-6">
            <button
              type="button"
              className={cn(
                'inline-flex items-center gap-1.5 text-base font-semibold transition-all duration-300',
                cvActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 group-hover/dropdown:text-blue-600 dark:group-hover/dropdown:text-blue-400',
              )}
            >
              CV
              <ChevronDown size={18} className="transition-transform duration-300 group-hover/dropdown:rotate-180" />
            </button>

            <div className="pointer-events-none invisible absolute top-[calc(100%-1rem)] left-1/2 z-50 w-[24rem] -translate-x-1/2 translate-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 opacity-0 shadow-2xl transition-all duration-300 group-hover/dropdown:pointer-events-auto group-hover/dropdown:visible group-hover/dropdown:translate-y-0 group-hover/dropdown:opacity-100">
              {CV_FLOWS.map(flow => (
                <Link
                  key={flow.to}
                  to={flow.to}
                  className="block rounded-xl px-4 py-3 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-[1.02]"
                >
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{flow.label}</p>
                  <p className="mt-1.5 text-xs tracking-wide text-slate-600 dark:text-slate-400">{flow.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              cn(
                'text-base font-semibold transition-all duration-300',
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400',
              )
            }
          >
            Tìm việc
          </NavLink>

          <NavLink
            to="/subscription"
            className={({ isActive }) =>
              cn(
                'text-base font-semibold transition-all duration-300',
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400',
              )
            }
          >
            Gói Pro
          </NavLink>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105 outline-none shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 rounded-full p-1 text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:scale-105 outline-none"
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/30"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 ring-1 ring-slate-200 dark:ring-slate-700">
                     <User size={20} />
                  </div>
                )}
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[calc(100%+0.5rem)] right-0 z-50 w-64 rounded-2xl border border-white/20 dark:border-slate-800/50 glass dark:glass-dark py-2 shadow-2xl"
                  >
                    <div className="border-b border-slate-200/50 dark:border-slate-700/50 px-5 py-4">
                      <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{user?.name}</p>
                      <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                    </div>
                    <div className="p-2 flex flex-col gap-1">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-blue-50 dark:hover:bg-slate-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <User size={18} />
                        Hồ sơ của tôi
                      </Link>
                      <Link
                        to="/my-cv"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-blue-50 dark:hover:bg-slate-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <FileUser size={18} />
                        CV của tôi
                      </Link>
                      <Link
                        to="/saved-jobs"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-blue-50 dark:hover:bg-slate-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Bookmark size={18} />
                        Việc đã lưu
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                      >
                        <LogOut size={18} />
                        Đăng xuất
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <NavLink to="/login">
                <Button variant="ghost" className="font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Đăng nhập
                </Button>
              </NavLink>
              <NavLink to="/register">
                <Button className="rounded-xl px-7 font-bold shadow-lg shadow-blue-500/30">Đăng ký</Button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
