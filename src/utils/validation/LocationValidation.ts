import { ILocation } from './../../types/locations';
import { requiredFieldText } from "../constants/constants";
import { IValidateLocationErrors } from '../../types/locations';

const locationFields = ['name'];
type ValidationFields = keyof ILocation;

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

export const FormValidation = (formData: ILocation): IValidateLocationErrors => {
    const errors: Record<string, string> = {};
    const requiredFields:ValidationFields[] = ["name", "slug"];
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