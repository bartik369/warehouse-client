import { IDevice } from "../../types/devices";

export interface IDeviceState {
    device: IDevice;
    errors: Partial<Record<keyof IDevice, string>>;
    title: string;
    fieldType: string;
    itemType: string;
    isUpdate: boolean;
    checked: boolean;
}
export enum DeviceActionTypes {
    SET_ERROR = 'SET_ERROR',
    RESET_ERROR = 'RESET_ERROR',
    SET_DEVICE = 'SET_DEVICE',
    RESET_DEVICE = 'RESET_DEVICE',
    SET_IS_UPDATE = 'SET_IS_UPDATE',
    SET_TITLE = 'SET_TITLE',
    SET_FIELD_TYPE = 'SET_FIELD_TYPE',
    SET_ITEM_TYPE = 'SET_ITEM_TYPE',
    SET_CHECKED = 'SET_CHECKED',
}


export type DeviceAction = 
 | { type: DeviceActionTypes.SET_ERROR, payload: Record<string, string>}
 | { type: DeviceActionTypes.RESET_ERROR }
 | { type: DeviceActionTypes.SET_DEVICE, payload: Partial<IDevice> }
 | { type: DeviceActionTypes.RESET_DEVICE }
 | { type: DeviceActionTypes.SET_IS_UPDATE, payload: boolean }
 | { type: DeviceActionTypes.SET_TITLE, payload: string }
 | { type: DeviceActionTypes.SET_FIELD_TYPE, payload: string }
 | { type: DeviceActionTypes.SET_ITEM_TYPE, payload: string }
 | { type: DeviceActionTypes.SET_CHECKED, payload: boolean }
