import { IEntity } from "./devices";

export type IListRefObj = {
    [index: string]: HTMLDivElement | null;
};
export type Checked = {
    [index: number]: boolean;
}

export type CheckedDeviceOptions = {
    id: number;
    name: string;
    type: string;
    value: string;
    disabled: boolean;
  }
export interface IAdminEntity  {
        id: string;
        name: string;
        slug?: string;
        locationName?: string;
        comment?: string;
        phoneNumber?: string;
        address?: string;
        typeId?: string;
        type?: string;
        manufacturer?: string;
        manufacturerId?: string;
}
export interface IContractor extends IEntity {
    contractorId?: string;
    phoneNumber: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
}