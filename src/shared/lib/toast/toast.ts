import { type ToastOptions, toast } from 'react-toastify';

export const appToast = {
  success: (message: string, options?: ToastOptions) => toast.success(message, options),

  error: (message: string, options?: ToastOptions) => toast.error(message, options),

  warning: (message: string, options?: ToastOptions) => toast.warning(message, options),

  info: (message: string, options?: ToastOptions) => toast.info(message, options),
};
