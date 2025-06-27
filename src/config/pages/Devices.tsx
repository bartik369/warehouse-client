import { Navigate } from "react-router-dom";
import Devices from "../../components/pages/devices/Devices";

// const DevicesConfig = {
//     title: 'Devices',
//     path: '/devices/locations/:city',
//     element: <Devices/>,
//     requireAuth: true,
// }

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
      element: <Devices />,
      requireAuth: true,
    },
  ];
  

export default DevicesConfig;