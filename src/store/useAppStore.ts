import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { ColorScheme } from '@/types/index';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface AppState {
  theme: ColorScheme;
  setTheme: (theme: ColorScheme) => void;

  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      set => ({
        theme: 'system',
        setTheme: theme => set({ theme }, false, 'setTheme'),

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
        partialize: state => ({ theme: state.theme }),
      },
    ),
    { name: 'AppStore' },
  ),
);

