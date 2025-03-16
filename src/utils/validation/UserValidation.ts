import { IUser } from "../../types/user";
import { requiredFieldText } from "../constants/constants";
import { IValidateUserErrors } from "../../types/user";

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
type ValidationFields = keyof IUser;

const validateRequiredFields = <T>(
  formatDate: T,
  fields: (keyof T)[],
  errors: Record<string, string>
): void => {
  fields.forEach((field) => {
    if (!formatDate[field]) {
      errors[field as string] = requiredFieldText;
    }
  });
};

export const FormValidation = (formData: IUser): IValidateUserErrors => {
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
  const requiredMessage = requiredFieldText;
  if (requiredUserFields.includes(field)) {
    if (typeof value === "string" && value.length === 0) {
      return requiredMessage;
    }
  }
  return null;
};
