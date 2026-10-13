import { Navigate } from 'react-router-dom';

import { AppRouteConfig } from '@/app/router/config/types';
import DevicesPage from '@/pages/devices/DevicesPage';

const DevicesConfig = [
  {
    title: 'Devices',
    path: '/devices',
    element: <Navigate to="/devices/locations/msk" replace />,
    requireAuth: true,
    layout: 'wide',
  } satisfies AppRouteConfig,
  {
    title: 'Devices',
    path: '/devices/locations/:city',
    element: <DevicesPage />,
    requireAuth: true,
    layout: 'wide',
  } satisfies AppRouteConfig,
];

export default DevicesConfig;
