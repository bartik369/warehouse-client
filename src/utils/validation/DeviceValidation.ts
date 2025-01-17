import { IDevice, IDeviceModel } from './../../types/devices';
import { IValidationDeviceErrors } from './../../types/devices';


type ValidationField = keyof IDevice;
type ValidationModelField = keyof IDeviceModel

const fieldsMemoryScreen = ['laptop', 'mobile'];
const fieldScreen = ['tv', 'monitor'];

export const DeviceFormValidation = (formData: IDevice, itemType: string):IValidationDeviceErrors => {
    const errors: IValidationDeviceErrors = {};
    const requiedField: ValidationField[] = ['name', 'type', 'manufacturer', 'warehouseId'];

    requiedField.forEach((field) => { 

        if (!formData[field]) {
            errors[field as keyof IValidationDeviceErrors] = 'Обязательно к заполнению';
        }

        if (fieldsMemoryScreen.includes(itemType) || fieldScreen.includes(itemType)) {
            if (!formData.memorySize) {
                errors.memorySize = 'Обязательно к заполнению';
            }
            if (!formData.screenSize) {
                errors.screenSize = 'Обязательно к заполнению';
            }
        }

        if (formData.name && formData.name.length < 5) {
            errors.name = 'Не менее 5 символов';
        }
    });
    return errors

}

export const DeviceValidateField = (field:string, value:string | number | boolean) => {
    switch (field) {
        case 'name':
            if(typeof value === 'string' && !value.trim()) {
                return 'Обязательно к заполению'
            }
            if (typeof value === 'string' && value.length < 5) {
                return 'Не менее 5 символов'
            }
        break;
        case 'memorySize':
        case 'screenSize':
            if (typeof value === 'number' && value === 0) {
                return 'Обязательно к заполению'
            }
            break;
        default: 
        return null
    }
    return null
    
}
export const DeviceModelValidation = (formData: IDeviceModel) => {
    const errors: Partial<IValidationDeviceErrors> = {};
    const requiedField:ValidationModelField[] = ['name', 'manufacturer'];
    requiedField.forEach((field) => {

        if (formData[field]?.length === 0) {
            errors[field] = 'Обязательно к заполнению'
        }
    });
    return errors
}
export const  DeviceModelValidationField = (field:string, value:string) => {
    switch(field) {
        case 'name':
            if(typeof value === 'string' && !value.trim()) {
                return 'Обязательно к заполению'
            }
        break;
        case 'manufacturer':
            if(typeof value === 'string' && !value.trim()) {
                return 'Обязательно к заполению'
            }
        break;
        default:
            return null
    }
    return null
}