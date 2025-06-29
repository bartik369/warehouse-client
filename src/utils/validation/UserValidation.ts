import { User } from "@/types/user";
import { ValidateUserErrors } from "@/types/user";
import { MESSAGES } from "../constants/ui/messages";

const requiredUserFields = [
  "userName",
  "email",
  "workId",
  "firstNameRu",
  "lastNameRu",
  "firstNameEn",
  "lastNameEn",
  "department",
  "location",
];
type ValidationFields = keyof User;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateRequiredFields = (
  formData: User,
  fields: (keyof User)[],
  errors: Record<string, string>
): void => {
  fields.forEach((field) => {
    if (!formData[field]) {
      errors[field as string] = MESSAGES.requiredFieldText;
    }
    if (formData[field] === 'email') {
      if (!emailRegex.test(formData[field]) && formData[field].length !== 0) {
        errors.email = MESSAGES.wrongFormat;
      }
    }
  });
};

export const FormValidation = (formData: User): ValidateUserErrors => {
  const errors: Record<string, string> = {};
  const requiredFields: ValidationFields[] = [
    "userName",
    "email",
    "workId",
    "firstNameRu",
    "lastNameRu",
    "firstNameEn",
    "lastNameEn",
    "department",
    "location",
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
