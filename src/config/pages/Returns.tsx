import { AppRouteConfig } from '@/app/router/config/types';
import ReturnsPage from '@/pages/returns/ReturnPage';

const ReturnsConfig = {
  title: 'Returns',
  path: '/returns',
  element: <ReturnsPage />,
  requireAuth: true,
  layout: 'wide',
} satisfies AppRouteConfig;
export default ReturnsConfig;
