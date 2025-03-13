import { useCallback, useState } from "react";
import { ILocation } from "../../types/locations";
import { FormValidation, ValidateField } from "../../utils/validation/LocationValidation";
import { useCreateDepartmentMutation } from "../../store/api/departmentApi";
import { useCreateLocationMutation } from "../../store/api/locationApi";
import { toast } from "react-toastify";
import { isErrorWithMessage, isFetchBaseQueryError } from "../../utils/errors/error-handling";

export const useAddLocation = () => {
    const [location, setLocation] = useState<ILocation>({
        id: "",
        name: "",
        comment: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [createDepartment] = useCreateDepartmentMutation();
    const [createLocation] = useCreateLocationMutation();
    const locationPoolsFunctions: Record<string, (item:any) => {unwrap:() => Promise<any>}> = {
        department: createDepartment,
        location: createLocation,
    }

    const handleInputChange = useCallback(<T extends string | ILocation>(field: keyof ILocation, value: T) => {
        const validationErrors = ValidateField(field, value);
        setErrors((prev) => ({
            ...prev,
            [field]: validationErrors as string,
        }));
        setLocation((prev) => ({
            ...prev,
            [field]: value as string,
        }))
    }, []);

    const handleCreateDepartment = useCallback(
        async(e: React.MouseEvent<HTMLButtonElement>, fieldTyle: string) => {
        e.preventDefault();
        try {
            const createLocationFunction = locationPoolsFunctions[fieldTyle];
            const validationErrors = FormValidation(location);
            setErrors(validationErrors as Record<string, string>);
            if (Object.keys(validationErrors).length === 0) {
                if (!location) return;
                const updateData = {
                    ...location,
                    name: location.name,
                    comment: location.comment,
                };
                await createLocationFunction(updateData).unwrap().then((data) => {
                    toast(data?.message, {type: "success"});
                })
            }
        } catch (err: unknown) {
            if (isFetchBaseQueryError(err)) {
                      const error = err as { data?: { message: string; error: string } };
                      const errMsg = error.data?.message;
                      console.log("API Error", errMsg);
                      toast(errMsg, { type: "error" });
                    } else if (isErrorWithMessage(err)) {
                      console.log("Unexpected Error:", err.message);
                    } else {
                      console.error("Unknown Error:", err);
                    }
        }
    }, [location, FormValidation]);
    return { location, errors, setLocation, handleCreateDepartment, handleInputChange }
}