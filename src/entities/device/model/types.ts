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

type DeviceType =
  | 'accessory'
  | 'network'
  | 'monitor'
  | 'projector'
  | 'tv'
  | 'toner'
  | 'mobile_phone'
  | 'laptop'
  | 'desktop'
  | 'desktop_phone'
  | 'printer';

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
    id: string;
    name: string;
    slug: string;
    locationId: string;
  };
}
