import { User } from '@/entities/ user/model/types';

export type PermissionRole = {
  roleId: string;
  roleName?: string;
  permissionIds: string[];
  permissionsName?: string[];
  warehouseId?: string;
  oldWarehouseId?: string;
  warehouseName?: string;
  locationId?: string;
  oldLocationId?: string;
  locationName?: string;
  comment?: string;
};

export type UserRoleAssignment = PermissionRole & {
  assignmentId: string;
};

// export type UserRolesList = {
//   id: string;
//   locationName: string;
//   warehouseName: string;
//   roleName: string;
//   permissionsName: string[];
// };

export type UserRolesResponse = {
  user: Partial<User>;
  roles: UserRoleAssignment[];
};

export type RoleList = {
  roleId: string;
  roleName: string;
  locationName: string;
  warehouseName?: string;
};
