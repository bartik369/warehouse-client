export interface IDevice {
    id?: string;
    serialNumber?: string;
    modelCode?: string;
    inventoryNumber?: string;
    name: string;
    type: string;
    manufacturer?: string;
    weight?: number;
    screenSize?: number | null;
    memorySize?: number | null;
    media?: string;
    serviceable:boolean;
    description?: string;
    assignedTo?: string;
    location: string;
    inStock: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}
export interface IValidationDeviceErrors {
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
