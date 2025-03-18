import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { IAdminEntity } from "../../types/content";
import { useLazyGetManufacturerQuery } from "../../store/api/devicesApi";
import { FormValidation, ValidateField } from "../../utils/validation/AdminEntityValidation";
import { useCreateDepartmentMutation, useLazyGetDepartmentQuery } from "../../store/api/departmentApi";
import { useCreateLocationMutation, useLazyGetLocationQuery } from "../../store/api/locationApi";
import { useCreateWarehouseMutation, useLazyGetWarehouseQuery } from "../../store/api/warehousesApi";
import { useCreateManufacturerMutation } from "../../store/api/devicesApi";
import { useCreateContractorMutation, useLazyGetContractorQuery } from "../../store/api/contractorApi";
import { isErrorWithMessage, isFetchBaseQueryError } from "../../utils/errors/error-handling";
import { useInputMask } from "./useInputMask";

export const useAddAdminEntities = () => {
    const [entity, setEntity] = useState<IAdminEntity>({
        id: "",
        name: "",
        slug: "",
        locationName: "",
        comment: "",
        phoneNumber: "",
        address: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const { formatPhone, changeFormatPhone } = useInputMask();

    const [getWarehouse] = useLazyGetWarehouseQuery();
    const [getLocation] = useLazyGetLocationQuery();
    const [getDepartment] = useLazyGetDepartmentQuery();
    const [getContractor] = useLazyGetContractorQuery();
    const [getManufacturer] = useLazyGetManufacturerQuery();

    const [createDepartment] = useCreateDepartmentMutation();
    const [createLocation] = useCreateLocationMutation();
    const [createWarehouse] = useCreateWarehouseMutation();
    const [createManufacturer] = useCreateManufacturerMutation();
    const [createContractor] = useCreateContractorMutation();


    const entityPoolsFunctions: Record<string, (item:any) => { unwrap:() => Promise<any> }> = {
        department: createDepartment,
        warehouse: createWarehouse,
        city: createLocation,
        manufacturer: createManufacturer,
        contractor: createContractor,
    };
    const entityById: Record<string, (item: any) => { unwrap:() => Promise<any>}> = {
        department: getDepartment,
        warehouse: getWarehouse,
        city: getLocation,
        manufacturer: getManufacturer,
        contractor: getContractor,
    };

    const handleInputChange = useCallback(<T extends string | IAdminEntity>(field: keyof IAdminEntity, value: T) => {
        setErrors((prev) => ({
            ...prev,
            [field]: ValidateField(field, value) || "",
        }));
        setEntity((prev) => {
            const updateEntity = {
                ...prev,
                [field]: field === "phoneNumber" 
                  ? formatPhone(value as string, prev.phoneNumber || "") 
                  : value
            }
            return updateEntity;
          })
    }, []);

    const handleCreateEntity = useCallback(
        async(e: React.MouseEvent<HTMLButtonElement>, fieldType: string) => {
        e.preventDefault();
        try {
            const createEntityFunction = entityPoolsFunctions[fieldType];
            const validationErrors = FormValidation(entity);
            setErrors(validationErrors as Record<string, string>);

            if (Object.keys(validationErrors).length === 0) {
                if (!entity) return;
                const updateData = {
                    ...entity,
                    phoneNumber: changeFormatPhone(entity.phoneNumber || "")
                };
                await createEntityFunction(updateData).unwrap().then((data) => {
                    toast(data?.message, {type: "success"});
                });
                handleResetEntity();
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
    }, [entity, FormValidation]);

    const handleResetEntity = useCallback(() => {
        setEntity({
            id: "",
            name: "",
            slug: "",
            locationName: "",
            comment: "",
        });
    }, []);

    const handleUpdateEntity = useCallback(async(id: string, field: string) => {
        try {
            const createEntityByIdFunction = entityById[field];
            await createEntityByIdFunction(id).unwrap().then((data) => {
                console.log(data);
                
            })
            
        } catch (err:unknown) {
            
        }
    }, [])

    const handleCityChange = useCallback((item: any) => {
        handleInputChange("locationName", item.name || '');
  }, [handleInputChange]);

    return { entity, errors, handleCityChange, setEntity, handleCreateEntity,
        handleInputChange,  handleResetEntity, handleUpdateEntity
    }
}

