import { IDeviceInfo } from './../../types/devices';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IDeviceAction =  {
    device: IDeviceInfo | null;
    status?: boolean;
}
const initialState:IDeviceAction = {
    device: {
        id: '',
        isAssigned: false,
        warehouse: {
            name: '',
            slug: ''
        },
        prevImg: '',
    },
    status: false,
}

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setDeviceInfo:(state, action:PayloadAction<{device: IDeviceInfo, status?: boolean}>) => {
            state.device = action.payload.device;
            state.status = action.payload.status; 
        },
        setDevicePic:(state, action: PayloadAction<string>) => {
            if (state.device) state.device.prevImg = action.payload;
        },
    }
});

export default deviceSlice.reducer
export const {setDeviceInfo, setDevicePic} = deviceSlice.actions;
