import { lazy, Suspense} from "react";
import Loader from "@/components/ui/loader/Loader";
const LazyAddDevice = lazy(() => import("@/components/pages/admin/device/AddDevice"))

const AddDeviceConfig = {
    title: 'AddDevices',
    path: '/admin/add-device',
    element: (
        <Suspense fallback={<Loader color="green" size="lg" />}>
          <LazyAddDevice />
        </Suspense>
      ),
    requireAuth: true,
}
export default AddDeviceConfig;