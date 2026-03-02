import apiClient from '@lib/axios';

import type { AuthTokens, LoginPayload } from '../types';

/**
 * Auth API service.
 * All auth-related HTTP calls live here – components never call axios directly.
 */
export const authService = {
  /** POST /auth/login */
  login: async (payload: LoginPayload): Promise<AuthTokens> => {
    const { data } = await apiClient.post<AuthTokens>('/auth/login', payload);
    return data;
  },

  /** POST /auth/logout */
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  /** GET /auth/me */
  getMe: async () => {
    const { data } = await apiClient.get('/auth/me');
    return data;
  },
};
