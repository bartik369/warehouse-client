import { IEntity } from "../../types/devices";

export interface IAdminEntityState {
    entity: IEntity;
    media: {
        file: File | null;
        prevImg: string | null;
    };
    errors: Record<string, string>,
    isUpdate: boolean,
}

export enum AdminEntityActionTypes {
    SET_ENTITY = 'SET_ENTITY',
    RESET_ENTITY = 'RESET_ENTITY',
    SET_ERROR = 'SET_ERROR',
    RESET_ERROR = 'RESET_ERROR',
    SET_IS_UPDATE = 'SET_IS_UPDATE',
    SET_FILE = 'SET_FILE',
    SET_PREVIEW = 'SET_PREVIEW',
    RESET_FILE = 'RESET_FILE',
    RESET_PREVIEW = 'RESET_PREVIEW'
}

export type AdminEntityAction = 
| { type: AdminEntityActionTypes.SET_ENTITY, payload: Partial<IEntity> }
| { type: AdminEntityActionTypes.SET_ERROR, payload: { [key: string]: string }}
| { type: AdminEntityActionTypes.RESET_ERROR }
| { type: AdminEntityActionTypes.RESET_ENTITY }
| { type: AdminEntityActionTypes.SET_IS_UPDATE, payload: boolean }
| { type: AdminEntityActionTypes.SET_FILE, payload: File }
| { type: AdminEntityActionTypes.RESET_FILE }
| { type: AdminEntityActionTypes.SET_PREVIEW, payload: string }
| { type: AdminEntityActionTypes.RESET_PREVIEW }