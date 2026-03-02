import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { ColorScheme } from '@/types/index';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface AppState {
  // Theme
  theme: ColorScheme;
  setTheme: (theme: ColorScheme) => void;

  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Toasts
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // ── Theme ────────────────────────────────────────────────────────────
        theme: 'system',
        setTheme: theme => set({ theme }, false, 'setTheme'),

        // ── Sidebar ──────────────────────────────────────────────────────────
        sidebarOpen: true,
        toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }, false, 'toggleSidebar'),
        setSidebarOpen: open => set({ sidebarOpen: open }, false, 'setSidebarOpen'),

        // ── Toasts ───────────────────────────────────────────────────────────
        toasts: [],
        addToast: toast =>
          set(
            state => ({
              toasts: [...state.toasts, { ...toast, id: `${Date.now()}-${Math.random()}` }],
            }),
            false,
            'addToast',
          ),
        removeToast: id =>
          set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }), false, 'removeToast'),
      }),
      {
        name: 'app-storage',
        // Only persist theme preference
        partialize: state => ({ theme: state.theme }),
      },
    ),
    { name: 'AppStore' },
  ),
);
