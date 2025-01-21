export interface IDevice {
    id?: string;
    name: string;
    inventoryNumber?: string;
    type: string;
    manufacturer?: string;
    modelCode?: string;
    modelId?: string;
    serialNumber?: string;
    media?: string;
    weight?: number;
    screenSize?: number | null;
    memorySize?: number | null;
    inStock: boolean,
    isFunctional:boolean;
    isAssigned: boolean;
    warehouseId: string;
    description?: string;
    addedById: string;
    updatedById: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IDeviceModel {
  id?: string;
  name: string;
  type: string;
  manufacturer: string;
  imagePath?: string;
}

export interface IDeviceMedia {
  file: File | null;
  prevImg: string | null;
}

export interface IValidationErrors {
  name?: string;
  type?: string;
  serviceable?: string;
  description?: string;
  location?: string;
  manufacturer?: string;
  weight?: string;
  screenSize?: string;
  memorySize?: string;
}


export interface IInventory {
    id?: number,
    place: string;
    responsibleUser: string;
    startDate: Date;
    endDate: Date;
    completed: boolean;
    result: IInventoryResult;
}

export interface IInventoryResult {
    id?: number;
    inventoryId: number;
    found: string[];
    lost: string[];
}
export interface IDeviceRepair {
    id?:number;
    serialNumber?: string;
    contractorId: string;
    dateTransfer: Date;
}

export interface IContractor {
    id: number;
    contractorId: string;
    name: string;
    phone: string,
    address: string;

}
export interface IManufacturer {
    id: number;
    name: string
    icon?: React.ReactElement;
}


export type FieldType = "text" | "number";

export interface Field {
  name: string;
  label: string;
  step: number;
  type: FieldType;
}

export interface DeviceType {
  label: string;
  uniqueFields: Field[];
}

export interface DeviceTypes {
  [key: string]: DeviceType;
}

export interface ISelectedItem {
  id: number;
  name: string;
  value: string;
}
