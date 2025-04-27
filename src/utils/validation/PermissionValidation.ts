import { IPermissionRole, IValidateAccessErrors } from "../../types/access";
import { requiredFieldText } from "../constants/constants";

type ValidationFields = keyof IPermissionRole;

const requiredFieldsOther: ValidationFields[] = [
  "roleName",
  "permissionName",
  "locationName",
  "warehouseName",
  "comment",
];
const requiredFieldsManager: ValidationFields[] = [
  "roleName",
  "locationName",
  "comment",
];

const validateRequiredFields = (
  data: IPermissionRole,
  fields: ValidationFields[],
  errors: Record<string, string>
): void => {
  fields.forEach((field) => {
    const value = data[field];
    if (Array.isArray(value) && value.length === 0) {
      errors[field as string] = requiredFieldText;
    }
    if (!value) {
      errors[field as string] = requiredFieldText;
    }
  });
};

export const FormValidation = (
  data: IPermissionRole
): Partial<IValidateAccessErrors> => {
  const errors: Record<string, string> = {};

  if (data.roleName === "manager") {
    validateRequiredFields(data, requiredFieldsManager, errors);
  } else {
    validateRequiredFields(data, requiredFieldsOther, errors);
  }
  return errors;
};

export const validateField = <T>(
  field: ValidationFields | string,
  value: T
): Record<string, string> => {
  const errors: Record<string, string> = {};
  const requiredMessage = requiredFieldText;

  if (requiredFieldsOther.includes(field as ValidationFields)) {
    let isEmptyField = false;
    if (typeof value === "string") {
      isEmptyField = value.trim().length === 0;
    } else if (Array.isArray(value)) {
      isEmptyField = value.length === 0;
    } else if (typeof value == "boolean") {
      isEmptyField = !value;
    } else if (typeof value === "object" && value !== null) {
      isEmptyField = !Object.values(value).some((item) => item);
    } else if (value == null) {
      isEmptyField = true;
    }
    errors[field] = isEmptyField ? requiredMessage : "";
  }

  return errors;
};
