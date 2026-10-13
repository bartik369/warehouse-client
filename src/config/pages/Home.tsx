import { AppRouteConfig } from '@/app/router/config/types';
import Home from '@/pages/home/Home';

const HomeConfig = {
  title: 'Home',
  path: '/',
  element: <Home />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default HomeConfig;
