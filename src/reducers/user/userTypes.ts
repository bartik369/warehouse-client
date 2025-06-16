import { User } from "../../types/user";

export interface UserState {
    user: User,
    users: User[],
    errors: Record<string, string>,
    checked: boolean;
    isAdmin: boolean;
}

export enum UserActionTypes {
    SET_ERROR = 'SET_ERROR',
    RESET_ERROR = 'RESET_ERROR',
    SET_USER = 'SET_USER',
    SET_USERS = 'SET_USERS',
    RESET_USER = 'RESET_USER',
    RESET_USERS = 'RESET_USERS',
    SET_IS_ADMIN = 'SET_IS_ADMIN',
    SET_CHECKED = 'SET_CHECKED',
}

export type UserAction = 
 | { type: UserActionTypes.SET_ERROR, payload: Record<string, string>}
 | { type: UserActionTypes.RESET_ERROR }
 | { type: UserActionTypes.SET_USER, payload: Partial<User> }
 | { type: UserActionTypes.SET_USERS, payload: User[] }
 | { type: UserActionTypes.RESET_USER }
 | { type: UserActionTypes.RESET_USERS }
 | { type: UserActionTypes.SET_CHECKED, payload: boolean }
 | { type: UserActionTypes.SET_IS_ADMIN, payload: boolean }