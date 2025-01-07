import { IDevice } from './../../types/devices';
import { IValidationDeviceErrors } from './../../types/devices';


type ValidationField = keyof IDevice;

const fieldsMemoryScreen = ['laptop', 'mobile'];
const fieldScreen = ['tv'];


export const DeviceFormValidation = (formData: IDevice, itemType: string):IValidationDeviceErrors => {
    const errors: IValidationDeviceErrors = {};

    const requiedField: ValidationField[] = ['name', 'type', 'manufacturer', 'location'];
    requiedField.forEach((field) => {
        
        if (!formData[field]) {
            errors[field as keyof IValidationDeviceErrors] = 'Обязательно к заполнению *';
        }

        if (fieldsMemoryScreen.includes(itemType)) {
            if (!formData.memorySize) {
                errors.memorySize = 'Обязательно к заполнению *'
            }
            if (!formData.screenSize) {
                errors.screenSize = 'Обязательно к заполнению *'
            }
        }
        if (formData.name && formData.name.length < 5) {
            errors.name = 'Не менее 5 символов *';
        }
    });
    return errors

}
export const DeviceValidateField = (field:string, value:string | number | boolean) => {
    switch (field) {
        case 'name':
            if(typeof value === 'string' && !value.trim()) {
                return 'Обязательно к заполению *'
            }
            if (typeof value === 'string' && value.length < 5) {
                return 'Не менее 5 символов'
            }
        break;
        case 'memorySize':
        case 'screenSize':
            if (typeof value === 'number' && value === 0) {
                return 'Обязательно к заполению *'
            }
            break;
        default: 
        return null
    }
    return null
    
}