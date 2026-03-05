import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import type { LoginPayload } from '../types';

/**
 * Login mutation hook.
 * Handles the entire login flow: API call → store update → navigate.
 *
 * @example
 * const { login, isPending } = useLogin();
 * login({ email, password });
 */
export function useLogin() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: async data => {
      // Persist token in localStorage via axios interceptor
      localStorage.setItem('access_token', data.accessToken);

      // Fetch current user profile
      const user = await authService.getMe();
      setAuth(user, data.accessToken);

      navigate('/');
    },
    onError: (error: Error) => {
      console.error('Login failed:', error.message);
    },
  });

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}

/**
 * Logout hook.
 */
export function useLogout() {
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();

  return async () => {
    await authService.logout().catch(() => {});
    localStorage.removeItem('access_token');
    clearAuth();
    navigate('/login');
  };
}
