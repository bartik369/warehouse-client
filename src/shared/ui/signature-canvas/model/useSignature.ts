import { useCallback } from 'react';

import { useGlobalModal } from '../../../../hooks/data/useGlobalModal';
import { useAppDispatch } from '../../../../hooks/redux/useRedux';
import {
  resetAllSignatures,
  resetIssuerSignature,
  setIssuerSignature,
  setReceiverSignature,
} from '../../../../store/slices/signatureSlice';

export const useSignature = () => {
  const dispatch = useAppDispatch();
  const { openModal, closeModal } = useGlobalModal();

  const handleSetSignature = useCallback(
    (signature: string, role: string) => {
      if (role === 'issuer') {
        dispatch(setIssuerSignature(signature));
        closeModal();
      } else if (role === 'receiver') {
        dispatch(setReceiverSignature(signature));
        closeModal();
      }
    },
    [dispatch, openModal]
  );

  const handleResetSignature = useCallback(
    (role: string) => {
      dispatch(resetIssuerSignature());
    },
    [dispatch]
  );

  const handleResetAllSignatures = useCallback(() => {
    dispatch(resetAllSignatures());
  }, [dispatch]);

  return {
    actions: {
      handleSetSignature,
      handleResetSignature,
      handleResetAllSignatures,
    },
  };
};
