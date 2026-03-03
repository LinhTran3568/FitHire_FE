import queryClient from '@lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

import { AppRouter } from '@/router';

/**
 * App root.
 * Providers are composed here so components can access them anywhere.
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}
