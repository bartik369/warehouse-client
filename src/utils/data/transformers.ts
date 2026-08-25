import { Device } from '@/entities/device/model/types';
import { AssignedDevice } from '@/types/issue';

export const prepareIssueDeviceData = (device: Device): Device => {
  const data = {
    ...device,
    // id: device.id,
    // name: device.name,
    // modelName: device.model?.name,
    // modelType: device.model?.type.name,
    // manufacturer: device.model?.manufacturer.name,
    // inventoryNumber: device.inventoryNumber,
    // serialNumber: device.serialNumber,
    //todo проверить как рабоатет
  };
  return data;
};
