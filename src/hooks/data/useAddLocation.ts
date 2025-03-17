import { useCallback, useState } from "react";
import { ILocation } from "../../types/locations";
import { FormValidation, ValidateField } from "../../utils/validation/LocationValidation";
import { useCreateDepartmentMutation } from "../../store/api/departmentApi";
import { useCreateLocationMutation } from "../../store/api/locationApi";
import { useCreateWarehouseMutation } from "../../store/api/warehousesApi";
import { toast } from "react-toastify";
import { isErrorWithMessage, isFetchBaseQueryError } from "../../utils/errors/error-handling";

export const useAddLocation = () => {
    const [location, setLocation] = useState<ILocation>({
        id: "",
        name: "",
        slug: "",
        locationName: "",
        comment: "",
    });
    console.log(location)
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [createDepartment] = useCreateDepartmentMutation();
    const [createLocation] = useCreateLocationMutation();
    const [createWarehouse] = useCreateWarehouseMutation();
    const locationPoolsFunctions: Record<string, (item:any) => { unwrap:() => Promise<any> }> = {
        department: createDepartment,
        warehouse: createWarehouse,
        city: createLocation,
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

    const handleCreateLocation = useCallback(
        async(e: React.MouseEvent<HTMLButtonElement>, fieldType: string) => {
        e.preventDefault();
        try {
            const createLocationFunction = locationPoolsFunctions[fieldType];
            const validationErrors = FormValidation(location);
            setErrors(validationErrors as Record<string, string>);
            if (Object.keys(validationErrors).length === 0) {
                if (!location) return;
                const updateData = {
                    ...location,
                    name: location.name,
                    slug: location.slug,
                    comment: location.comment,
                    locationName: location.locationName,
                };
                await createLocationFunction(updateData).unwrap().then((data) => {
                    toast(data?.message, {type: "success"});
                });
                handleResetLocation();
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

    const handleResetLocation = useCallback(() => {
        setLocation({
            id: "",
            name: "",
            slug: "",
            locationName: "",
            comment: "",
        });
    }, []);

    const handleUpdateLocation = useCallback(() => {
        console.log("update");
        
    }, [])

    const handleCityChange = useCallback((item: any) => {
        handleInputChange("locationName", item.name || '');
  }, [handleInputChange]);

    return { location, errors, handleCityChange, setLocation, handleCreateLocation,
        handleInputChange, handleResetLocation, handleUpdateLocation
    }
}