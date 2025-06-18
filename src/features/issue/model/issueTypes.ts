import { Device, DeviceIssueData } from '../../../types/devices';
import { User } from './../../../types/user';

export type IssueStepType = "select_user" | "review_document" | "sign_document";
export interface IssueState {
    user: Partial<User> | null;
    users: User[];
    step: IssueStepType;
    issueId?: string | null;
    errors: Record<string, string>,
    userQuery: string,
    deviceQuery: string,
    isUsersListVisible: boolean;
    wasSearched: boolean;
    deviceIssueData: DeviceIssueData;
    assignedDevices: Device[];
}

export enum IssueActionTypes {
    SET_USER = 'SET_USER',
    SET_USERS = 'SET_USERS',
    SET_DEVICES = 'SET_DEVICES',
    RESET_DEVICES = 'RESET_DEVICES',
    SET_DEVICE_ID = 'SET_DEVICE_ID',
    SET_ISSUE_ID = 'SET_ISSUE_ID',
    NEXT_STEP = 'NEXT_STEP',
    PREV_STEP = 'PREV_STEP',
    RESET = 'RESET',
    SET_ERROR = 'SET_ERROR',
    RESET_ERROR = 'RESET_ERROR',
    SET_USER_QUERY = 'SET_USER_QUERY',
    RESET_USER_QUERY = 'RESET_USER_QUERY',
    SET_DEVICE_QUERY = 'SET_DEVICE_QUERY',
    RESET_DEVICE_QUERY = 'RESET_DEVICE_QUERY',
    SET_USERS_LIST_VISIBLE = 'SET_USERS_LIST_VISIBLE',
    SET_WAS_SEARCHED = 'SET_WAS_SEARCHED',
    SET_FULL_RESET = 'SET_FULL_RESET',
    SET_ASSIGNED_DEVICES = 'SET_ASSIGNED_DEVICES',
}
 
export type IssueAction = 
| { type: IssueActionTypes.SET_USER, payload: Partial<User> }
| { type: IssueActionTypes.SET_USERS, payload: User[] }
| { type: IssueActionTypes.SET_DEVICES, payload: User[] }
| { type: IssueActionTypes.RESET_DEVICES, payload: User[] }
| { type: IssueActionTypes.SET_DEVICE_ID, payload: string }
| { type: IssueActionTypes.SET_ASSIGNED_DEVICES, payload: Device[] }
| { type: IssueActionTypes.NEXT_STEP }
| { type: IssueActionTypes.PREV_STEP }
| { type: IssueActionTypes.SET_ISSUE_ID, payload: string }
| { type: IssueActionTypes.SET_ISSUE_ID, payload: string }
| { type: IssueActionTypes.SET_ERROR, payload: Record<string, string> }
| { type: IssueActionTypes.RESET_ERROR }
| { type: IssueActionTypes.RESET }
| { type: IssueActionTypes.SET_WAS_SEARCHED, payload: boolean }
| { type: IssueActionTypes.SET_USER_QUERY, payload: string }
| { type: IssueActionTypes.RESET_USER_QUERY}
| { type: IssueActionTypes.SET_DEVICE_QUERY, payload: string }
| { type: IssueActionTypes.RESET_DEVICE_QUERY}
| { type: IssueActionTypes.SET_USERS_LIST_VISIBLE, payload: boolean }
| { type: IssueActionTypes.SET_FULL_RESET }


