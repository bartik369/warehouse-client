import { ISignin } from './../../types/user';

type ValidationField = keyof ISignin;

export const AuthValidate = (formData: ISignin) => {
    const errors: Partial<ISignin> = {}
    const requidFields:ValidationField[] = ['email', 'password'];

    requidFields.forEach((field) => {
        if (!formData[field]) {
            errors[field as ValidationField] = 'Обязательно к заполнению *';
        }
    })
    return errors
}

export const AuthValidateField = (field: string, value: string) => {

}