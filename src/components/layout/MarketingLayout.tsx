import { Outlet } from 'react-router-dom';

import { MarketingFooter } from './MarketingFooter';
import { MarketingHeader } from './MarketingHeader';

export function MarketingLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white to-transparent" />
          <div className="absolute top-[5%] left-[-8%] h-[28rem] w-[28rem] rounded-full bg-sky-200/45 blur-[120px]" />
          <div className="absolute top-[20%] right-[-10%] h-[24rem] w-[24rem] rounded-full bg-indigo-200/40 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[30%] h-[22rem] w-[22rem] rounded-full bg-blue-200/40 blur-[110px]" />
        </div>

        <div className="relative z-10">
          <MarketingHeader />
          <main>
            <Outlet />
          </main>
          <MarketingFooter />
        </div>
      </div>
    </div>
  );
}
