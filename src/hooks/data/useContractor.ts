import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Contractor } from '@/types/content';
import { useCreateContractorMutation } from '@/store/api/contractorApi';
import {
  ContractorValidation,
  ValidateField,
} from '@/utils/validation/DeviceValidation';
import { useInputMask } from './useInputMask';
import { handleApiError } from '@/utils/errors/handleApiError';

export const useContactor = () => {
  const { formatPhone, changeFormatPhone } = useInputMask();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contractor, setContactor] = useState({
    name: '',
    phoneNumber: '',
    address: '',
  });
  const [createContractor] = useCreateContractorMutation();

  const handleInputChange = useCallback(
    <T extends Contractor | string>(field: keyof Contractor, value: T) => {
      const validationErrors = ValidateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: validationErrors as string,
      }));
      setContactor((prev) => {
        const updateContactor = {
            ...prev,
            [field]: field === 'phoneNumber' 
              ? formatPhone(value as string, prev.phoneNumber) 
              : value
        }
        return updateContactor
      })
    },
    []
  );

  const handleReset = useCallback(() => {
    setContactor({
      name: '',
      phoneNumber: '',
      address: '',
    });
  }, []);
  const handleCreateContractor = useCallback(async () => {
      try {
        const validationErrors = ContractorValidation(contractor);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
          const contractorData = {
            ...contractor,
            phoneNumber: changeFormatPhone(contractor.phoneNumber),
          }
          const data = await createContractor(contractorData).unwrap();
          if (data) {
            toast(data?.message, { type: 'success' });
            handleReset();
          }
        }
      } catch (err) {
        handleApiError(err);
      }
    },
    [handleReset, createContractor, contractor]
  );

  return {
    errors,
    contractor,
    setErrors,
    setContactor,
    handleInputChange,
    handleCreateContractor,
    handleReset,
  };
};
