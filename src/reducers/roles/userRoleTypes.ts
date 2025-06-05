import { IUserRole } from "../../types/access";

export interface IUserRoleState {
    role: IUserRole;
    errors: Record<string, string>,
}

export enum UserRoleActionsTypes {
    SET_ROLE = 'SET_ROLE',
    RESET_ROLE = 'RESET_ROLE',
    SET_ERROR = 'SET_ERROR',
    RESET_ERROR = 'RESET_ERROR',
}

export type UserRoleAction = 
 | { type: UserRoleActionsTypes.SET_ERROR, payload: Record<string, string>}
 | { type: UserRoleActionsTypes.RESET_ERROR }
 | { type: UserRoleActionsTypes.SET_ROLE, payload: Partial<IUserRole> }
 | { type: UserRoleActionsTypes.RESET_ROLE }