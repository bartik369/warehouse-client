import { requiredFieldText, wrongPhoneFormat } from "../constants/constants";
import { IValidateLocationErrors } from '../../types/locations';
import { IEntity } from "../../types/devices";
import { isValidPhone } from "./Phones";

const locationFields = ['name'];
type ValidationFields = keyof IEntity;

const validateRequiredFields = <T>(
    formData: T,
    fields:(keyof T)[],
    errors:Record<string, string>
): void => {
    fields.forEach((field) => {
        const value = formData[field];
        if (field === 'phoneNumber') {
            if (!isValidPhone(value as string)) {
                errors['phoneNumber'] = wrongPhoneFormat;
            }
        }
        if (!value) {
            errors[field as string] = requiredFieldText;
        }
    });
}

export const FormValidation = (
    formData: IEntity, 
    fieldType: string
): IValidateLocationErrors => {
    const errors: Record<string, string> = {};
    const fieldMap: Record<string, ValidationFields[]> = {
        role: ['name', 'comment'],
        permission: ['name', 'comment'],
        location: ['name', 'slug'],
        manufacturer: ['name', 'slug'],
        department: ['name', 'slug'],
        contractor: ['name', 'slug', 'phoneNumber'],
        warehouse: ['name', 'slug', 'locationName'],
        model: ['name', 'slug', 'manufacturer', 'type'],
        type: ['name', 'slug']
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