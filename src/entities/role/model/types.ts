import { User } from '@/entities/user/model/types';
import { RoleFormValues } from '@/features/manage-role/model/schema';

export type Role = RoleFormValues & {
  id: string;
};
export type RoleList = {
  roleId: string;
  roleName: string;
  locationName: string;
  warehouseName?: string;
};

export type UserRolesList = {
  locationName: string;
  warehouseName: string;
  roleName: string;
  permissionsName: string[];
};
export type UserRolesResponse = {
  user: User;
  roles: UserRoleAssignment[];
};

export type UserRoleAssignment = {
  assignmentId: string;
  roleId: string;
  roleName: string;
  locationId?: string;
  locationName?: string;
  warehouseId?: string;
  warehouseName?: string;
  permissionIds: string[];
  permissionsName: string[];
};

export type GrantUserRole = {
  userId: string;
  roles: {
    roleId: string;
    locationId: string;
    warehouseId: string | null;
  }[];
};
