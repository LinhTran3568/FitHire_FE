import { Outlet } from 'react-router-dom';

import { MarketingFooter } from './MarketingFooter';
import { MarketingHeader } from './MarketingHeader';

/**
 * Main page shell for feature routes.
 * Keeps the same top nav style as Home and removes the extra app shell.
 */
export function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-100">
      <MarketingHeader />

      <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-10">
        <Outlet />
      </main>

      <MarketingFooter />
    </div>
  );
}
