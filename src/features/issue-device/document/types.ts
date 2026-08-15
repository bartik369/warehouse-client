type DeviceLabelKeys =
  | 'name'
  | 'modelType'
  | 'modelName'
  | 'manufacturer'
  | 'inventoryNumber'
  | 'serialNumber';

export type DeviceLabel = {
  key: DeviceLabelKeys;
  label: string;
};
