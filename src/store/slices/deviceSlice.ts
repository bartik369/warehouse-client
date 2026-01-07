import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Device, DeviceMedia } from '@/types/devices';
import { AssignedDevice } from '@/types/issue';

type DeviceAction = {
  device: Device;
  devices: Device[];
  // selectedDevices: FilteredDevicesFromBack[];
  selectedDevices: AssignedDevice[];
  errors: Partial<Record<keyof Device, string>>;
  title: string;
  fieldType: string;
  itemType: string;
  isUpdate: boolean;
  checked: boolean;
  media: DeviceMedia;
  status?: boolean;
};
const initialState: DeviceAction = {
  device: {
    id: '',
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
    price_with_vat: 0,
    price_without_vat: 0,
    residual_price: 0,
    warrantyNumber: '',
    startWarrantyDate: null,
    endWarrantyDate: null,
    providerName: '',
    providerSlug: '',
    contractorId: '',
  },
  devices: [],
  selectedDevices: [],
  errors: {},
  title: '',
  fieldType: '',
  itemType: '',
  isUpdate: false,
  checked: true,
  media: {
    prevImg: '',
    file: null,
  },
  status: false,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<Record<string, string>>) => {
      state.errors = {
        ...state.errors,
        ...action.payload,
      };
    },
    resetError: (state) => {
      state.errors = {};
    },
    setIsUpdate: (state, action: PayloadAction<boolean>) => {
      state.isUpdate = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setFieldType: (state, action: PayloadAction<string>) => {
      state.fieldType = action.payload;
    },
    setItemType: (state, action: PayloadAction<string>) => {
      state.itemType = action.payload;
    },
    setDevice: (state, action: PayloadAction<{ device: Device }>) => {
      state.device = action.payload.device;
    },
    updateDevice: <K extends keyof Device>(
      state: DeviceAction,
      action: PayloadAction<{ field: K; value: Device[K] }>
    ) => {
      state.device[action.payload.field] = action.payload.value;
    },
    patchDevice: (state, action: PayloadAction<Partial<Device>>) => {
      state.device = { ...state.device, ...action.payload };
    },
    setSelectedDevices: (state, action: PayloadAction<AssignedDevice[]>) => {
      console.log('selected from list', action.payload);
      state.selectedDevices = action.payload;
    },
    resetDevice: (state) => {
      state.device = { ...initialState.device };
    },
    setDevices: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload;
      // const existingIds = new Set(state.devices.map(item => item.id));
      // const newDevices = action.payload.filter(item => !existingIds.has(item.id));
      // state.devices = [...state.devices, ...newDevices];
    },
    resetDevices: (state) => {
      state.devices = [];
    },
    setDevicePic: (state, action: PayloadAction<string>) => {
      if (state?.media) state.media.prevImg = action.payload;
    },
    resetDevicePic: (state) => {
      state.media.prevImg = '';
    },
    setDeviceFile: (state, action: PayloadAction<File | null>) => {
      if (state?.media)
        state.media.file = action.payload ? new File([action.payload], action.payload.name) : null;
    },
    resetDeviceFile: (state) => {
      state.media.file = null;
    },
    setChecked: (state, action: PayloadAction<boolean>) => {
      state.checked = action.payload;
    },
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
    resetStatus: (state) => {
      state.status = false;
    },
  },
});

export default deviceSlice.reducer;
export const {
  setError,
  resetError,
  setDevice,
  patchDevice,
  updateDevice,
  resetDevice,
  setDevices,
  resetDevices,
  setIsUpdate,
  setTitle,
  setFieldType,
  setItemType,
  setDevicePic,
  resetDevicePic,
  setDeviceFile,
  resetDeviceFile,
  setChecked,
  setStatus,
  resetStatus,
  setSelectedDevices,
} = deviceSlice.actions;
