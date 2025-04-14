import Devices from "../../components/pages/devices/Devices";

const DevicesConfig = {
    title: 'Devices',
    path: '/devices/locations/:city',
    element: <Devices/>,
    requireAuth: true,
}
export default DevicesConfig;