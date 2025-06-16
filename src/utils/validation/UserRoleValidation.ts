import { requiredFieldText } from "../constants/constants";
import { UserRole, ValidateUserRoleErrors } from "../../types/access";

const requiredUserFields = [
  "userName",
  "roleName",
];
type ValidationFields = keyof UserRole;

const validateRequiredFields = (
  formData: UserRole,
  fields: (keyof UserRole)[],
  errors: Record<string, string>
): void => {
  fields.forEach((field) => {
    if (!formData[field]) {
      errors[field as string] = requiredFieldText;
    }
  });
};

export const FormValidation = (formData: UserRole): ValidateUserRoleErrors => {
  const errors: Record<string, string> = {};
  const requiredFields: ValidationFields[] = [
    "userId",
    'roleName',
    'email'
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
