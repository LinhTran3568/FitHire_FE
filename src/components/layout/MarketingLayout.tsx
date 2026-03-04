import { Outlet } from 'react-router-dom';

import { MarketingFooter } from './MarketingFooter';
import { MarketingHeader } from './MarketingHeader';

export function MarketingLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <MarketingHeader />
      <main>
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  );
}
