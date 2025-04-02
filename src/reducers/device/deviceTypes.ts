import { IDevice } from "../../types/devices";

export interface IDeviceState {
    device: IDevice;
    errors: Record<string, string>;
    typeId: string;
    manufacturerId: string;
    modelId: string;
    title: string;
    fieldType: string;
    itemType: string;
    isUpdate: boolean;
    checked: boolean;
}
export enum DeviceActionTypes{
    SET_ERROR = 'SET_ERROR',
    SET_DEVICE = 'SET_DEVICE',
    SET_TYPE_ID = 'SET_TYPE_ID',
    SET_IS_UPDATE = 'SET_IS_UPDATE',
    SET_MANUFACTURER_ID = 'SET_MANUFACTURER_ID',
    SET_MODEL_ID = 'SET_MODEL_ID',
    SET_TITLE = 'SET_TITLE',
    SET_FIELD_TYPE = 'SET_FIELD_TYPE',
    SET_ITEM_TYPE = 'SET_ITEM_TYPE',
    SET_CHECKED = 'SET_CHECKED',
}


export type DeviceAction = 
 | { type: DeviceActionTypes.SET_DEVICE, payload: Partial<IDevice> }
 | { type: DeviceActionTypes.SET_ERROR, payload: Record<string, string> }
 | { type: DeviceActionTypes.SET_TYPE_ID, payload: string }
 | { type: DeviceActionTypes.SET_IS_UPDATE, payload: boolean }
 | { type: DeviceActionTypes.SET_MANUFACTURER_ID, payload: string }
 | { type: DeviceActionTypes.SET_MODEL_ID, payload: string }
 | { type: DeviceActionTypes.SET_TITLE, payload: string }
 | { type: DeviceActionTypes.SET_FIELD_TYPE, payload: string }
 | { type: DeviceActionTypes.SET_ITEM_TYPE, payload: string }
 | { type: DeviceActionTypes.SET_CHECKED, payload: boolean }