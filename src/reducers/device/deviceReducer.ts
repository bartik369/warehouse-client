import { IDeviceState, DeviceAction, DeviceActionTypes } from './deviceTypes';

export const initialState: IDeviceState = {
    device: {
        name: '',
        inventoryNumber: '',
        modelId: '',
        modelName: '',
        modelCode: '',
        serialNumber: '',
        weight: 0,
        screenSize: 0,
        memorySize: 0,
        inStock: true,
        isFunctional: true,
        isAssigned: false,
        warehouseId: '',
        warehouseName: '',
        description: '',
        type: '',
        typeId: '',
        manufacturer: '',
        addedById: '',
        updatedById: '',
        price_with_vat: null,
        price_without_vat: null,
        residual_price: null,
        warrantyNumber: '',
        startWarrantyDate: null,
        endWarrantyDate: null,
        provider: '',
        contractorId: '',
      },
  errors: {},
  typeId: '',
  manufacturerId: '',
  modelId: '',
  title: '',
  fieldType: '',
  itemType: '',
  isUpdate: false,
  checked: true,
};

export function deviceReducer(
  state: IDeviceState,
  action: DeviceAction
): IDeviceState {
  switch (action.type) {
    case DeviceActionTypes.SET_ERROR:
      return { ...state, errors: action.payload };
    case DeviceActionTypes.SET_TYPE_ID:
      return { ...state, typeId: action.payload };
    case DeviceActionTypes.SET_IS_UPDATE:
      return { ...state, isUpdate: action.payload };
    case DeviceActionTypes.SET_MANUFACTURER_ID:
      return { ...state, manufacturerId: action.payload };
    case DeviceActionTypes.SET_MODEL_ID:
      return { ...state, modelId: action.payload };
    case DeviceActionTypes.SET_TITLE:
      return { ...state, title: action.payload };
    case DeviceActionTypes.SET_FIELD_TYPE:
      return { ...state, fieldType: action.payload };
    case DeviceActionTypes.SET_CHECKED:
      return { ...state, checked: action.payload };
    case DeviceActionTypes.SET_ITEM_TYPE:
      return { ...state, itemType: action.payload };
    default:
      return state;
  }
}
