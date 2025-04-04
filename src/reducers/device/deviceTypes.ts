import { IDevice } from "../../types/devices";

export interface IDeviceState {
    device: IDevice;
    modelFields: Pick<IDevice, 'type' | 'manufacturer'>;
    errors: Record<string, string>;
    typeId: string;
    manufacturerId: string;
    modelId: string;
    title: string;
    fieldType: string;
    itemType: string;
    isUpdate: boolean;
    checked: boolean;
    selectedValues: Record<string, string>
}
export enum DeviceActionTypes{
    SET_ERROR = 'SET_ERROR',
    RESET_ERROR = 'RESET_ERROR',
    SET_DEVICE = 'SET_DEVICE',
    RESET_DEVICE = 'RESET_DEVICE',
    SET_TYPE_ID = 'SET_TYPE_ID',
    SET_IS_UPDATE = 'SET_IS_UPDATE',
    SET_MANUFACTURER_ID = 'SET_MANUFACTURER_ID',
    SET_MODEL_ID = 'SET_MODEL_ID',
    SET_MODEL_FIELDS = 'SET_MODEL_FIELDS',
    SET_TITLE = 'SET_TITLE',
    SET_FIELD_TYPE = 'SET_FIELD_TYPE',
    SET_ITEM_TYPE = 'SET_ITEM_TYPE',
    SET_CHECKED = 'SET_CHECKED',
    SET_SELECTED_VALUES = 'SET_SELECTED_VALUES',
    RESET_SELECTED_VALUES = 'RESET_SELECTED_VALUES',
}


export type DeviceAction = 
 | { type: DeviceActionTypes.SET_ERROR, payload: Record<string, string> }
 | { type: DeviceActionTypes.RESET_ERROR }
 | { type: DeviceActionTypes.SET_DEVICE, payload: Partial<IDevice> }
 | { type: DeviceActionTypes.RESET_DEVICE }
 | { type: DeviceActionTypes.SET_TYPE_ID, payload: string }
 | { type: DeviceActionTypes.SET_IS_UPDATE, payload: boolean }
 | { type: DeviceActionTypes.SET_MANUFACTURER_ID, payload: string }
 | { type: DeviceActionTypes.SET_MODEL_ID, payload: string }
 | { type: DeviceActionTypes.SET_TITLE, payload: string }
 | { type: DeviceActionTypes.SET_FIELD_TYPE, payload: string }
 | { type: DeviceActionTypes.SET_ITEM_TYPE, payload: string }
 | { type: DeviceActionTypes.SET_CHECKED, payload: boolean }
 | { type: DeviceActionTypes.SET_SELECTED_VALUES, payload: Record<string, string>}
 | { type: DeviceActionTypes.RESET_SELECTED_VALUES }
 | { type: DeviceActionTypes.SET_MODEL_FIELDS, payload: Pick<IDevice, 'type' | 'manufacturer'> }