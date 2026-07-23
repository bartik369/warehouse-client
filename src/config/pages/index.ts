import { AppRouteConfig } from '@/app/router/config/types';

import GrantUserRolesConfig from './Access';
import AddDeviceConfig from './AddDevice';
import AddModelConfig from './AddModel';
import AddTypeConfig from './AddType';
import AddUserConfig from './AddUser';
import CalendarConfig from './Calendar';
import AddContractorConfig from './Contractors';
import ContractorsConfig from './Contractors2';
import DeviceConfig from './Device';
import DevicesConfig from './Devices';
import EditDeviceConfig from './EditDevice';
import HomeConfig from './Home';
import InventoryConfig from './Inventory';
import InventoryListConfig from './InventoryList';
import IssueConfig from './Issue';
import IssueListConfig from './IssueList';
import KnowledgeConfig from './Knowledge';
import AddLocationConfig from './Locations';
import LocationsConfig from './Locations';
import AddManufacturerConfig from './Manufacturers';
import MessagesConfig from './Messages';
import PermissionRoleConfig from './PermissionRole';
import AddPermissionConfig from './Permissions';
import ProfileConfig from './Profile';
import ResetPasswordConfig from './ResetPassword';
import AddRoleConfig from './Roles';
import SigninConfig from './Signin';
import StatisticsConfig from './Statistics';
import UserDetailsConfig from './UserDetails';
import UsersListConfig from './UsersList';
import AddWarehouseConfig from './Warehouses';

export const pageConfigs: AppRouteConfig[] = [
  AddContractorConfig,
  AddDeviceConfig,
  AddLocationConfig,
  AddManufacturerConfig,
  AddModelConfig,
  AddPermissionConfig,
  AddRoleConfig,
  AddTypeConfig,
  AddUserConfig,
  AddWarehouseConfig,
  CalendarConfig,
  ContractorsConfig,
  DeviceConfig,
  ...DevicesConfig,
  EditDeviceConfig,
  GrantUserRolesConfig,
  HomeConfig,
  InventoryConfig,
  InventoryListConfig,
  IssueConfig,
  IssueListConfig,
  KnowledgeConfig,
  LocationsConfig,
  MessagesConfig,
  PermissionRoleConfig,
  ProfileConfig,
  ResetPasswordConfig,
  SigninConfig,
  StatisticsConfig,
  ...UserDetailsConfig,
  ...UsersListConfig,
];
