import AddDepartmentConfig from "../pages/ AddDepartment";
import AddContractorConfig from "../pages/AddContractor";
import AddDeviceConfig from "../pages/AddDevice";
import AddLocationConfig from "../pages/AddLocation";
import AddManufacturerConfig from "../pages/AddManufacturer";
import AddModelConfig from "../pages/AddModel";
import AddPermissionConfig from "../pages/AddPermission";
import AddRoleConfig from "../pages/AddRole";
import AddTypeConfig from "../pages/AddType";
import AddUserConfig from "../pages/AddUser";
import AddWarehouseConfig from "../pages/AddWarehouse";
import DeviceConfig from "../pages/device";
import DevicesConfig from "../pages/Devices";
import EditDeviceConfig from "../pages/EditDevice";
import EditUserConfig from "../pages/EditUser";
import HomeConfig from "../pages/home";
import ProfileConfig from "../pages/Profile";
import UsersConfig from "../pages/Users";

const privateRoutes = [
    HomeConfig,
    ProfileConfig,
    DeviceConfig,
    DevicesConfig,
    AddDeviceConfig,
    EditDeviceConfig,
    AddUserConfig,
    EditUserConfig,
    UsersConfig,
    AddLocationConfig,
    AddWarehouseConfig,
    AddDepartmentConfig,
    AddContractorConfig,
    AddRoleConfig,
    AddPermissionConfig,
    AddManufacturerConfig,
    AddModelConfig,
    AddTypeConfig,
]

export default privateRoutes;