import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AssignedDevice } from '@/types/issue';
import { Warehouse } from '@/types/locations';

import { IssueState } from './issueTypes';

const initialState: IssueState = {
  assignedDevices: [],
  issueStep: 0,
  pdfBlob: null,
  issueId: null,
  errors: {},
  userQuery: '',
  deviceQuery: '',
  isUsersListVisible: false,
  isDevicesListVisible: false,
  devicesLoaded: false,
  wasSearched: false,
  warehouse: {
    id: '',
    name: '',
    slug: '',
  },
  warehouses: [],
  deviceIssueData: {
    processId: '',
    devices: [],
  },
};

const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    setAssignedDevice: (state, action: PayloadAction<AssignedDevice | AssignedDevice[]>) => {
      if (Array.isArray(action.payload)) {
        state.assignedDevices = action.payload;
      } else {
        const device = action.payload;
        const existDevice = state.assignedDevices.some((item) => item.id === device.id);
        if (existDevice) {
          state.assignedDevices = state.assignedDevices.filter((item) => item.id !== device.id);
        } else {
          state.assignedDevices.push(action.payload);
        }
      }
    },
    setDeviceId: (state, action: PayloadAction<string>) => {
      const existDeviceId = state.deviceIssueData.devices.includes(action.payload);
      if (!existDeviceId) {
        state.deviceIssueData.devices.push(action.payload);
      }
    },
    deleteAssignedDevice: (state, action: PayloadAction<string>) => {
      state.assignedDevices = state.assignedDevices.filter((item) => item.id !== action.payload);
    },
    setWarehouseIssue: (state, action: PayloadAction<Warehouse>) => {
      state.warehouse = action.payload;
    },
    setWarehouses: (state, action: PayloadAction<Warehouse[]>) => {
      state.warehouses = action.payload;
    },
    setWarehouse: (state, action: PayloadAction<Warehouse>) => {
      state.warehouse = action.payload;
    },
    setIssueStep: (state, action: PayloadAction<number>) => {
      state.issueStep = action.payload;
    },
    setIssueNextStep: (state) => {
      const currentStep = state.issueStep;
      state.issueStep = currentStep + 1;
    },
    setWasSearched: (state, action: PayloadAction<boolean>) => {
      state.wasSearched = action.payload;
    },
    setDevicesListVisible: (state, action: PayloadAction<boolean>) => {
      state.isDevicesListVisible = action.payload;
    },
    setUserListVisible: (state, action: PayloadAction<boolean>) => {
      state.isUsersListVisible = action.payload;
    },
    setDevicesLoaded: (state, action: PayloadAction<boolean>) => {
      state.devicesLoaded = action.payload;
    },
    setUserQuery: (state, action: PayloadAction<string>) => {
      state.userQuery = action.payload;
    },
    resetUserQuery: (state) => {
      state.userQuery = '';
    },
    setDeviceQuey: (state, action: PayloadAction<string>) => {
      state.deviceQuery = action.payload;
    },
    setProcessId: (state, action: PayloadAction<string>) => {
      state.deviceIssueData.processId = action.payload;
    },
    setPdfFile: (state, action: PayloadAction<Blob>) => {
      state.pdfBlob = action.payload;
    },
    resetIssueData: (state) => {
      state.deviceIssueData = initialState.deviceIssueData;
      state.assignedDevices = initialState.assignedDevices;
    },
  },
});

export default issueSlice.reducer;
export const {
  setAssignedDevice,
  deleteAssignedDevice,
  setWarehouseIssue,
  setIssueStep,
  setIssueNextStep,
  setWasSearched,
  setDevicesListVisible,
  setUserListVisible,
  setDevicesLoaded,
  setUserQuery,
  resetUserQuery,
  setDeviceQuey,
  setProcessId,
  setWarehouses,
  setWarehouse,
  setPdfFile,
  setDeviceId,
  resetIssueData,
} = issueSlice.actions;
