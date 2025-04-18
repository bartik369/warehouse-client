import { ChangeEvent } from "react";
import { CheckedDeviceOptions } from "./content";

export interface IRole {
    id: string;
    name: string;
    comment: string;
}
export interface IPermission {
    id: string;
    name: string;
    comment: string;
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
    handleLocationChange?: (item: IPermissionRole) => void;
    handleWarehouseChange?: (item: IPermissionRole) => void;
    handleCreateEntity: (e: React.MouseEvent<HTMLButtonElement>, type?: string) => void;
    handleResetEntity: () => void;
    handleSetPermission: (e: ChangeEvent<HTMLInputElement>, item: CheckedDeviceOptions) => void;
}