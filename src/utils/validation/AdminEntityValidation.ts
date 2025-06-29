import { ValidateLocationErrors } from '@/types/locations';
import { Entity } from "@/types/devices";
import { isValidPhone } from "./Phones";
import { MESSAGES } from "../constants/ui/messages";

const locationFields = ['name'];
type ValidationFields = keyof Entity;

const validateRequiredFields = <T>(
    formData: T,
    fields:(keyof T)[],
    errors:Record<string, string>
): void => {
    fields.forEach((field) => {
        const value = formData[field ];
        if (field === 'phoneNumber') {
            if (!isValidPhone(value as string)) {
                errors[field as string] = MESSAGES.wrongPhoneFormat;
            }
        }
        if (!value) {
            errors[field as string] = MESSAGES.requiredFieldText;
        }
    });
}

export const FormValidation = (
    formData: Entity, 
    fieldType: string
): ValidateLocationErrors => {
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
    const requiredMessage = MESSAGES.requiredFieldText;
    if (locationFields.includes(field)) {
        if (typeof value === "string" && value.length === 0) {
            return requiredMessage
        }
    }
    return null
}