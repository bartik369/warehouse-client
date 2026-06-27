import { Suspense, lazy } from 'react';

import Loader from '@/shared/ui/loader/Loader';

const LazyAddDevice = lazy(() => import('@/components/pages/admin/device/AddDevice'));

const AddDeviceConfig = {
  title: 'AddDevices',
  path: '/admin/add-device',
  element: (
    <Suspense fallback={<Loader color="green" size="lg" />}>
      <LazyAddDevice />
    </Suspense>
  ),
  requireAuth: true,
};
export default AddDeviceConfig;
