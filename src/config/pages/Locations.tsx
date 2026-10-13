import { AppRouteConfig } from '@/app/router/config/types';
import LocationsPage from '@/pages/admin/locations/LocationsPage';

const LocationsConfig = {
  title: 'AddLocation',
  path: '/admin/locations',
  element: <LocationsPage />,
  requireAuth: true,
  layout: 'default',
} satisfies AppRouteConfig;
export default LocationsConfig;
