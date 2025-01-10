import { IValidationDeviceErrors } from "./devices";

export type IListRefObj = {
    [index: string]: HTMLDivElement | null;
};
export type Checked = {
    [index: number]: boolean;
}

export type CommonValidateFiels = IValidationDeviceErrors;