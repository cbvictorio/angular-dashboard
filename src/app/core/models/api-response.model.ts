export interface ApiError {
  error: boolean;
  message: string;
}

export type ApiResponse<T> = T | ApiError;

export function isApiError(res: unknown): res is ApiError {
  return !!res && typeof res === 'object' && 'error' in res;
}