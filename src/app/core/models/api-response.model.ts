export interface ApiError {
  error: boolean;
  message: string;
}

export type ApiResponse<T> = T | ApiError;

export function isApiError(res: any): res is ApiError {
  return res && 'error' in res && 'message' in res;
}