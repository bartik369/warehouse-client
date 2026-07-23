import { PermissionRole } from '../model/types';

type RoleScope = Pick<PermissionRole, 'roleId' | 'locationId' | 'warehouseId'>;

export const createRoleScopeKey = ({ roleId, locationId, warehouseId }: RoleScope): string => {
  return [roleId, locationId ?? 'null', warehouseId ?? 'null'].join('::');
};
