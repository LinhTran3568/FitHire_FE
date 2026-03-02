import { QueryClient } from '@tanstack/react-query';

/**
 * Shared React Query client.
 * - staleTime  : 5 minutes  – re-fetch only after 5 min
 * - gcTime     : 10 minutes – keep unused data in cache 10 min
 * - retry      : 1          – retry failed requests once
 * - refetchOnWindowFocus: false – disable refetch on tab focus
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

export default queryClient;
