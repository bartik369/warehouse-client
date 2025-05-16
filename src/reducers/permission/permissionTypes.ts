import { IPermissionRole } from "../../types/access";
import { Checked } from "../../types/content";

export interface IPermissionState {
    entity: IPermissionRole;
    errors: Record<string, string>;
    isUpdate: boolean;
    permissionsRequest: boolean;
    list: Checked;
}
export enum PermissionActionTypes {
    SET_ERROR = 'SET_ERROR',
    RESET_ERROR = 'RESET_ERROR',
    SET_ENTITY = 'SET_ENTITY',
    RESET_ENTITY = 'RESET_ENTITY',
    SET_IS_UPDATE = 'SET_IS_UPDATE',
    RESET_IS_UPDATE = 'RESET_IS_UPDATE',
    SET_LIST = 'SET_LIST',
    SET_LIST_BY_ROLE = 'SET_LIST_BY_ROLE',
    RESET_LIST = 'RESET_LIST',
    RESET_WAREHOUSE = 'RESET_WAREHOUSE',
    SET_PERMISSION = 'SET_PERMISSION',
    SET_PERMISSIONS_REQUEST = 'SET_PERMISSIONS_REQUEST',
}

export type PermissionAction = 
| { type: PermissionActionTypes.SET_ERROR, payload: Record<string, string>}
| { type: PermissionActionTypes.RESET_ERROR }
 | { type: PermissionActionTypes.SET_ENTITY, payload: Partial<IPermissionRole> }
 | { type: PermissionActionTypes.RESET_ENTITY }
 | { type: PermissionActionTypes.SET_IS_UPDATE, payload: boolean }
 | { type: PermissionActionTypes.RESET_IS_UPDATE }
 | { type: PermissionActionTypes.SET_LIST, payload: { id: string; checked: boolean }}
 | { type: PermissionActionTypes.RESET_LIST }
 | { type: PermissionActionTypes.RESET_WAREHOUSE }
 | { type: PermissionActionTypes.SET_PERMISSION, payload: { id: string, name: string, checked: boolean }}
 | { type: PermissionActionTypes.SET_PERMISSIONS_REQUEST, payload: boolean }
 | { type: PermissionActionTypes.SET_LIST_BY_ROLE, payload: Partial<IPermissionRole> }