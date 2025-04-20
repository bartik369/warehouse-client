import { IPermissionRole } from "../../types/access";
import { Checked } from "../../types/content";

export interface IPermissionState {
    entity: IPermissionRole;
    errors: Partial<Record<keyof IPermissionRole, string>>;
    isUpdate: boolean;
    list: Checked;
}
export enum PermissionActionTypes {
    SET_ERROR = 'SET_ERROR',
    RESET_ERROR = 'RESET_ERROR',
    SET_ENTITY = 'SET_ENTITY',
    RESET_ENTITY = 'RESET_ENTITY',
    SET_IS_UPDATE = 'SET_IS_UPDATE',
    SET_LIST = 'SET_LIST',
    RESET_LIST = 'RESET_LIST',
    SET_PERMISSION = 'SET_PERMISSION',
}

export type PermissionAction = 
 | { type: PermissionActionTypes.SET_ERROR, payload: { [key: string]: string }}
 | { type: PermissionActionTypes.RESET_ERROR }
 | { type: PermissionActionTypes.SET_ENTITY, payload: Partial<IPermissionRole> }
 | { type: PermissionActionTypes.RESET_ENTITY }
 | { type: PermissionActionTypes.SET_IS_UPDATE, payload: boolean }
 | { type: PermissionActionTypes.SET_LIST, payload: { id: string; checked: boolean }}
 | { type: PermissionActionTypes.RESET_LIST }
 | { type: PermissionActionTypes.SET_PERMISSION, payload: { id: string, name: string, checked: boolean }}