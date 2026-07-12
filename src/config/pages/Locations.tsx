import { ManageLocation } from '@/features/manage-location/ui/ManageLocation';

const LocationsConfig = {
  title: 'AddLocation',
  path: '/admin/locations',
  element: <ManageLocation />,
  requireAuth: true,
};
export default LocationsConfig;
