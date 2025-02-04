import { IDevice, IDeviceModel, ISelectedItem, IEntity } from './../../types/devices';
import { IValidationErrors } from './../../types/devices';

type ValidationField = keyof IDevice;
type ValidationModelField = keyof IDeviceModel;
type ValidationEntityField = keyof IEntity
type ValidationError = string | null;

const fieldsMemoryScreen = ['laptop', 'mobile'];
const fieldScreen = ['tv', 'monitor'];
const modelFields = ['name', 'manufacturer', 'type'];

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

    if (fieldsMemoryScreen.includes(itemType)) {
        validateRequiredFields(formData, ['memorySize', 'screenSize'], errors);
    }
    if (fieldScreen.includes(itemType)) {
      validateRequiredFields(formData, ['screenSize'], errors);
    }

    if (formData.name && formData.name.length < 5) {
        errors.name = 'Не менее 5 символов';
    }
    return errors

}

export const ModelValidation = (formData: IDeviceModel): Partial<IValidationErrors> => {
    const errors: Partial<IValidationErrors> = {};
    const requiredFields: ValidationModelField[] = ['name', 'manufacturer', 'type'];
    validateRequiredFields(formData, requiredFields, errors);
    return errors;
};

  export const ModelValidationField = 
  <T extends string | IEntity>(field: string, value: T):ValidationError => {
     const isEmpty = (val: string) => val.length === 0;

     if (typeof value === 'object' && isEmpty(value.slug)) {
        return 'Обязательно к заполнению';
     }
     if (typeof value === 'string' && modelFields.includes(field) && isEmpty(value)) {
      return 'Обязательно к заполнению'; 
     }
    return null;
  };

  export const ValidateField = <T>(field: string, value: T): string | null => {
    const requiredMessage = 'Обязательно к заполнению';
  
    if (field === 'name') {
      if (typeof value === 'string' && value.length === 0) return requiredMessage;
    }
  
    if (modelFields.includes(field)) {
      if (typeof value === 'number' && value === 0) return requiredMessage;
    }
    return null;
};

  export const EntityValidation = (formData: IEntity): Partial<IValidationErrors> => {
    const errors: Partial<IValidationErrors> = {};
    const requiredFields: ValidationEntityField[] = ['name', 'slug'];

    validateRequiredFields(formData, requiredFields, errors);
    return errors;
};