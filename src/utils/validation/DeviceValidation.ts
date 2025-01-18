import { IDevice, IDeviceModel } from './../../types/devices';
import { IValidationErrors } from './../../types/devices';

type ValidationField = keyof IDevice;
type ValidationModelField = keyof IDeviceModel

const fieldsMemoryScreen = ['laptop', 'mobile'];
const fieldScreen = ['tv', 'monitor'];
const modelFields = ['name', 'manufacturer'];

const validateRequiredFields = <T>(
  formData: T,
  fields: (keyof T)[],
  errors: Record<string, string>
): void => { fields.forEach((field) => {
    
  if (!formData[field]) {
      errors[field as string] = "Обязательно к заполнению";
    }
  });
};

export const FormValidation = (formData: IDevice, itemType: string):IValidationErrors => {
    const errors: Record<string, string> = {};
    const requiedField: ValidationField[] = ['name', 'type', 'manufacturer', 'warehouseId'];
    validateRequiredFields(formData, requiedField, errors);

    if (fieldsMemoryScreen.includes(itemType) || fieldScreen.includes(itemType)) {
        validateRequiredFields(formData, ['memorySize', 'screenSize'], errors);
    }

    if (formData.name && formData.name.length < 5) {
        errors.name = 'Не менее 5 символов';
    }
    return errors

}

export const ModelValidation = (formData: IDeviceModel): Partial<IValidationErrors> => {
    const errors: Partial<IValidationErrors> = {};
    const requiredFields: ValidationModelField[] = ['name', 'manufacturer'];
  
    validateRequiredFields(formData, requiredFields, errors);
  
    return errors;
  };

export const ValidateField = <T>(field: string, value: T): string | null => {
    const requiredMessage = 'Обязательно к заполнению';
    const minLengthMessage = 'Не менее 5 символов';
  
    if (field === 'name') {
      if (typeof value === 'string' && !value.trim()) return requiredMessage;
      if (typeof value === 'string' && value.length < 5) return minLengthMessage;
    }
  
    if (modelFields.includes(field)) {

      if (typeof value === 'number' && value === 0) return requiredMessage;
    }
    return null;
  };

  export const ModelValidationField = (field: ValidationModelField, value: string): string | null => {

    if (modelFields.includes(field)) {
      if (!value.trim()) return 'Обязательно к заполнению';
    }
    return null;
  };