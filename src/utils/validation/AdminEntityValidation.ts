import { IAdminEntity } from "../../types/content";
import { requiredFieldText } from "../constants/constants";
import { IValidateLocationErrors } from '../../types/locations';

const locationFields = ['name'];
type ValidationFields = keyof IAdminEntity;

const validateRequiredFields = <T>(
    formData: T,
    fields:(keyof T)[],
    errors:Record<string, string>
): void => {
    fields.forEach((field) => {
        if (!formData[field]) {
            errors[field as string] = requiredFieldText;
        }
    });
}

export const FormValidation = (formData: IAdminEntity, fieldType: string): IValidateLocationErrors => {
    const errors: Record<string, string> = {};
    const fieldMap: Record<string, ValidationFields[]> = {
        location: ['name', 'slug'],
        manufacturer: ['name', 'slug'],
        department: ['name', 'slug'],
        contractor: ['name', 'slug', 'phoneNumber'],
        warehouse: ['name', 'slug', 'locationName']
    }
    const requiredFields:ValidationFields[] = fieldMap[fieldType];
    validateRequiredFields(formData, requiredFields, errors);
    return errors;
}

export const ValidateField = <T>(field: string, value: T):string | null => {
    const requiredMessage = requiredFieldText;
    if (locationFields.includes(field)) {
        if (typeof value === "string" && value.length === 0) {
            return requiredMessage
        }
    }
    return null
}






// import { useCallback, useState } from "react";
// import { toast } from "react-toastify";
// import { IAdminEntity } from "../../types/content";
// import { useLazyGetManufacturerQuery } from "../../store/api/devicesApi";
// import { FormValidation, ValidateField } from "../../utils/validation/AdminEntityValidation";
// import { useCreateDepartmentMutation, useLazyGetDepartmentQuery } from "../../store/api/departmentApi";
// import { useCreateLocationMutation, useLazyGetLocationQuery } from "../../store/api/locationApi";
// import { useCreateWarehouseMutation, useLazyGetWarehouseQuery } from "../../store/api/warehousesApi";
// import { useCreateManufacturerMutation } from "../../store/api/devicesApi";
// import { useCreateContractorMutation, useLazyGetContractorQuery, useUpdateContractorMutation } from "../../store/api/contractorApi";
// import { isErrorWithMessage, isFetchBaseQueryError } from "../../utils/errors/error-handling";
// import { useInputMask } from "./useInputMask";

// export const useAddAdminEntities = () => {
//     const [entity, setEntity] = useState<IAdminEntity>({
//         id: "",
//         name: "",
//         slug: "",
//         locationName: "",
//         comment: "",
//         phoneNumber: "",
//         address: "",
//     });

//     const [isUpdate, setIsUpdate] = useState(false);
//     const [errors, setErrors] = useState<Record<string, string>>({});
//     const { formatPhone, changeFormatPhone } = useInputMask();

//     const [getWarehouse] = useLazyGetWarehouseQuery();
//     const [getLocation] = useLazyGetLocationQuery();
//     const [getDepartment] = useLazyGetDepartmentQuery();
//     const [getContractor] = useLazyGetContractorQuery();
//     const [getManufacturer] = useLazyGetManufacturerQuery();
//     const [createDepartment] = useCreateDepartmentMutation();
//     const [createLocation] = useCreateLocationMutation();
//     const [createWarehouse] = useCreateWarehouseMutation();
//     const [createManufacturer] = useCreateManufacturerMutation();
//     const [createContractor] = useCreateContractorMutation();
//     const [updateContractor] = useUpdateContractorMutation();


//     const entityCreateFunctions: Record<string, (item:any) => { unwrap:() => Promise<any> }> = {
//         department: createDepartment,
//         warehouse: createWarehouse,
//         location: createLocation,
//         manufacturer: createManufacturer,
//         contractor: createContractor,
//     };
//     const entityUpdateFunctions: Record<string, (item:any) => { unwrap:() => Promise<any>} > = {
//         contractor: updateContractor,
//     }
//     const entityById: Record<string, (item: any) => { unwrap:() => Promise<any>}> = {
//         department: getDepartment,
//         warehouse: getWarehouse,
//         location: getLocation,
//         manufacturer: getManufacturer,
//         contractor: getContractor,
//     };

//     const handleInputChange = useCallback(<T extends string | IAdminEntity>(field: keyof IAdminEntity, value: T) => {
//         setErrors((prev) => ({
//             ...prev,
//             [field]: ValidateField(field, value) || "",
//         }));
//         setEntity((prev) => {
//             const updateEntity = {
//                 ...prev,
//                 [field]: field === "phoneNumber" 
//                   ? formatPhone(value as string, prev.phoneNumber || "") 
//                   : value
//             }
//             return updateEntity;
//           })
//     }, []);

//     const handleCreateEntity = useCallback(
//         async(e: React.MouseEvent<HTMLButtonElement>, fieldType: string) => {
//         e.preventDefault();
//         try {
//             const createEntityFunction = isUpdate 
//             ? entityUpdateFunctions[fieldType] 
//             : entityCreateFunctions[fieldType];
          
//             const validationErrors = FormValidation(entity, fieldType);
//             setErrors(validationErrors as Record<string, string>);
//             console.log(validationErrors);
            

//             if (Object.keys(validationErrors).length === 0) {
//                 if (!entity) return;
//                 const updateData = {
//                     ...entity,
//                     phoneNumber: changeFormatPhone(entity.phoneNumber || "")
//                 };
//                 await createEntityFunction(updateData).unwrap().then((data) => {
//                     toast(data?.message, {type: "success"});
//                 });
//                 handleResetEntity();
//             }
//         } catch (err: unknown) {

//             if (isFetchBaseQueryError(err)) {
//                       const error = err as { data?: { message: string; error: string } };
//                       const errMsg = error.data?.message;
//                       console.log("API Error", errMsg);
//                       toast(errMsg, { type: "error" });
//                     } else if (isErrorWithMessage(err)) {
//                       console.log("Unexpected Error:", err.message);
//                     } else {
//                       console.error("Unknown Error:", err);
//                     }
//         }
//     }, [entity, FormValidation, isUpdate, entityCreateFunctions]);

//     const handleResetEntity = useCallback(() => {
//         setEntity({
//             id: "",
//             name: "",
//             slug: "",
//             locationName: "",
//             comment: "",
//             phoneNumber: "",
//             address: "",
//         });
//         setIsUpdate(false);
//     }, []);

//     const handleGetEntity = useCallback(async(id: string, field: string) => {
//         try {
//             const getEntityByIdFunction = entityById[field];
//             await getEntityByIdFunction(id).unwrap().then((data) => {
//                 setEntity((prev) => ({
//                     ...prev,
//                     ...data
//                 }));  
//             });
//             setIsUpdate(true);
            
//         } catch (err:unknown) {
//             if (isFetchBaseQueryError(err)) {
//                 const error = err as { data?: { message: string; error: string } };
//                 const errMsg = error.data?.message;
//                 console.log("API Error", errMsg);
//                 toast(errMsg, { type: "error" });
//               } else if (isErrorWithMessage(err)) {
//                 console.log("Unexpected Error:", err.message);
//               } else {
//                 console.error("Unknown Error:", err);
//               }
//         }
//     }, []);

//     const handleCityChange = useCallback((item: any) => {
//         handleInputChange("locationName", item.name || '');
//   }, [handleInputChange]);

//     return { entity, errors, isUpdate, handleCityChange, setEntity, handleCreateEntity,
//         handleInputChange,  handleResetEntity, handleGetEntity
//     }
// }

