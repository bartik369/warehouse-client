import { DepartmentFormValues } from '@/features/manage-department/model/schema';

export type Department = DepartmentFormValues & {
  id: string;
};
