import { ISignin } from './../../types/user';

type ValidationField = keyof ISignin;
const errors: Partial<ISignin> = {};
const requidFields:ValidationField[] = ['email', 'password'];
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const AuthValidate = (formData: ISignin) => {
    requidFields && requidFields.map((field) => {

        if (formData[field].length === 0) {
            errors[field] = 'Обязательно к заполнению';
        } else {
            errors[field] = '';
        }
    });

    if (!emailRegex.test(formData.email) && formData.email.length !== 0) {
        errors.email = 'Неправильный формат';
    }
    return errors;
}

export const AuthValidateField = (field: string): null | undefined => {

    if (field.length !== 0) {
        return null;
    }
}