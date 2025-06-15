import { IDeviceIssueData } from '../../../types/devices';
import { IUser } from './../../../types/user';

export type DeviceIssueStepType = "select_user" | "review_document" | "sign_document";
export interface IDeviceIssueState {
    user: Partial<IUser> | null;
    users: IUser[];
    step: DeviceIssueStepType;
    issueId?: string | null;
    errors: Record<string, string>,
    query: string,
    isUsersListVisible: boolean;
    wasSearched: boolean;
    deviceIssueData: IDeviceIssueData;
}

export enum DeviceIssueActionTypes {
    SET_USER = 'SET_USER',
    SET_USERS = 'SET_USERS',
    SET_DEVICE_ID = 'SET_DEVICE_ID',
    SET_ISSUE_ID = 'SET_ISSUE_ID',
    NEXT_STEP = 'NEXT_STEP',
    PREV_STEP = 'PREV_STEP',
    RESET = 'RESET',
    SET_ERROR = 'SET_ERROR',
    RESET_ERROR = 'RESET_ERROR',
    SET_QUERY = 'SET_QUERY',
    SET_USERS_LIST_VISIBLE = 'SET_USERS_LIST_VISIBLE',
    SET_WAS_SEARCHED = 'SET_WAS_SEARCHED',
    SET_FULL_RESET = 'SET_FULL_RESET',
}
 
export type DeviceIssueAction = 
| { type: DeviceIssueActionTypes.SET_USER, payload: Partial<IUser> }
| { type: DeviceIssueActionTypes.SET_USERS, payload: IUser[] }
| { type: DeviceIssueActionTypes.SET_DEVICE_ID, payload: string }
| { type: DeviceIssueActionTypes.NEXT_STEP }
| { type: DeviceIssueActionTypes.PREV_STEP }
| { type: DeviceIssueActionTypes.SET_ISSUE_ID, payload: string }
| { type: DeviceIssueActionTypes.SET_ISSUE_ID, payload: string }
| { type: DeviceIssueActionTypes.SET_ERROR, payload: Record<string, string> }
| { type: DeviceIssueActionTypes.RESET_ERROR }
| { type: DeviceIssueActionTypes.RESET }
| { type: DeviceIssueActionTypes.SET_WAS_SEARCHED, payload: boolean }
| { type: DeviceIssueActionTypes.SET_QUERY, payload:string }
| { type: DeviceIssueActionTypes.SET_USERS_LIST_VISIBLE, payload: boolean }
| { type: DeviceIssueActionTypes.SET_FULL_RESET }


