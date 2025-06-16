import { DeviceInfo, DeviceMedia } from './../../types/devices';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DeviceAction =  {
    device: DeviceInfo | null;
    media: DeviceMedia;
    status?: boolean;
}
const initialState:DeviceAction = {
    device: {
        id: '',
        isAssigned: false,
        warehouse: {
            name: '',
            slug: ''
        },
    },
    media: {
        prevImg: '',
        file: null,
    },
    status: false,
}

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDeviceInfo: (
      state,
      action: PayloadAction<{ device: DeviceInfo; status?: boolean }>
    ) => {
      state.device = action.payload.device;
      state.status = action.payload.status;
    },
    resetDeviceInfo: (state) => {
      state.device = {
        id: "",
        isAssigned: false,
        warehouse: {
          name: "",
          slug: "",
        },
      };
      state.status = false;
    },
    setDevicePic: (state, action: PayloadAction<string>) => {
      if (state?.media) state.media.prevImg = action.payload;
    },
    setDeviceFile: (state, action: PayloadAction<File | null>) => {
      if (state?.media)
        state.media.file = action.payload
          ? new File([action.payload], action.payload.name)
          : null;
    },
  },
});

export default deviceSlice.reducer
export const {setDeviceInfo, setDevicePic, setDeviceFile, resetDeviceInfo } = deviceSlice.actions;
