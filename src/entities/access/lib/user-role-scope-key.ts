import { UserRoleAssignment } from '@/entities/role/model/types';

type UserRoleScope = Omit<UserRoleAssignment, 'permissionsName'>;
export const userRoleScopeKey = ({
  roleName,
  warehouseName,
  locationName,
}: UserRoleScope): string => {
  return [roleName, warehouseName ?? 'null', locationName ?? 'null'].join('::');
};
