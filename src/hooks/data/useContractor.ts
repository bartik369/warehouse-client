import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { IContractor } from "../../types/devices";
import { useCreateContractorMutation } from "../../store/api/contractorApi";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "../../utils/errors/error-handling";
import {
  ContractorValidation,
  ValidateField,
} from "../../utils/validation/DeviceValidation";
import { useInputMask } from "./useInputMask";

export const useContactor = () => {
  const { formatPhone, changeFormatPhone } = useInputMask();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contractor, setContactor] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });
  const [createContractor] = useCreateContractorMutation();

  const handleInputChange = useCallback(
    <T extends IContractor | string>(field: keyof IContractor, value: T) => {
      console.log(field);

      const validationErrors = ValidateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: validationErrors as string,
      }));
      setContactor((prev) => {
        const updateContactor = {
            ...prev,
            [field]: field === "phoneNumber" 
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
      name: "",
      phoneNumber: "",
      address: "",
    });
  }, []);
  const handleCreateContractor = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        const validationErrors = ContractorValidation(contractor);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
          const contractorData = {
            name: contractor.name,
            phoneNumber: changeFormatPhone(contractor.phoneNumber),
            address: contractor.address
          }
          await createContractor(contractorData)
            .unwrap()
            .then((data) => {
              toast(data?.message, { type: "success" });
              handleReset();
            });
        }
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          const error = err as { data?: { message: string; error: string } };
          const errMsg = error?.data?.message;
          console.log("API Error", errMsg);
          toast(errMsg, { type: "error" });
        } else if (isErrorWithMessage(err)) {
          console.log("Unexpected Error:", err.message);
        } else {
          console.error("Unknown Error:", err);
        }
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
