import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { AuthUser } from '../types';

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      set => ({
        user: null,
        accessToken: null,
        isAuthenticated: false,

        setAuth: (user, accessToken) =>
          set({ user, accessToken, isAuthenticated: true }, false, 'setAuth'),

        clearAuth: () =>
          set({ user: null, accessToken: null, isAuthenticated: false }, false, 'clearAuth'),
      }),
      {
        name: 'auth-storage',
        // Only persist token, re-fetch user on load
        partialize: state => ({ accessToken: state.accessToken }),
      },
    ),
    { name: 'AuthStore' },
  ),
);
