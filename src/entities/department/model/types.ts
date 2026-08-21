import { DepartmentFormValues } from '@/features/manage-department/model/schema';

export type Department = {
  id: string;
  name: string;
  slug: string;
  comment?: string;
};
