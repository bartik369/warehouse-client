import { MESSAGES } from '../constants/ui/messages';
import { Signin } from '@/types/user';

type ValidationField = keyof Signin;
const errors: Partial<Signin> = {};
const requiredFields: ValidationField[] = ['email', 'password'];
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const AuthValidate = (formData: Signin) => {
  if (requiredFields) {
    requiredFields.map((field) => {
      if (formData[field].trim().length === 0) {
        errors[field] = MESSAGES.requiredFieldText;
      } else {
        errors[field] = '';
      }
    });
  }

  if (!emailRegex.test(formData.email) && formData.email.length !== 0) {
    errors.email = MESSAGES.wrongFormat;
  }
  return errors;
};

export const AuthValidateField = (field: string): null | undefined => {
  if (field.trim().length !== 0) {
    return null;
  }
};
