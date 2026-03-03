import { Outlet } from 'react-router-dom';

import { MarketingFooter } from './MarketingFooter';
import { MarketingHeader } from './MarketingHeader';

export function MarketingLayout() {
  return (
    <div className="min-h-screen bg-[var(--landing-bg)] text-white">
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-[-12%] top-[8%] h-[34rem] w-[34rem] rounded-full opacity-35 blur-[140px]"
            style={{ backgroundColor: 'var(--landing-glow-a)' }}
          />
          <div
            className="absolute right-[-10%] top-[22%] h-[30rem] w-[30rem] rounded-full opacity-30 blur-[130px]"
            style={{ backgroundColor: 'var(--landing-glow-b)' }}
          />
          <div
            className="absolute bottom-[-8%] left-[20%] h-[28rem] w-[28rem] rounded-full opacity-35 blur-[120px]"
            style={{ backgroundColor: 'var(--landing-glow-c)' }}
          />
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
