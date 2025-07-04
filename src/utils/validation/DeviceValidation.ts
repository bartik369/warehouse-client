import { MESSAGES } from '../constants/ui/messages';
import { ValidationErrors } from '@/types/devices';
import { Device, DeviceModel, Entity } from '@/types/devices';
import { isValidPhone } from './Phones';

type ValidationField = keyof Device;
type ValidationModelField = keyof DeviceModel;
type ValidationEntityField = keyof Entity;
type ValidationContractorField = keyof Entity;
type ValidationError = string | null;

const fieldsMemoryScreen = ['laptop', 'mobile'];
const fieldScreen = ['tv', 'monitor'];
const modelFields = ['name', 'manufacturerName', 'typeName'];
const contactorFields = ['name', 'phoneNumber', 'address'];

const validateRequiredFields = <T>(
  formData: T,
  fields: (keyof T)[],
  errors: Record<string, string>
): void => {
  fields.forEach((field) => {
    const value = formData[field];
           if (field === 'phoneNumber') {
               if (!isValidPhone(value as string)) {
                   errors[field as string] = MESSAGES.wrongPhoneFormat;
               }
           }
           if (!value) {
               errors[field as string] = MESSAGES.requiredFieldText;
           }
  });
};

export const FormValidation = (formData: Device, itemType: string): ValidationErrors => {
  const errors: Record<string, string> = {};
  const requiredField: ValidationField[] = [
    'name',
    'typeName',
    'manufacturerName',
    'warehouseId',
  ];
  validateRequiredFields(formData, requiredField, errors);

  if (fieldsMemoryScreen.includes(itemType)) {
    validateRequiredFields(formData, ['memorySize', 'screenSize'], errors);
  }
  if (fieldScreen.includes(itemType)) {
    validateRequiredFields(formData, ['screenSize'], errors);
  }

  if (formData.name && formData.name.length < 5) {
    errors.name = MESSAGES.requiredFieldFive;
  }
  return errors;
};

export const ModelValidation = (
  formData: DeviceModel
): Partial<ValidationErrors> => {
  const errors: Partial<ValidationErrors> = {};
  const requiredFields: ValidationModelField[] = [
    'name',
    'manufacturer',
    'type',
  ];
  validateRequiredFields(formData, requiredFields, errors);
  return errors;
};

export const ModelValidationField = <T extends string | Entity>(
  field: string,
  value: T
): ValidationError => {
  const isEmpty = (val: string) => val.length === 0;

  if (typeof value === 'object' && isEmpty(value.slug!)) {
    return MESSAGES.requiredFieldText;
  }
  if (typeof value === 'string' && modelFields.includes(field) && isEmpty(value)) {
    return MESSAGES.requiredFieldText;
  }
  return null;
};

export const ValidateField = <T>(field: string, value: T): string | null => {
  const requiredMessage = MESSAGES.requiredFieldText;

  if (field === 'name') {
    if (typeof value === 'string' && value.length === 0) return requiredMessage;
  }

  if (modelFields.includes(field)) {
    if (typeof value === 'number' && value === 0) return requiredMessage;
    if (typeof value === 'string' && value.length === 0) return requiredMessage;
  }
  if (contactorFields.includes(field)) {
    if (typeof value === 'string' && value.length === 0) return requiredMessage;
  }
  return null;
};

export const EntityValidation = (formData: Entity): Partial<ValidationErrors> => {
  const errors: Partial<ValidationErrors> = {};
  const requiredFields: ValidationEntityField[] = ['name', 'slug'];

  validateRequiredFields(formData, requiredFields, errors);
  return errors;
};
export const ContractorValidation = (
  formData: Partial<Entity>
): Partial<ValidationErrors> => {
  const errors: Partial<ValidationErrors> = {};
  const requiredFields: ValidationContractorField[] = [
    'address',
    'name',
    'phoneNumber',
  ];
  validateRequiredFields(formData, requiredFields, errors);
  return errors;
};
