import { Button } from '@components/ui';
import { useNavigate } from 'react-router-dom';

/**
 * Catch-all 404 page.
 */
export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
      <p className="text-8xl font-extrabold text-blue-600">404</p>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Page not found</h1>
        <p className="mt-1 text-gray-500">Sorry, the page you are looking for does not exist.</p>
      </div>
      <Button variant="primary" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </div>
  );
}
