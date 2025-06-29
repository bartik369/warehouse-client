import { UserRole, ValidateUserRoleErrors } from "@/types/access";
import { MESSAGES } from "../constants/ui/messages";

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
      errors[field as string] = MESSAGES.requiredFieldText;
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
  const requiredMessage = MESSAGES.requiredFieldText;
  if (requiredUserFields.includes(field)) {
    if (typeof value === "string" && value.length === 0) {
      return requiredMessage;
    }
  }
  return null;
};
