import LocationsPage from '@/pages/admin/locations/LocationsPage';

const LocationsConfig = {
  title: 'AddLocation',
  path: '/admin/locations',
  element: <LocationsPage />,
  requireAuth: true,
};
export default LocationsConfig;
