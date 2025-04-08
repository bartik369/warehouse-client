import { IContractor } from "./content";

export interface IDevice {
  id?: string;
  name: string;
  inventoryNumber?: string;
  modelCode?: string;
  modelId?: string;
  modelSlug?: string;
  modelName?: string;
  serialNumber?: string;
  weight?: number;
  screenSize?: number | null;
  memorySize?: number | null;
  inStock: boolean;
  isFunctional: boolean;
  isAssigned: boolean;
  warehouseId: string;
  warehouseSlug?: string;
  warehouseName: string;
  description?: string;
  typeSlug: string;
  typeName: string;
  typeId: string;
  manufacturerSlug: string;
  manufacturerName: string;
  manufacturerId: string;
  addedById: string;
  updatedById: string;
  createdAt?: Date;
  updatedAt?: Date;
  price_with_vat?: number | null;
  price_without_vat?: number | null;
  residual_price?: number | null;
  warrantyNumber?: string;
  startWarrantyDate?: Date | null;
  endWarrantyDate?: Date | null;
  providerName: string;
  providerSlug: string;
  contractorId: string;
}

export interface IAggregateDeviceInfo extends IDevice {
  addedBy: {
    firstNameRu: string;
    lastNameRu: string;
    firstNameEn: string;
    lastNameEn: string;
  };
  updatedBy: {
    firstNameRu: string;
    lastNameRu: string;
    firstNameEn: string;
    lastNameEn: string;
  };
  warehouse: {
    name: string;
    slug: string;
  };
  model: {
    name: string;
    imagePath: string;
    manufacturer: {
      name: string;
      slug: string;
    };
    type: {
      name: string;
      slug: string;
    };
  };
  warranty?: {
    warrantyNumber: string;
    startWarrantyDate: Date;
    endWarrantyDate: Date;
    warrantyStatus: string;
    isExpired: boolean;
    contractor: {
      name: string;
      slug: string;
    };
  };
  deviceIssues: {
    firstNameEn: string;
    lastNameEn: string;
  }[];
}

export interface IDeviceModel {
  id?: string;
  name: string;
  type: string;
  manufacturer: string;
  imagePath?: string;
}

export interface IDeviceMedia {
  file?: File | null;
  prevImg?: string | null;
}

export interface IValidationErrors {
  id?: string;
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
  phoneNumber?: string;
  address?: string;
}


export interface IInventory {
  id?: number;
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
  id?: number;
  serialNumber?: string;
  contractorId: string;
  dateTransfer: Date;
}
export interface IManufacturer {
  id: number;
  name: string;
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
export interface DevicePrices {
  uniqueFields: Field[];
}

export interface ISelectedItem {
  id: string;
  name: string;
  value: string;
}

export interface IEntity {
  id: string;
  name: string;
  slug: string;
  imagePath?: string;
  typeId?: string;
  manufacturerId?: string;
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
    };
    type: {
      name: string;
      slug: string;
    };
  };
  warehouse: {
    name: string;
    slug: string;
  };
}

export interface IFilterDeviceOptions {
  isAssigned: {
    isAssigned: boolean;
  }[];
  isFunctional: {
    isFunctional: boolean;
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
  warehouse: string[];
}

type FilterLabelsKeys =
  | "manufacturer"
  | "type"
  | "model"
  | "warehouse"
  | "screenSize"
  | "memorySize"
  | "isFunctional"
  | "isAssigned";

export type FilterLabel = {
  key: FilterLabelsKeys;
  label: string;
};

export interface IDeviceInfo {
  id: string;
  isAssigned: boolean;
  warehouse: {
    name: string;
    slug: string;
  };
}
export type QueryParams = Record<string, string | number | boolean>

export interface IUpdateDeviceFormState {
  itemType: string;
  isUpdate: boolean;
  device: IDevice;
  modelFields?: Record<string, string>,
  checked: boolean;
  errors: Record<string, string>;
}


export interface IUpdateDeviceFormActions {
  handleTypeChange:(item: IEntity) => void
  handleModelChange:(item: IEntity) => void
  handleManufacturerChange:(item: IEntity) => void
  handleWarehouseChange:(item: IEntity) => void
  handleContractorChange:(item: IContractor) => void
  handleInputChange: (name: keyof IDevice, e:any) => void
  handleNumber: (num: number) => void;
  handleExtNumber: (num: number, fieldName: string) => void;
  handleChecked: () => void;
  handleAddDevice: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleResetDevice: () => void;
  resetModelData: () => void;
  handleStartDateChange: (item:Date | null) => void;
  handleEndDateChange: (item:Date | null) => void;
  handleSetTitle: (item: string) => void;
  handleSetType: (item: string) => void;
}
export interface IUpdateDeviceFormSetters {
  setDevice: (item: IDevice) => void;
  setFieldType: (item: string) => void;
  setEntity: (item:string) => void;
}

export interface IWarrantyFormState {
  selectedValuesMemo: string;
  device: IDevice;
  isOpen: boolean;
}

export interface IWarrantyFormActions {
  handleInputChange: (name: keyof IDevice, value: string) => void;
}
export interface IWarrantyFormSetters {
  setValue: (value: T) => void;
  setDevice: (device: IDevice) => void;
}
// export interface IUpdateDeviceFormSetters {
//   setDevice: (item: IDevice) => void;
//   resetModel: () => void;
// }


