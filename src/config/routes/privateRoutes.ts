import AddDeviceConfig from '../pages/AddDevice';
import AddModelConfig from '../pages/AddModel';
import AddTypeConfig from '../pages/AddType';
import AddUserConfig from '../pages/AddUser';
import CalendarConfig from '../pages/Calendar';
import AddContractorConfig from '../pages/Contractors';
import ContractorsConfig from '../pages/Contractors';
import DepartmentConfig from '../pages/Departments';
import DeviceConfig from '../pages/Device';
import DevicesConfig from '../pages/Devices';
import EditDeviceConfig from '../pages/EditDevice';
import GrantUserRolesConfig from '../pages/GrantUserRoles';
import HomeConfig from '../pages/Home';
import InventoryConfig from '../pages/Inventory';
import InventoryListConfig from '../pages/InventoryList';
import IssueConfig from '../pages/Issue';
import IssueListConfig from '../pages/IssueList';
import KnowledgeConfig from '../pages/Knowledge';
import LocationsConfig from '../pages/Locations';
import AddLocationConfig from '../pages/Locations';
import AddManufacturerConfig from '../pages/Manufacturers';
import MessagesConfig from '../pages/Messages';
import PermissionRoleConfig from '../pages/PermissionRole';
import AddPermissionConfig from '../pages/Permissions';
import ProfileConfig from '../pages/Profile';
import AddRoleConfig from '../pages/Roles';
import StatisticsConfig from '../pages/Statistics';
import UserDetailsConfig from '../pages/UserDetails';
import UsersListConfig from '../pages/UsersList';
import WarehousesConfig from '../pages/Warehouses';

const privateRoutes = [
  HomeConfig,
  ProfileConfig,
  ...DevicesConfig,
  DeviceConfig,
  AddDeviceConfig,
  IssueConfig,
  IssueListConfig,
  InventoryListConfig,
  InventoryConfig,
  EditDeviceConfig,
  AddUserConfig,
  ...UsersListConfig,
  ...UserDetailsConfig,
  AddLocationConfig,
  WarehousesConfig,
  DepartmentConfig,
  AddContractorConfig,
  AddRoleConfig,
  StatisticsConfig,
  MessagesConfig,
  KnowledgeConfig,
  ContractorsConfig,
  CalendarConfig,
  AddPermissionConfig,
  AddManufacturerConfig,
  AddModelConfig,
  AddTypeConfig,
  PermissionRoleConfig,
  GrantUserRolesConfig,
  LocationsConfig,
];

export default privateRoutes;
