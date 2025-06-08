import { email } from "./../utils/constants/constants";
import { ChangeEvent } from "react";
import { CheckedPermissionOptions } from "./content";
import { IEntity } from "./devices";
import { IUser } from "./user";

export interface IRole {
  id: string;
  name: string;
  comment: string;
}
export interface IUserRole {
  id: string;
  email: string;
  userId: string;
  roleName: string;
  roleId: string;
}
export interface IPermission {
  id: string;
  name: string;
  comment: string;
  disabled?: boolean;
}
export interface IPermissionRole {
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

export type IPermissionRoleRes = Pick<
  IPermissionRole,
  | "roleName"
  | "roleId"
  | "warehouseName"
  | "locationName"
  | "permissionsName"
  | "permissionIds"
>;
export type IListRoleRes = Pick<
  IPermissionRole,
  "roleName" | "roleId" | "warehouseName" | "locationName"
>;

export interface IAccessFormActions {
  handleInputChange: (name: keyof IPermissionRole, e: string) => void;
  handleRoleChange: (item: IRole) => void;
  handleLocationChange?: (item: IEntity) => void;
  handleWarehouseChange?: (item: IEntity) => void;
  handleCreateEntity: () => void;
  handleResetEntity: () => void;
  handleCheck: (
    e: ChangeEvent<HTMLInputElement>,
    item: CheckedPermissionOptions,
    name: string
  ) => void;
  handleRoleInfo: (item: IUserRolesList) => void;
  handleDeleteRolePerms: (item: IUserRolesList) => void;
}
export interface IValidateAccessErrors {
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
export interface IValidateUserRoleErrors {
  id?: string;
  email?: string;
  roleName?: string;
}
export interface IUserRoleFormActions {
  handleInputChange: (name: keyof IUserRole, e: string) => void;
  handleAddUserRole: () => void;
  handleResetUserRole: () => void;
  handleUserInfo: (item: IUser) => void;
}
export interface IUserRolesList {
    locationName: string;
    warehouseName: string;
    roleName: string;
    permissionsName: string[];
}

export interface IUserRolesResponse {
  user: Partial<IUser>;
  roles: IUserRolesList[];
}
