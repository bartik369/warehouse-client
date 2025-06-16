import { Entity } from "./devices";
import { User } from "./user";

export type ListRefObj = {
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
export interface AdminEntity  {
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

export interface Contractor extends Entity {
    contractorId?: string;
    phoneNumber: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface FieldMultiformConfig {
  type: "input" | "select" | "textarea" | "image" | "tel";
  label?: string;
  name: keyof Entity;
  itemsKey?: "cities" | "manufacturers" | "types" | "roles";
  placeholder?: string;
}
export interface FieldUserFormConfig {
  type: "input" | "select"
  label?: string;
  name: keyof User;
  itemsKey?: "departments" | "locations";
  placeholder?: string;
}
