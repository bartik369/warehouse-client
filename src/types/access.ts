import { ChangeEvent } from "react";
import { CheckedPermissionOptions } from "./content";
import { Entity } from "./devices";
import { User } from "./user";

export interface Role {
  id: string;
  name: string;
  comment: string;
}
export interface UserRole {
  id: string;
  email: string;
  userId: string;
  roleName: string;
  roleId: string;
}
export interface Permission {
  id: string;
  name: string;
  comment: string;
  disabled?: boolean;
}
export interface PermissionRole {
  id: string;
  roleId: string;
  roleName: string;
  permissionIds: string[];
  permissionsName: string[];
  warehouseId?: string;
  oldWarehouseId?: string;
  warehouseName?: string;
  locationId?: string;
  oldLocationId?: string;
  locationName?: string;
  comment?: string;
}

export type PermissionRoleRes = Pick<
  PermissionRole,
  | "roleName"
  | "roleId"
  | "warehouseName"
  | "locationName"
  | "permissionsName"
  | "permissionIds"
>;
export type ListRoleRes = Pick<
  PermissionRole,
  "roleName" | "roleId" | "warehouseName" | "locationName"
>;

export interface AccessFormActions {
  handleInputChange: (name: keyof PermissionRole, e: string) => void;
  handleRoleChange: (item: Role) => void;
  handleLocationChange?: (item: Entity) => void;
  handleWarehouseChange?: (item: Entity) => void;
  handleCreateEntity: () => void;
  handleResetEntity: () => void;
  handleCheck: (
    e: ChangeEvent<HTMLInputElement>,
    item: CheckedPermissionOptions,
    name: string
  ) => void;
  handleRoleInfo: (item: UserRolesList) => void;
  handleDeleteRolePerms: (item: UserRolesList) => void;
}
export interface ValidateAccessErrors {
  id: string;
  name: string;
  roleId: string;
  roleName: string;
  permissionId: string[];
  permissionName: string[];
  warehouseId: string;
  warehouseName?: string;
  locationId: string;
  locationName: string;
  comment: string;
}
export interface ValidateUserRoleErrors {
  id?: string;
  email?: string;
  roleName?: string;
}
export interface UserRoleFormActions {
  handleInputChange: (name: keyof UserRole, e: string) => void;
  handleAddUserRole: () => void;
  handleResetUserRole: () => void;
  handleUserInfo: (item: User) => void;
}
export interface UserRolesList {
    locationName: string;
    warehouseName: string;
    roleName: string;
    permissionsName: string[];
}

export interface UserRolesResponse {
  user: Partial<User>;
  roles: UserRolesList[];
}
export interface RoleList {
  roleId: string;
  roleName: string;
  locationName: string;
  warehouseName?: string;
}
