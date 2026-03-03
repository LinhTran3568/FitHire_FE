import { AppLayout, MarketingLayout } from '@components/layout';
import { Spinner } from '@components/ui';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const HomePage = lazy(() => import('@pages/HomePage'));
const DashboardPage = lazy(() => import('@pages/DashboardPage'));
const CvOptimizerPage = lazy(() => import('@pages/CvOptimizerPage'));
const InterviewPage = lazy(() => import('@pages/InterviewPage'));
const SelfDiscoveryPage = lazy(() => import('@pages/SelfDiscoveryPage'));
const EvaluationReportPage = lazy(() => import('@pages/EvaluationReportPage'));
const CultureTestLibraryPage = lazy(() => import('@pages/culture/CultureTestLibraryPage'));
const CultureQuizPage = lazy(() => import('@pages/culture/CultureQuizPage'));
const CultureProfilePage = lazy(() => import('@pages/culture/CultureProfilePage'));
const CultureMatchingPage = lazy(() => import('@pages/culture/CultureMatchingPage'));
const HrCandidatesPage = lazy(() => import('@pages/hr/HrCandidatesPage'));
const HrCandidateDetailPage = lazy(() => import('@pages/hr/HrCandidateDetailPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MarketingLayout />,
      children: [{ index: true, element: <HomePage /> }],
    },
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { path: 'dashboard', element: <DashboardPage /> },
        { path: 'cv-analyzer', element: <CvOptimizerPage /> },
        { path: 'interview', element: <InterviewPage /> },
        { path: 'self-discovery', element: <SelfDiscoveryPage /> },
        { path: 'culture/tests', element: <CultureTestLibraryPage /> },
        { path: 'culture/tests/:testId', element: <CultureQuizPage /> },
        { path: 'culture/profile', element: <CultureProfilePage /> },
        { path: 'culture/matching', element: <CultureMatchingPage /> },
        { path: 'report', element: <EvaluationReportPage /> },
        { path: 'hr/candidates', element: <HrCandidatesPage /> },
        { path: 'hr/candidates/:candidateId', element: <HrCandidateDetailPage /> },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
  ],
  { basename: import.meta.env.BASE_URL },
);

function PageFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
