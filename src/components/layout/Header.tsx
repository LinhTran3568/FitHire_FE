import logoImg from '@assets/images/logo.png';
import { Button } from '@components/ui';
import { Bell, Search, Sun, Moon, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        document.documentElement.classList.contains('dark') ||
        localStorage.getItem('theme') === 'dark'
      );
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

  return (
    <header
      className="sticky top-0 z-40 transition-colors duration-300"
      style={{
        background: 'var(--color-surface-overlay)',
        borderBottom: '1px solid var(--color-border)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link to="/" className="flex items-center">
          <img
            src={logoImg}
            alt="FitHire AI"
            className="h-16 w-auto object-contain drop-shadow-md transition-transform hover:scale-105"
          />
        </Link>

        <div className="hidden max-w-sm flex-1 md:flex">
          <div
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-all"
            style={{
              background: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-subtle)',
            }}
          >
            <Search size={15} />
            <span>Tìm việc theo vị trí, kỹ năng, mức lương...</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:scale-105"
            style={{
              background: 'var(--color-primary-muted)',
              color: 'var(--color-primary)',
              border: '1px solid var(--color-border)',
            }}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Notification Bell */}
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:scale-105"
            style={{
              background: 'var(--color-surface-raised)',
              color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Bell size={17} />
            <span
              className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full"
              style={{ background: 'var(--color-primary)' }}
            />
          </button>

          <Link to="/login">
            <Button variant="outline" size="sm">
              Đăng xuất
            </Button>
          </Link>

          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm"
            style={{ background: 'var(--color-primary)' }}
          >
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
