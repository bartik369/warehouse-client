export interface IDevice {
    id?: string;
    name: string;
    inventoryNumber?: string;
    modelCode?: string;
    modelId: string;
    modelName?: string;
    serialNumber?: string;
    weight?: number;
    screenSize?: number | null;
    memorySize?: number | null;
    inStock: boolean,
    isFunctional:boolean;
    isAssigned: boolean;
    warehouseId: string;
    warehouseName: string;
    description?: string;
    type: string;
    typeId: string;
    manufacturer: string;
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
  id?:   string;
  name?: string;
  slug?: string;
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
  id: string;
  name: string;
  value: string;
}

export interface IEntity {
  id?: string;
  name: string;
  slug: string;
  imagePath?: string,
  typeId?: string,
  manufacturerId?: string,
}

export interface IFilteredDevicesFromBack {
  id: string;
  name: string;
  inventoryNumber: string;
  serialNumber: string;
  isAssigned: boolean;
  isFunctional: boolean;
  memorySize: number;
  screenSize: number;
  model: {
      name: string;
      slug: string;
      manufacturer: {
          name: string;
          slug: string;
      },
      type: {
          name: string;
          slug: string;
      }
  },
  warehouse: {
    name: string;
    slug: string;
  };
}

export interface IFilterDeviceOptions {
  isAssigned: { 
    isAssigned: boolean 
  }[];
  isFunctional: { 
    isFunctional: boolean 
  }[];
  manufacturer: {
    name: string;
    slug: string;
  }[];
  memorySize: {
    memorySize: number;
  }[];
  screenSize: {
    screenSize: number;
  }[];
  model: {
    name: string;
    slug: string;
  }[];
  type: {
    name: string;
    slug: string;
  }[];
  warehouse: {
    name: string;
    slug: string;
  }[];
}

export interface IDeviceFilters {
  manufacturer: string[];
  isFunctional: string[];
  isAssigned: string[];
  type: string[];
  memorySize: string[];
  screenSize: string[];
  model: string[];
  warehouse: string[],
}

type FilterLabelsKeys = 
'manufacturer' | 
'type' | 
'model' | 
'warehouse' | 
'screenSize' | 
'memorySize' | 
'isFunctional' | 
'isAssigned' ;

export type FilterLabel = {
  key: FilterLabelsKeys;
  label: string;
}

export interface IDeviceInfo {
  id: string;
  isAssigned: boolean;
  warehouse: {
      name: string;
      slug: string;
  }
}

