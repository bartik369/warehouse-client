import { DeviceDetails } from '@/entities/device/model/types';
import { formatDate } from '@/shared/lib/date/formatDate';
import { formatNumToThousand } from '@/shared/lib/format/formatNumber';

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
    label: 'Тип',
    value: device.model?.type.name,
  },
  {
    label: 'Код модели',
    value: device.modelCode,
  },
  {
    label: 'Серийный №',
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

export const getWarrantyInfo = (device: DeviceDetails) => [
  {
    label: 'Подрядчик',
    value: device.warranty?.contractor?.name,
  },
  {
    label: 'Номер гарантии',
    value: device.warranty?.warrantyNumber,
  },
  {
    label: 'Дата начала',
    value: formatDate(device.warranty?.startWarrantyDate, 'date'),
  },
  {
    label: 'Дата завершения',
    value: formatDate(device.warranty?.endWarrantyDate, 'date'),
  },
];

export const getPriceInfo = (device: DeviceDetails) => [
  {
    label: 'Цена с НДС',
    value: formatNumToThousand(device.price_with_vat),
  },
  {
    label: 'Цена без НДС',
    value: formatNumToThousand(device.price_without_vat),
  },
  {
    label: 'НДС 20%',
    value: formatNumToThousand(Number(device.price_with_vat) - Number(device.price_without_vat)),
  },
];
