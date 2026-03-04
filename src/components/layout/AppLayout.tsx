import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

/**
 * Main candidate shell.
 * Renders header + full-width horizontal nav + page content.
 */
export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Sidebar />

      <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
}

