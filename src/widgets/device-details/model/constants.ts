import { DeviceDetails } from '@/entities/device/model/types';

export const getCommonCharacteristics = (device: DeviceDetails) => [
  {
    label: 'Производитель',
    value: device.model?.manufacturer.name,
  },
  {
    label: 'Модель',
    value: device.model?.name,
  },
  {
    label: 'Тип устройства',
    value: device.model?.type.name,
  },
  {
    label: 'Код модели',
    value: device.modelCode,
  },
  {
    label: 'Серийный номер',
    value: device.serialNumber,
  },
];

export const getTechnicalCharacteristics = (device: DeviceDetails) => [
  {
    label: 'Вес (кг)',
    value: device.weight,
  },
  {
    label: 'Размер экрана (дюйм)',
    value: device.screenSize,
  },
  {
    label: 'Объём памяти (гб)',
    value: device.memorySize,
  },
];
