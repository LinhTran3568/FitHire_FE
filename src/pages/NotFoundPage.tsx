import { Button } from '@components/ui';
import { Home, ArrowLeft, SearchX } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-8 text-center px-6"
      style={{ background: 'var(--color-background)' }}
    >
      {/* 404 Art */}
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-30"
          style={{ background: 'var(--color-primary)', transform: 'scale(2)' }}
        />
        <div
          className="relative flex h-32 w-32 items-center justify-center rounded-3xl"
          style={{ background: 'var(--color-primary-muted)', border: '1px solid var(--color-border)' }}
        >
          <SearchX size={56} style={{ color: 'var(--color-primary)' }} />
        </div>
      </div>

      <div>
        <p
          className="text-8xl font-extrabold tracking-tight"
          style={{ color: 'var(--color-primary)' }}
        >
          404
        </p>
        <h1
          className="mt-2 text-2xl font-bold"
          style={{ color: 'var(--color-text)' }}
        >
          Không tìm thấy trang
        </h1>
        <p className="mt-2 text-base" style={{ color: 'var(--color-text-muted)' }}>
          Trang bạn truy cập không tồn tại hoặc đã được di chuyển.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Quay lại
        </Button>
        <Link to="/">
          <Button>
            <Home size={16} />
            Về trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
}
