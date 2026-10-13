import { AppRouteConfig } from '@/app/router/config/types';
import SigninPage from '@/pages/signin/SigninPage';

const SigninConfig = {
  title: 'Signin',
  path: '/login',
  element: <SigninPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default SigninConfig;
