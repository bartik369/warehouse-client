import { ChangeEvent } from "react";
import { CheckedDeviceOptions, CheckedPermissionOptions } from "./content";
import { IEntity } from "./devices";

export interface IRole {
    id: string;
    name: string;
    comment: string;
}
export interface IPermission {
    id: string;
    name: string;
    comment: string;
    disabled?: boolean;
}
export interface IPermissionRole {
    id: string;
    name: string;
    roleId: string;
    roleName: string;
    permissionId: string[];
    permissionName: string[];
    warehouseId?: string;
    warehouseName?: string;
    locationId?: string;
    locationName?: string;
    comment?: string;
}
export interface IAccessFormActions {
    handleInputChange: (name: keyof IPermissionRole, e: string) => void;
    handleRoleChange: (item: IPermissionRole) => void;
    handlePermissionChange: (item: IPermissionRole) => void;
    handleLocationChange?: (item: IEntity) => void;
    handleWarehouseChange?: (item: IEntity) => void;
    handleCreateEntity: () => void;
    handleResetEntity: () => void;
    handleCheck:(e: ChangeEvent<HTMLInputElement>, item: CheckedPermissionOptions) => void;
}