import { Device, DeviceIssueData } from '@/types/devices';
import { Warehouse } from '@/types/locations';

export type IssueStepType =
  | 'select_warehouse'
  | 'select_user'
  | 'select_devices'
  | 'sign_document'
  | 'send_document';
export type IssueStepTitle =
  | 'Выбор склада'
  | 'Выбор пользователя'
  | 'Выбор оборудования'
  | 'Подпись документа'
  | 'Отправка документа';

export interface IssueState {
  step: number;
  pdfBlob: Blob | null;
  title: IssueStepTitle;
  issueId?: string | null;
  errors: Record<string, string>;
  userQuery: string;
  deviceQuery: string;
  isUsersListVisible: boolean;
  isDevicesListVisible: boolean;
  devicesLoaded: boolean;
  wasSearched: boolean;
  warehouse: Warehouse;
  warehouses: Warehouse[];
  deviceIssueData: DeviceIssueData;
  assignedDevices: Device[];
}

export enum IssueActionTypes {
  SET_DEVICE_ID = 'SET_DEVICE_ID',
  SET_PROCESS_ID = 'SET_PROCESS_ID',
  SET_ISSUE_ID = 'SET_ISSUE_ID',
  SET_WAREHOUSE = 'SET_WAREHOUSE',
  RESET_DEVICE_ISSUE_DATA = 'RESET_DEVICE_ISSUE_DATA',
  DELETE_DEVICE = 'DELETE_DEVICE',
  SET_DEVICES_LOADED = 'SET_DEVICES_LOADED',
  RESET_WAREHOUSE = 'RESET_WAREHOUSE',
  SET_WAREHOUSES = 'SET_WAREHOUSES',
  RESET_WAREHOUSES = 'RESET_WAREHOUSES',
  SET_STEP = 'SET_STEP',
  RESET_STEP = 'RESET_STEP',
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
  SET_DEVICES_LIST_VISIBLE = 'SET_DEVICES_LIST_VISIBLE',
  SET_WAS_SEARCHED = 'SET_WAS_SEARCHED',
  SET_FULL_RESET = 'SET_FULL_RESET',
  SET_ASSIGNED_DEVICES = 'SET_ASSIGNED_DEVICES',
  SET_PDF_FILE = 'SET_PDF_FILE',
}

export type IssueAction =
  | { type: IssueActionTypes.SET_DEVICE_ID; payload: string }
  | { type: IssueActionTypes.SET_PROCESS_ID; payload: string }
  | { type: IssueActionTypes.SET_ASSIGNED_DEVICES; payload: Device[] }
  | { type: IssueActionTypes.SET_WAREHOUSE; payload: Warehouse }
  | { type: IssueActionTypes.RESET_WAREHOUSE }
  | { type: IssueActionTypes.SET_WAREHOUSES; payload: Warehouse[] }
  | { type: IssueActionTypes.RESET_WAREHOUSES }
  | { type: IssueActionTypes.NEXT_STEP }
  | { type: IssueActionTypes.PREV_STEP }
  | { type: IssueActionTypes.SET_STEP; payload: number }
  | { type: IssueActionTypes.RESET_STEP }
  | { type: IssueActionTypes.SET_ISSUE_ID; payload: string }
  | { type: IssueActionTypes.SET_ERROR; payload: Record<string, string> }
  | { type: IssueActionTypes.RESET_ERROR }
  | { type: IssueActionTypes.RESET }
  | { type: IssueActionTypes.SET_WAS_SEARCHED; payload: boolean }
  | { type: IssueActionTypes.SET_USER_QUERY; payload: string }
  | { type: IssueActionTypes.RESET_USER_QUERY }
  | { type: IssueActionTypes.SET_DEVICE_QUERY; payload: string }
  | { type: IssueActionTypes.RESET_DEVICE_QUERY }
  | { type: IssueActionTypes.SET_USERS_LIST_VISIBLE; payload: boolean }
  | { type: IssueActionTypes.SET_DEVICES_LIST_VISIBLE; payload: boolean }
  | { type: IssueActionTypes.SET_FULL_RESET }
  | { type: IssueActionTypes.RESET_DEVICE_ISSUE_DATA }
  | { type: IssueActionTypes.DELETE_DEVICE; payload: string }
  | { type: IssueActionTypes.SET_DEVICES_LOADED; payload: boolean }
  | { type: IssueActionTypes.SET_PDF_FILE; payload: Blob };
