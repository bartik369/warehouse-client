import { IDeviceState, DeviceAction, DeviceActionTypes } from './deviceTypes';

export const initialState: IDeviceState = {
  device: {
    name: '',
    inventoryNumber: '',
    modelId: '',
    modelName: '',
    modelSlug: '',
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
    warehouseSlug: '',
    description: '',
    typeName: '',
    typeSlug: '',
    typeId: '',
    manufacturerName: '',
    manufacturerSlug: '',
    manufacturerId: '',
    addedById: '',
    updatedById: '',
    price_with_vat: null,
    price_without_vat: null,
    residual_price: null,
    warrantyNumber: '',
    startWarrantyDate: null,
    endWarrantyDate: null,
    providerName: '',
    providerSlug: '',
    contractorId: '',
  },
  errors: {},
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
    case DeviceActionTypes.RESET_ERROR:
      return { ...state, errors: {} };
    case DeviceActionTypes.SET_IS_UPDATE:
      return { ...state, isUpdate: action.payload };
    case DeviceActionTypes.SET_TITLE:
      return { ...state, title: action.payload };
    case DeviceActionTypes.SET_FIELD_TYPE:
      return { ...state, fieldType: action.payload };
    case DeviceActionTypes.SET_CHECKED:
      return { ...state, checked: action.payload };
    case DeviceActionTypes.SET_DEVICE:
      return { ...state, device: { ...state.device, ...action.payload } };
    case DeviceActionTypes.RESET_DEVICE:
      return { ...state, device: initialState.device };
    default:
      return state;
  }
}
