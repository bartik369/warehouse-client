import { AppRouteConfig } from '@/app/router/config/types';
import ResetPasswordPage from '@/pages/reset/ResetPasswordPage';

const ResetPasswordConfig = {
  title: 'ResetPassword',
  path: '/reset-password',
  element: <ResetPasswordPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default ResetPasswordConfig;
