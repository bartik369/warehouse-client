import { User } from '@/entities/user/model/types';

export const USER_ROLES = ['manager', 'operator', 'viewer'] as const;

export type UserRole = (typeof USER_ROLES)[number];

export type PermissionRole = {
  roleId: string;
  roleName: UserRole;
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

export type SortedRolePermissionsRes = {
  items: PermissionRole[];
  total: number;
};

export type UserRoleAssignment = PermissionRole & {
  assignmentId: string;
};

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
