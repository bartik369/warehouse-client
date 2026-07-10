import { ManufacturerFormValues } from './schema';

export type Manufacturer = ManufacturerFormValues & {
  id: string;
};

export type FormMode = 'create' | 'update';
