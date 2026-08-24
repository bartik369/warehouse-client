import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Device, FilteredDevicesFromBack } from '@/entities/device/model/types';
import { Warehouse } from '@/entities/warehouse/model/types';
import { AssignedDevice } from '@/types/issue';

import { IssueState } from '../../features/issue-device/model/issueTypes';

const initialState: IssueState = {
  assignedDevices: [],
  selectedDevices: [],
  issueStep: 0,
  pdfBlob: null,
  issueNumber: '',
  errors: {},
  isUsersListVisible: false,
  isDevicesListVisible: false,
  devicesLoaded: false,
  wasSearched: false,
  warehouse: null,
  processId: '',
};

const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    setAssignedDevice: (
      state,
      action: PayloadAction<FilteredDevicesFromBack | FilteredDevicesFromBack[]>
    ) => {
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
    setSelectedDevice: (
      state,
      action: PayloadAction<FilteredDevicesFromBack | FilteredDevicesFromBack[]>
    ) => {
      if (Array.isArray(action.payload)) {
        state.selectedDevices = action.payload;
      } else {
        const device = action.payload;
        const existDevice = state.selectedDevices.some((item) => item.id === device.id);
        if (existDevice) {
          state.selectedDevices = state.selectedDevices.filter((item) => item.id !== device.id);
        } else {
          state.selectedDevices.push(action.payload);
        }
      }
    },
    // setDeviceId: (state, action: PayloadAction<string>) => {
    //   const existDeviceId = state.deviceIssueData.devices.includes(action.payload);
    //   if (!existDeviceId) {
    //     state.deviceIssueData.devices.push(action.payload);
    //   }
    // },
    deleteAssignedDevice: (state, action: PayloadAction<string>) => {
      state.assignedDevices = state.assignedDevices.filter((item) => item.id !== action.payload);
    },
    clearAssignedDevices: (state) => {
      state.assignedDevices = [];
    },
    clearSelectedDevices: (state) => {
      state.selectedDevices = [];
    },

    resetWarehouse: (state) => {
      state.warehouse = null;
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
    setIssueBackStep: (state) => {
      const currentStep = state.issueStep;
      state.issueStep = currentStep - 1;
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
    setIssueNumber: (state, action: PayloadAction<string>) => {
      state.issueNumber = action.payload;
    },
    setPdfFile: (state, action: PayloadAction<Blob>) => {
      state.pdfBlob = action.payload;
    },
    resetIssueData: (state) => {
      // state.deviceIssueData = initialState.deviceIssueData;
      state.assignedDevices = initialState.assignedDevices;
      state.issueStep = initialState.issueStep;
      state.warehouse = initialState.warehouse;
    },
    resetIssueState: () => initialState,
    setProcessId: (state, action: PayloadAction<string>) => {
      state.processId = action.payload;
    },
  },
});

export default issueSlice.reducer;
export const {
  setAssignedDevice,
  setSelectedDevice,
  deleteAssignedDevice,
  clearAssignedDevices,
  clearSelectedDevices,
  // setWarehouseIssue,
  // resetWarehouseIssue,
  setIssueStep,
  setIssueNextStep,
  setIssueBackStep,
  setWasSearched,
  setDevicesListVisible,
  setUserListVisible,
  setDevicesLoaded,
  setIssueNumber,
  // setUserQuery,
  // resetUserQuery,
  // setDeviceQuey,
  setProcessId,
  // setWarehouses,
  setWarehouse,
  resetWarehouse,
  setPdfFile,
  // setDeviceId,
  resetIssueData,
} = issueSlice.actions;
