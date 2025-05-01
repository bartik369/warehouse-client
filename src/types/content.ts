import { IEntity } from "./devices";

export type IListRefObj = {
    [index: string]: HTMLDivElement | null;
};
// export type Checked = {
//     [index: string]: boolean;
// }
export type Checked = Record<string, boolean>

export type CheckedDeviceOptions = {
    // id: number;
    id: string;
    name: string;
    type: string;
    value: string;
    disabled: boolean;
  }
  export type CheckedPermissionOptions  = {
    id: string;
    name: string;
    comment: string;
    disabled: boolean;
  }
export interface IAdminEntity  {
        id: string;
        name: string;
        slug?: string;
        locationName?: string;
        imagePath?: string;
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
export interface IFieldMultiformConfig {
  type: "input" | "select" | "textarea" | "image" | "tel";
  label?: string;
  name: keyof IEntity;
  itemsKey?: "cities" | "manufacturers" | "types";
  placeholder?: string;
}
