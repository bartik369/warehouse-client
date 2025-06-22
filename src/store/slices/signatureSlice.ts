import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SignatureState = {
  issuerSignature: null | string;
  receiverSignature: null | string;
};

const initialState: SignatureState = {
  issuerSignature: null,
  receiverSignature: null,
};

const signatureSlice = createSlice({
  name: "signature",
  initialState,
  reducers: {
    setIssuerSignature: (state, action: PayloadAction<string>) => {
      state.issuerSignature = action.payload;
    },
    setReceiverSignature: (state, action: PayloadAction<string>) => {
      state.receiverSignature = action.payload;
    },
    resetIssuerSignature: (state) => {
      state.issuerSignature = null;
    },
    resetReceiverSignature: (state) => {
      state.receiverSignature = null;
    },
    resetAllSignatures: (state) => {
      state.issuerSignature = null;
      state.receiverSignature = null;
    },
  },
});
export default signatureSlice.reducer;
export const {
  setIssuerSignature,
  setReceiverSignature,
  resetIssuerSignature,
  resetReceiverSignature,
  resetAllSignatures,
} = signatureSlice.actions;

import { RootState } from "../store";

export const selectIssuerSignature = (state: RootState) =>
  state.signature.issuerSignature;
export const selectReceiverSignature = (state: RootState) =>
  state.signature.receiverSignature;
