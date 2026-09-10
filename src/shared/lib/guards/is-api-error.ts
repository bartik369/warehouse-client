import { ApiError } from '@/shared/api/types/api-error';

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'message' in error.data &&
    typeof error.data.message === 'string'
  );
};
