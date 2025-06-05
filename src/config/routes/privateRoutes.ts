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
import DeviceConfig from "../pages/Device";
import DevicesConfig from "../pages/Devices";
import EditDeviceConfig from "../pages/EditDevice";
import HomeConfig from "../pages/Home";
import PermissionRoleConfig from "../pages/PermissionRole";
import ProfileConfig from "../pages/Profile";
import UsersConfig from "../pages/UsersList";
import UserDetailsConfig from "../pages/UserDetails";
import GrantUserRolesConfig from "../pages/GrantUserRoles";

const privateRoutes = [
    HomeConfig,
    ProfileConfig,
    DevicesConfig,
    DeviceConfig,
    AddDeviceConfig,
    EditDeviceConfig,
    AddUserConfig,
    UsersConfig,
    UserDetailsConfig,
    AddLocationConfig,
    AddWarehouseConfig,
    AddDepartmentConfig,
    AddContractorConfig,
    AddRoleConfig,
    AddPermissionConfig,
    AddManufacturerConfig,
    AddModelConfig,
    AddTypeConfig,
    PermissionRoleConfig,
    GrantUserRolesConfig,
]

export default privateRoutes;