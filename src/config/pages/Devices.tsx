import { Navigate } from 'react-router-dom';

import DevicesPage from '@/pages/devices/DevicesPage';

const DevicesConfig = [
  {
    title: 'Devices',
    path: '/devices',
    element: <Navigate to="/devices/locations/msk" replace />,
    requireAuth: true,
  },
  {
    title: 'Devices',
    path: '/devices/locations/:city',
    element: <DevicesPage />,
    requireAuth: true,
  },
];

export default DevicesConfig;
