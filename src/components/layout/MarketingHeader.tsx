import logoImg from '@assets/images/logo.png';
import { Button } from '@components/ui';
import { useAuthStore } from '@features/auth/store/authStore';
import { cn } from '@lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bookmark,
  ChevronDown,
  FileUser,
  LogOut,
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
    description: 'AI hỏi thông tin và tự tạo CV chuẩn ATS.',
    icon: FileText,
    color: '#0d9488',
  },
  {
    to: '/cv-scoring',
    label: 'Chấm điểm CV',
    description: 'AI phân tích chất lượng và chấm điểm hồ sơ theo chuẩn chuyên nghiệp.',
    icon: ScanSearch,
    color: '#3b82f6',
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
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const theme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return theme === 'dark' || (!theme && systemDark);
  });

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (!theme) return;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      'relative text-sm font-semibold transition-all duration-200 px-1 py-0.5 nav-underline',
      isActive
        ? 'text-[var(--color-primary)] active'
        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]',
    );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'var(--color-surface-overlay)' : 'var(--color-surface-overlay)',
        borderBottom: '1px solid var(--color-border)',
        backdropFilter: 'blur(24px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
      }}
    >
      {/* Top brand accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--color-primary) 30%, var(--color-accent-2) 70%, transparent 100%)',
        }}
      />

      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" className="group flex items-center">
          <img
            src={logoImg}
            alt="FitHire AI"
            className="h-14 w-auto object-contain drop-shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-md"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-5 md:flex">
          <NavLink to="/" end className={navLinkClass}>
            Trang chủ
          </NavLink>

          {/* CV Dropdown */}
          <div className="group/dropdown relative py-5">
            <button
              type="button"
              className={cn(
                'nav-underline inline-flex items-center gap-1.5 px-1 py-0.5 text-sm font-semibold transition-all duration-200',
                cvActive
                  ? 'active text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] group-hover/dropdown:text-[var(--color-primary)]',
              )}
            >
              CV
              <ChevronDown
                size={13}
                className="transition-transform duration-300 group-hover/dropdown:rotate-180"
              />
            </button>

            <div
              className="pointer-events-none invisible absolute top-[calc(100%-1rem)] left-1/2 z-50 w-72 -translate-x-1/2 translate-y-2 rounded-2xl p-2 opacity-0 shadow-[var(--shadow-lg)] transition-all duration-300 group-hover/dropdown:pointer-events-auto group-hover/dropdown:visible group-hover/dropdown:translate-y-0 group-hover/dropdown:opacity-100"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              {CV_FLOWS.map(flow => (
                <Link
                  key={flow.to}
                  to={flow.to}
                  className="flex items-start gap-3 rounded-xl px-3.5 py-3 transition-all duration-200"
                  style={{ color: 'var(--color-text)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = `${flow.color}0e`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <div
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${flow.color}14`, color: flow.color }}
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
            Phỏng vấn giả lập
          </NavLink>

          <NavLink to="/culture/matching" className={navLinkClass}>
            Khảo sát văn hoá
          </NavLink>

          <NavLink to="/subscription" className={navLinkClass}>
            <span className="flex items-center gap-1">
              Gói Pro
              <span className="text-[10px] opacity-80">✦</span>
            </span>
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 hover:scale-105"
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
                transition={{ duration: 0.18 }}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
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
                    className="h-8 w-8 rounded-xl object-cover ring-2"
                    style={{ ringColor: 'var(--color-primary)' } as React.CSSProperties}
                  />
                ) : (
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--color-primary), var(--color-accent-2))',
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase() ?? <User size={16} />}
                  </div>
                )}
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-[calc(100%+0.5rem)] right-0 z-50 w-60 rounded-2xl py-1.5 shadow-[var(--shadow-lg)]"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div
                      className="mb-1 border-b px-4 py-3"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <p
                        className="truncate text-sm font-bold"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {user?.name}
                      </p>
                      <p
                        className="mt-0.5 truncate text-xs"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {user?.email}
                      </p>
                    </div>
                    <div className="flex flex-col gap-0.5 px-1.5">
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
                            (e.currentTarget as HTMLElement).style.background =
                              'var(--color-primary-muted)';
                            (e.currentTarget as HTMLElement).style.color = 'var(--color-primary)';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                            (e.currentTarget as HTMLElement).style.color =
                              'var(--color-text-secondary)';
                          }}
                        >
                          <item.icon size={15} />
                          {item.label}
                        </Link>
                      ))}
                      <div className="my-1 h-px" style={{ background: 'var(--color-border)' }} />
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all"
                        style={{ color: 'var(--color-danger)' }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.background =
                            'var(--color-danger-light)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                        }}
                      >
                        <LogOut size={15} />
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
                <Button size="sm" className="rounded-xl px-5 font-bold">
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
          className="flex h-9 w-9 items-center justify-center rounded-xl transition-all md:hidden"
          style={{
            background: 'var(--color-surface-raised)',
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
          }}
        >
          {mobileOpen ? <X size={17} /> : <MenuIcon size={17} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden md:hidden"
            style={{
              borderTop: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
            }}
          >
            <div className="flex flex-col gap-1 p-4">
              {[
                { to: '/', label: 'Trang chủ' },
                { to: '/cv-builder?flow=build', label: 'Tạo CV' },
                { to: '/interview', label: 'Phỏng vấn giả lập' },
                { to: '/culture/matching', label: 'Khảo sát văn hoá' },
                { to: '/subscription', label: 'Gói Pro ✦' },
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
                  style={{
                    background: 'var(--color-primary-muted)',
                    color: 'var(--color-primary)',
                  }}
                >
                  {isDark ? <Sun size={17} /> : <Moon size={17} />}
                </button>
                {!isAuthenticated && (
                  <>
                    <NavLink to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        Đăng nhập
                      </Button>
                    </NavLink>
                    <NavLink to="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button size="sm" className="w-full">
                        Đăng ký
                      </Button>
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
