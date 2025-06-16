import { Entity } from './../../types/devices';
export interface EntityState {
    entity: Entity;
    media: {
        file: File | null;
        prevImg: string | null;
    };
    errors: Record<string, string>
}

export enum EntityActionTypes {
    SET_ENTITY = 'SET_ENTITY',
    RESET_ENTITY = 'RESET_ENTITY',
    SET_ERROR = 'SET_ERROR',
    RESET_ERROR = 'RESET_ERROR',
    SET_FILE = 'SET_FILE',
    SET_PREVIEW = 'SET_PREVIEW',
    RESET_FILE = 'RESET_FILE',
    RESET_PREVIEW = 'RESET_PREVIEW'
}

export type EntityAction = 
| { type:EntityActionTypes.SET_ENTITY, payload: Partial<Entity> }
| { type:EntityActionTypes.RESET_ENTITY }
| { type:EntityActionTypes.SET_ERROR, payload: Record<string, string> }
| { type:EntityActionTypes.RESET_ERROR }
| { type:EntityActionTypes.SET_FILE, payload: File }
| { type:EntityActionTypes.RESET_FILE }
| { type:EntityActionTypes.SET_PREVIEW, payload: string }
| { type:EntityActionTypes.RESET_PREVIEW }