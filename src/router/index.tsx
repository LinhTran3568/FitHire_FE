import { AppLayout, MarketingLayout } from '@components/layout';
import { Spinner } from '@components/ui';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ProtectedRoute, PublicOnlyRoute } from './AuthGuards';

const HomePage = lazy(() => import('@pages/HomePage'));
const CvOptimizerPage = lazy(() => import('@pages/CvOptimizerPage'));
const CvScoringPage = lazy(() => import('@pages/CvScoringPage'));
const InterviewPage = lazy(() => import('@pages/InterviewPage'));
const CultureTestLibraryPage = lazy(() => import('@pages/culture/CultureTestLibraryPage'));
const CultureQuizPage = lazy(() => import('@pages/culture/CultureQuizPage'));
const CultureProfilePage = lazy(() => import('@pages/culture/CultureProfilePage'));
const CultureMatchingPage = lazy(() => import('@pages/culture/CultureMatchingPage'));
const JobsPage = lazy(() => import('@pages/JobsPage'));
const JobDetailPage = lazy(() => import('@pages/JobDetailPage'));
const MyCvPage = lazy(() => import('@pages/MyCvPage'));
const DashboardPage = lazy(() => import('@pages/DashboardPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage'));
const SavedJobsPage = lazy(() => import('@pages/SavedJobsPage'));
const SubscriptionPage = lazy(() => import('@pages/SubscriptionPage'));
const LoginPage = lazy(() => import('@pages/LoginPage'));
const RegisterPage = lazy(() => import('@pages/RegisterPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MarketingLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'subscription', element: <SubscriptionPage /> },
      ],
    },
    {
      element: <PublicOnlyRoute />,
      children: [
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/register',
          element: <RegisterPage />,
        },
      ],
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <AppLayout />,
          children: [
            { path: 'dashboard', element: <DashboardPage /> },
            { path: 'profile', element: <ProfilePage /> },
            { path: 'cv-builder', element: <CvOptimizerPage /> },
            { path: 'cv-scoring', element: <CvScoringPage /> },
            { path: 'my-cv', element: <MyCvPage /> },
            { path: 'jobs', element: <JobsPage /> },
            { path: 'jobs/:jobId', element: <JobDetailPage /> },
            { path: 'saved-jobs', element: <SavedJobsPage /> },
            { path: 'interview', element: <InterviewPage /> },
            { path: 'culture/tests', element: <CultureTestLibraryPage /> },
            { path: 'culture/tests/:testId', element: <CultureQuizPage /> },
            { path: 'culture/profile', element: <CultureProfilePage /> },
            { path: 'culture/matching', element: <CultureMatchingPage /> },
          ],
        },
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
