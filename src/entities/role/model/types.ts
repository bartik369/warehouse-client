import { User } from '@/entities/ user/model/types';
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
  user: Partial<User>;
  roles: UserRolesList[];
};
