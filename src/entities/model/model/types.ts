import { Manufacturer } from '@/entities/manufacturer/model/types';
import { DeviceType } from '@/entities/type/model/types';

export type Model = {
  id: string;
  name: string;
  slug: string;
  imagePath?: string;
  typeId: string;
  manufacturerId: string;
};

export type DeviceModelResponse = Model & {
  manufacturer: Manufacturer;
  type: DeviceType;
};
