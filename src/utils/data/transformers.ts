import { Device } from '@/types/devices';
import { AssignedDevice } from '@/types/issue';

export const prepareIssueDeviceData = (device: Device): AssignedDevice => {
  const data = {
    id: device.id,
    name: device.name,
    modelName: device.modelName,
    modelType: device.typeName,
    manufacturer: device.manufacturerName,
    inventoryNumber: device.inventoryNumber,
    serialNumber: device.serialNumber,
  };
  return data;
};
