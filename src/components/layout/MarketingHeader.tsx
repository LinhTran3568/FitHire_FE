import logoImg from '@assets/images/logo.png';
import { Button } from '@components/ui';
import { useAuthStore } from '@features/auth/store/authStore';
import { cn } from '@lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bookmark,
  ChevronDown,
  Compass,
  FileUser,
  LogOut,
  Mic,
  User,
  Sun,
  Moon,
  FileText,
  ScanSearch,
  MenuIcon,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const CV_FLOWS = [
  {
    to: '/cv-builder?flow=build',
    label: 'Tạo CV với AI',
    description: 'AI hỏi thông tin và tự tạo CV dựa trên dữ liệu bạn cung cấp.',
    icon: FileText,
  },
  {
    to: '/cv-builder?flow=review',
    label: 'Rà lỗi CV',
    description: 'Tải CV hiện có lên để chatbot kiểm tra lỗi và gợi ý sửa.',
    icon: ScanSearch,
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
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'text-sm font-semibold transition-all duration-200 px-1 py-0.5 rounded relative',
      isActive
        ? 'text-[var(--color-primary)]'
        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]',
    );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 transition-colors duration-300"
      style={{
        background: 'var(--color-surface-overlay)',
        borderBottom: '1px solid var(--color-border)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src={logoImg}
            alt="FitHire AI"
            className="h-14 w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" end className={navLinkClass}>
            Trang chủ
          </NavLink>

          {/* CV Dropdown */}
          <div className="group/dropdown relative py-6">
            <button
              type="button"
              className={cn(
                'inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200',
                cvActive
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] group-hover/dropdown:text-[var(--color-primary)]',
              )}
            >
              <FileText size={15} />
              CV
              <ChevronDown
                size={15}
                className="transition-transform duration-300 group-hover/dropdown:rotate-180"
              />
            </button>

            <div
              className="pointer-events-none invisible absolute top-[calc(100%-1.25rem)] left-1/2 z-50 w-80 -translate-x-1/2 translate-y-3 rounded-2xl p-2 opacity-0 shadow-[var(--shadow-lg)] transition-all duration-300 group-hover/dropdown:pointer-events-auto group-hover/dropdown:visible group-hover/dropdown:translate-y-0 group-hover/dropdown:opacity-100"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              {CV_FLOWS.map(flow => (
                <Link
                  key={flow.to}
                  to={flow.to}
                  className="flex items-start gap-3 rounded-xl px-4 py-3 transition-all duration-200"
                  style={{ color: 'var(--color-text)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--color-primary-muted)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <div
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
                  >
                    <flow.icon size={15} />
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                      {flow.label}
                    </p>
                    <p className="mt-0.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {flow.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/interview" className={navLinkClass}>
            <span className="flex items-center gap-1.5">
              <Mic size={15} />
              Phỏng vấn giả lập
            </span>
          </NavLink>

          <NavLink to="/culture/matching" className={navLinkClass}>
            <span className="flex items-center gap-1.5">
              <Compass size={15} />
              Khảo sát văn hoá
            </span>
          </NavLink>

          <NavLink to="/subscription" className={navLinkClass}>
            Gói Pro
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:scale-105"
            style={{
              background: 'var(--color-primary-muted)',
              color: 'var(--color-primary)',
              border: '1px solid var(--color-border)',
            }}
            aria-label="Toggle Theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>

          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 rounded-xl p-1 transition-all hover:scale-105"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-9 w-9 rounded-xl object-cover ring-2"
                    style={{ ringColor: 'var(--color-primary)' } as React.CSSProperties}
                  />
                ) : (
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl font-bold text-white text-sm"
                    style={{ background: 'var(--color-primary)' }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase() ?? <User size={18} />}
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
                    className="absolute top-[calc(100%+0.5rem)] right-0 z-50 w-64 rounded-2xl py-2 shadow-[var(--shadow-lg)]"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div
                      className="border-b px-5 py-4"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <p className="truncate text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {user?.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {user?.email}
                      </p>
                    </div>
                    <div className="p-2 flex flex-col gap-0.5">
                      {[
                        { to: '/profile', icon: User, label: 'Hồ sơ của tôi' },
                        { to: '/my-cv', icon: FileUser, label: 'CV của tôi' },
                        { to: '/saved-jobs', icon: Bookmark, label: 'Việc đã lưu' },
                      ].map(item => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all"
                          style={{ color: 'var(--color-text-secondary)' }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = 'var(--color-primary-muted)';
                            (e.currentTarget as HTMLElement).style.color = 'var(--color-primary)';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                            (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)';
                          }}
                        >
                          <item.icon size={16} />
                          {item.label}
                        </Link>
                      ))}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all"
                        style={{ color: 'var(--color-danger)' }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.background = 'var(--color-danger-light)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                        }}
                      >
                        <LogOut size={16} />
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
                <Button variant="ghost" size="sm" className="font-semibold">
                  Đăng nhập
                </Button>
              </NavLink>
              <NavLink to="/register">
                <Button size="sm" className="rounded-xl px-6 font-bold">
                  Đăng ký
                </Button>
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(o => !o)}
          className="flex h-9 w-9 items-center justify-center rounded-xl md:hidden"
          style={{
            background: 'var(--color-surface-raised)',
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
          }}
        >
          {mobileOpen ? <X size={18} /> : <MenuIcon size={18} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden md:hidden"
            style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-surface)' }}
          >
            <div className="flex flex-col gap-1 p-4">
              {[
                { to: '/', label: 'Trang chủ' },
                { to: '/cv-builder?flow=build', label: 'Tạo CV' },
                { to: '/interview', label: 'Phỏng vấn giả lập' },
                { to: '/culture/matching', label: 'Khảo sát văn hoá' },
                { to: '/subscription', label: 'Gói Pro' },
              ].map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {item.label}
                </NavLink>
              ))}
              <div
                className="mt-3 flex gap-2 border-t pt-3"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <button
                  onClick={toggleTheme}
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                {!isAuthenticated && (
                  <>
                    <NavLink to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">Đăng nhập</Button>
                    </NavLink>
                    <NavLink to="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button size="sm" className="w-full">Đăng ký</Button>
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
