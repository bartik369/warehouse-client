import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

export type SignatureItemType = {
  signature: string | null;
  time: string | null;
};

type SignatureState = {
  issuer: SignatureItemType;
  receiver: SignatureItemType;
};

const emptySignature: SignatureItemType = {
  signature: null,
  time: null,
};

const initialState: SignatureState = {
  issuer: { ...emptySignature },
  receiver: { ...emptySignature },
};

const signatureSlice = createSlice({
  name: 'signature',
  initialState,
  reducers: {
    setIssuerSignature: (state, action: PayloadAction<SignatureItemType>) => {
      state.issuer = action.payload;
    },

    setReceiverSignature: (state, action: PayloadAction<SignatureItemType>) => {
      state.receiver = action.payload;
    },

    resetIssuerSignature: (state) => {
      state.issuer = { ...emptySignature };
    },

    resetReceiverSignature: (state) => {
      state.receiver = { ...emptySignature };
    },

    resetAllSignatures: (state) => {
      state.issuer = { ...emptySignature };
      state.receiver = { ...emptySignature };
    },

    resetState: () => initialState,
  },
});

export default signatureSlice.reducer;

export const {
  setIssuerSignature,
  setReceiverSignature,
  resetIssuerSignature,
  resetReceiverSignature,
  resetAllSignatures,
  resetState,
} = signatureSlice.actions;

export const selectIssuerSignature = (state: RootState) => state.signature.issuer;

export const selectReceiverSignature = (state: RootState) => state.signature.receiver;
