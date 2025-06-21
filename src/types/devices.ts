import { IssueStepType } from "../features/issue/model/issueTypes";
import { Contractor } from "./content";
import { Warehouse } from "./locations";

export interface Device {
  id: string;
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

export interface AggregateDeviceInfo extends Device {
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
    slug: string;
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

export interface DeviceModel {
  id?: string;
  name: string;
  type: string;
  manufacturer: string;
  imagePath?: string;
}

export interface DeviceMedia {
  file?: File | null;
  prevImg?: string | null;
}

export interface ValidationErrors {
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

export interface Inventory {
  id?: number;
  place: string;
  responsibleUser: string;
  startDate: Date;
  endDate: Date;
  completed: boolean;
  result: InventoryResult;
}

export interface InventoryResult {
  id?: number;
  inventoryId: number;
  found: string[];
  lost: string[];
}
export interface DeviceRepair {
  id?: number;
  serialNumber?: string;
  contractorId: string;
  dateTransfer: Date;
}
export interface Manufacturer {
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

export interface SelectedItem {
  id: string;
  name: string;
  value: string;
}

export interface Entity {
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
  warehouseName?: string;
}

export interface FilteredDevicesFromBack {
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

export interface FilterDeviceOptions {
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

export interface DeviceFilters {
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



type DeviceLabelKeys = 
| "name"
| "typeName"
| "modelName"
| "manufacturerName"
| "inventoryNumber"
| "serialNumber"

export type DeviceLabel = {
  key: DeviceLabelKeys,
  label: string;
}

export type FilterLabel = {
  key: FilterLabelsKeys;
  label: string;
};

export interface DeviceInfo {
  id: string;
  isAssigned: boolean;
  warehouse: {
    name: string;
    slug: string;
  };
}
export type QueryParams = Record<string, string | number | boolean>

export interface DeviceFormState {
  itemType: string;
  isUpdate: boolean;
  device: Device;
  modelFields?: Record<string, string>,
  checked: boolean;
  errors: Record<string, string>;
}


export interface DeviceFormActions {
  handleTypeChange:(item: Entity) => void
  handleModelChange:(item: Entity) => void
  handleManufacturerChange:(item: Entity) => void
  handleWarehouseChange:(item: Entity) => void
  handleContractorChange:(item: Contractor) => void
  handleInputChange: (name: keyof Device, e:string) => void
  handleNumber: (num: number) => void;
  handleExtNumber: (num: number, fieldName: string) => void;
  handleChecked: () => void;
  handleAddDevice: () => void;
  handleResetDevice: () => void;
  resetModelData: () => void;
  handleStartDateChange: (item:Date | null) => void;
  handleEndDateChange: (item:Date | null) => void;
  handleSetTitle: (item: string) => void;
  handleSetType: (item: string) => void;
}

export interface WarrantyFormState {
  selectedValuesMemo: string;
  device: Device;
  isOpen: boolean;
}

export interface WarrantyFormActions {
  handleInputChange: (name: keyof Device, value: string) => void;
}

export interface DeviceIssueData {
  userId: string,
  processId: string,
  devices: string[],
}

export interface BaseDeviceQuery {
    handleDeviceIssue: (id: string) => Promise<void>;
    handleUserChange: (value: string) => void;
    handleFullReset: () => void;
    handleResetDeviceQuery: () => void;
    handleSetUser: (id: string) => Promise<void>;
    handleSetStepInfo: (step: IssueStepType) => void;
    handleStartDeviceIssueWith: (id: string) => void;
    handleGetDevice: () => void;
    handleDeviceChange: (value: string) => void;
    handleSetDevice: (item: Device) => void;
    handleSetWarehouse: (item: Warehouse) => void;
    handleGetWarehousesByUser: (id: string) => void;
    handleNextStep: () => void;
    handleDeleteDevice: (id: string) => void;
    handleResetIssueDevices: () => void;
}



