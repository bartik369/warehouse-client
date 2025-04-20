import { IPermissionRole } from "../../types/access";
import { IValidateLocationErrors } from "../../types/locations";
import { requiredFieldText } from "../constants/constants";

type ValidationFields = keyof IPermissionRole;

const validateRequiredFields = <T>(
    data: T, 
    fields: (keyof T)[],
    errors: Record<string, string>,
): void => {
    fields.forEach((field) => {
        if (!data[field]) {
          errors[field as string] = requiredFieldText;
        }
    })
}

export const FormValidation = (data:IPermissionRole): IValidateLocationErrors => {
    const errors: Record<string, string> = {};
    const requiredField: ValidationFields[] = [
        'name',
        'roleName',
        'roleId',
        'locationName',
        'locationId',
        'comment',
    ]
     const requiredField2: ValidationFields[] = [
        'name',
        'roleName',
        'roleId',
        'permissionId',
        'permissionName',
        'locationId',
        'locationName',
        'comment',
    ]
    // console.log(data)
    if (data.roleName !== "manager") {
        validateRequiredFields(data, requiredField2, errors)
    } else {
        validateRequiredFields(data, requiredField, errors)
    }
    return errors

}