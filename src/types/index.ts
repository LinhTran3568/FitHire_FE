// ── Pagination ────────────────────────────────────────────────────────────────
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// ── API response wrapper ──────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

// ── UI States ─────────────────────────────────────────────────────────────────
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
export type ColorScheme = 'light' | 'dark' | 'system';

// ── Utility types ─────────────────────────────────────────────────────────────
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type WithId<T> = T & { id: string };
