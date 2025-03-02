import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { IContractor } from "../../types/devices";
import { isErrorWithMessage, isFetchBaseQueryError } from "../../utils/errors/error-handling";
import { ValidateField } from "../../utils/validation/DeviceValidation";

export const useContactor = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [contractor, setContactor] = useState({
        name: '',
        phoneNumber: '',
        address: '',
    });

    const handleInputChange = useCallback(<T extends IContractor | string>(field: keyof IContractor, value: T) => {
        const validationErrors = ValidateField(field, value);
        setErrors((prev) => ({
          ...prev,
          [field]: validationErrors as any,
        }));
        setContactor((prev) => ({
          ...prev,
          [field]: value as string,
        }));
      },[]
    );
    const handleCreateContractor = useCallback(async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            
        } catch (err) {
            if (isFetchBaseQueryError(err)) {
                const error = err as {data?: {message: string; error: string}}
                const errMsg = error?.data?.message;
                console.log("API Error", errMsg);
                toast(errMsg, { type: "error" });
            } else if(isErrorWithMessage(err)) {
                console.log("Unexpected Error:", err.message);
            } else {
                console.error("Unknown Error:", err);
            }
        }
    }, [])

    return {errors, contractor, setErrors, setContactor, handleInputChange, handleCreateContractor}
}