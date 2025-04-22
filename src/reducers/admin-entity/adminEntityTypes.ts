import { IEntity } from "../../types/devices";

export interface IAdminEntityState {
    entity: IEntity;
    errors: Record<string, string>,
    isUpdate: boolean,
}

export enum AdminEntityActionTypes {
    SET_ENTITY = 'SET_ENTITY',
    RESET_ENTITY = 'RESET_ENTITY',
    SET_ERROR = 'SET_ERROR',
    RESET_ERROR = 'RESET_ERROR',
    SET_IS_UPDATE = 'SET_IS_UPDATE',
}

export type AdminEntityAction = 
| { type: AdminEntityActionTypes.SET_ENTITY, payload: Partial<IEntity> }
| { type: AdminEntityActionTypes.SET_ERROR, payload: { [key: string]: string }}
| { type: AdminEntityActionTypes.RESET_ERROR }
| { type: AdminEntityActionTypes.RESET_ENTITY }
| { type: AdminEntityActionTypes.SET_IS_UPDATE, payload: boolean }