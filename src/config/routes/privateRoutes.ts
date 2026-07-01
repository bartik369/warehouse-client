import AddContractorConfig from '../pages/AddContractor';
import AddDepartmentConfig from '../pages/AddDepartment';
import AddDeviceConfig from '../pages/AddDevice';
import AddLocationConfig from '../pages/AddLocation';
import AddManufacturerConfig from '../pages/AddManufacturer';
import AddModelConfig from '../pages/AddModel';
import AddPermissionConfig from '../pages/AddPermission';
import AddRoleConfig from '../pages/AddRole';
import AddTypeConfig from '../pages/AddType';
import AddUserConfig from '../pages/AddUser';
import AddWarehouseConfig from '../pages/AddWarehouse';
import CalendarConfig from '../pages/Calendar';
import ContractorsConfig from '../pages/Contractors';
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
import MessagesConfig from '../pages/Messages';
import PermissionRoleConfig from '../pages/PermissionRole';
import ProfileConfig from '../pages/Profile';
import StatisticsConfig from '../pages/Statistics';
import UserDetailsConfig from '../pages/UserDetails';
import UsersListConfig from '../pages/UsersList';

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
  AddWarehouseConfig,
  AddDepartmentConfig,
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
