import { IUserRole, IUserRolesResponse } from "../../types/access";

export interface IUserRoleState {
    role: IUserRole;
    errors: Record<string, string>,
    query: string,
    isUsersListVisible: boolean;
    wasSearched: boolean;
    assignedUserRoles: IUserRolesResponse;
}

export enum UserRoleActionsTypes {
    SET_ROLE = 'SET_ROLE',
    RESET_ROLE = 'RESET_ROLE',
    SET_ERROR = 'SET_ERROR',
    RESET_ERROR = 'RESET_ERROR',
    SET_QUERY = 'SET_QUERY',
    SET_USERS_LIST_VISIBLE = 'SET_USERS_LIST_VISIBLE',
    SET_WAS_SEARCHED = 'SET_WAS_SEARCHED',
    SET_USER_ASSIGNED_ROLES = 'SET_USER_ASSIGNED_ROLES',
    RESET_USER_ASSIGNED_ROLES = 'RESET_USER_ASSIGNED_ROLES'
}

export type UserRoleAction = 
 | { type: UserRoleActionsTypes.SET_ERROR, payload: Record<string, string>}
 | { type: UserRoleActionsTypes.RESET_ERROR }
 | { type: UserRoleActionsTypes.SET_ROLE, payload: Partial<IUserRole> }
 | { type: UserRoleActionsTypes.RESET_ROLE }
 | { type: UserRoleActionsTypes.SET_QUERY, payload:string }
 | { type: UserRoleActionsTypes.SET_USERS_LIST_VISIBLE, payload: boolean }
 | { type: UserRoleActionsTypes.SET_WAS_SEARCHED, payload: boolean }
 | { type: UserRoleActionsTypes.SET_USER_ASSIGNED_ROLES, payload: IUserRolesResponse }
 | { type: UserRoleActionsTypes.RESET_USER_ASSIGNED_ROLES }