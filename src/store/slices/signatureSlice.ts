import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SignatureState = {
  issuerSignature: null | string;
  receiverSignature: null | string;
  pdfBlob: Blob | null;
};

const initialState: SignatureState = {
  issuerSignature: null,
  receiverSignature: null,
  pdfBlob: null,
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
    setPdfBlob: (state, action: PayloadAction<Blob>) => {
      state.pdfBlob = action.payload;
    },
    resetState: (state) => {
      state.issuerSignature = null;
      state.receiverSignature = null;
      state.pdfBlob = null;
    }
  },
});
export default signatureSlice.reducer;
export const {
  setIssuerSignature,
  setReceiverSignature,
  resetIssuerSignature,
  resetReceiverSignature,
  resetAllSignatures,
  setPdfBlob,
  resetState,
} = signatureSlice.actions;

import { RootState } from "../store";

export const selectIssuerSignature = (state: RootState) =>
  state.signature.issuerSignature;
export const selectReceiverSignature = (state: RootState) =>
  state.signature.receiverSignature;
export const pdfBlob = (state: RootState) => state.signature.pdfBlob;
