import { useCallback } from 'react';

import { formatDate } from '@/shared/lib/date/formatDate';

import {
  resetAllSignatures,
  resetIssuerSignature,
  resetReceiverSignature,
  setIssuerSignature,
  setReceiverSignature,
} from '../../../../store/slices/signatureSlice';
import { useGlobalModal } from '../../../hooks/useGlobalModal';
import { useAppDispatch } from '../../../hooks/useRedux';
import { SignatureRole } from './types';

export const useSignature = () => {
  const dispatch = useAppDispatch();
  const { closeModal } = useGlobalModal();

  const handleSetSignature = useCallback(
    (signature: string, role: SignatureRole) => {
      const date = new Date();
      const time = formatDate(date, 'datetime');
      const data = {
        signature,
        time,
      };
      if (role === 'issuer') {
        dispatch(setIssuerSignature(data));
      } else if (role === 'receiver') {
        dispatch(setReceiverSignature(data));
      }
      closeModal();
    },
    [dispatch, closeModal]
  );

  const handleResetSignature = useCallback(
    (role: SignatureRole) => {
      if (role === 'issuer') {
        dispatch(resetIssuerSignature());
        return;
      }
      if (role === 'receiver') {
        dispatch(resetReceiverSignature());
        return;
      }
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
