import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppLayout } from '@components/layout';
import { Spinner } from '@components/ui';

// ── Lazy-loaded pages (code splitting) ───────────────────────────────────────
const HomePage = lazy(() => import('@pages/HomePage'));
const DashboardPage = lazy(() => import('@pages/DashboardPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));

// ── Route config ──────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'dashboard', element: <DashboardPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

// ── Root loading fallback ─────────────────────────────────────────────────────
function PageFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

/**
 * Application router provider.
 * Wrap all pages in Suspense for lazy-loading.
 */
export function AppRouter() {
  return (
    <Suspense fallback={<PageFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
