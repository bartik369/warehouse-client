import type { LocationFormValue } from '@/features/manage-location/model/schema';

export type Location = LocationFormValue & {
  id: string;
};
