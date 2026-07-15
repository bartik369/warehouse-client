import type { LocationFormValues } from '@/features/manage-location/model/schema';

export type Location = LocationFormValues & {
  id: string;
};
