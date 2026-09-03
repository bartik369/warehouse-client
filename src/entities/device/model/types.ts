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

export interface Device {
  id: string;
  name: string;
  inventoryNumber: string | null;
  modelCode: string | null;
  modelId: string | null;
  serialNumber: string | null;
  weight: number | null;
  screenSize: number | null;
  memorySize: number | null;
  inStock: boolean;
  isFunctional: boolean;
  isAssigned: boolean;
  assignedUserId: string | null;
  warehouseId: string | null;
  description: string | null;
  addedById: string;
  updatedById: string;
  lastIssuedAt: Date | null;
  lastReturnedAt: Date | null;
  createdAt: string;
  updatedAt: string;
  price_with_vat: number | null;
  price_without_vat: number | null;
  residual_price: number | null;
  model: {
    id: string;
    name: string;
    slug: string;
    manufacturer: {
      id: string;
      name: string;
      slug: string;
    };
    type: {
      id: string;
      name: string;
      slug: string;
    };
  } | null;
  warehouse: {
    id: string;
    name: string;
    slug: string;
    locationId: string | null;
  } | null;
  warranty: {
    warrantyNumber: string;
    startWarrantyDate: Date;
    endWarrantyDate: Date;
    provider: string;
    contractorId: string | null;
    contractor: {
      id: string;
      name: string;
      slug: string;
    } | null;
  } | null;
}

export interface DeviceDetails {
  id: string;
  name: string;
  inventoryNumber: string | null;

  modelId: string | null;
  modelCode: string | null;
  serialNumber: string | null;

  weight: number | null;
  screenSize: number | null;
  memorySize: number | null;

  inStock: boolean;
  isFunctional: boolean;
  isAssigned: boolean;

  assignedUserId: string | null;
  warehouseId: string | null;

  description: string | null;

  addedById: string;
  updatedById: string;

  lastIssuedAt: Date | string | null;
  lastReturnedAt: Date | string | null;

  createdAt: Date | string;
  updatedAt: Date | string;

  price_without_vat: string | null;
  price_with_vat: string | null;
  residual_price: string | null;

  warehouse: {
    name: string;
    slug: string;
  } | null;

  model: {
    name: string;
    imagePath: string | null;

    manufacturer: {
      id: string;
      name: string;
      slug: string;
    };

    type: {
      name: string;
      slug: string;
    };
  } | null;

  warranty: {
    warrantyNumber: string;
    startWarrantyDate: Date | string;
    endWarrantyDate: Date | string;
    warrantyStatus: string;
    isExpired: boolean;

    contractor: {
      name: string;
      slug: string;
    } | null;
  } | null;

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
}
