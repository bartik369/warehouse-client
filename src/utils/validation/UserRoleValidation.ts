import { requiredFieldText } from "../constants/constants";
import { IUserRole, IValidateUserRoleErrors } from "../../types/access";

const requiredUserFields = [
  "userName",
  "roleName",
];
type ValidationFields = keyof IUserRole;

const validateRequiredFields = (
  formData: IUserRole,
  fields: (keyof IUserRole)[],
  errors: Record<string, string>
): void => {
  fields.forEach((field) => {
    if (!formData[field]) {
      errors[field as string] = requiredFieldText;
    }
  });
};

export const FormValidation = (formData: IUserRole): IValidateUserRoleErrors => {
  const errors: Record<string, string> = {};
  const requiredFields: ValidationFields[] = [
    "userName",
    'roleName'
  ];
  validateRequiredFields(formData, requiredFields, errors);
  return errors;
};

export const ValidateField = <T>(field: string, value: T): string | null => {
  const requiredMessage = requiredFieldText;
  if (requiredUserFields.includes(field)) {
    if (typeof value === "string" && value.length === 0) {
      return requiredMessage;
    }
  }
  return null;
};
