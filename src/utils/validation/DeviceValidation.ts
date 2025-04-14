import { IValidationErrors } from './../../types/devices';
import { requiredFieldText, requiredFieldFive } from '../constants/constants';
import { IDevice, IDeviceModel, IEntity } from './../../types/devices';

type ValidationField = keyof IDevice;
type ValidationModelField = keyof IDeviceModel;
type ValidationEntityField = keyof IEntity;
type ValidationContractorField = keyof IEntity;
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
    if (!formData[field]) {
      errors[field as string] = requiredFieldText;
    }
  });
};

export const FormValidation = (formData: IDevice, itemType: string): IValidationErrors => {
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
    errors.name = requiredFieldFive;
  }
  return errors;
};

export const ModelValidation = (
  formData: IDeviceModel
): Partial<IValidationErrors> => {
  const errors: Partial<IValidationErrors> = {};
  const requiredFields: ValidationModelField[] = [
    'name',
    'manufacturer',
    'type',
  ];
  validateRequiredFields(formData, requiredFields, errors);
  return errors;
};

export const ModelValidationField = <T extends string | IEntity>(
  field: string,
  value: T
): ValidationError => {
  const isEmpty = (val: string) => val.length === 0;

  if (typeof value === 'object' && isEmpty(value.slug!)) {
    return requiredFieldText;
  }
  if (typeof value === 'string' && modelFields.includes(field) && isEmpty(value)) {
    return requiredFieldText;
  }
  return null;
};

export const ValidateField = <T>(field: string, value: T): string | null => {
  const requiredMessage = requiredFieldText;

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

export const EntityValidation = (formData: IEntity): Partial<IValidationErrors> => {
  const errors: Partial<IValidationErrors> = {};
  const requiredFields: ValidationEntityField[] = ['name', 'slug'];

  validateRequiredFields(formData, requiredFields, errors);
  return errors;
};
export const ContractorValidation = (
  formData: IEntity
): Partial<IValidationErrors> => {
  const errors: Partial<IValidationErrors> = {};
  const requiredFields: ValidationContractorField[] = [
    'address',
    'name',
    'phoneNumber',
  ];
  validateRequiredFields(formData, requiredFields, errors);
  return errors;
};
