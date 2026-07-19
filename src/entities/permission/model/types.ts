import { PermissionFormValues } from '@/features/manage-permission/model/schema';

export type Permission = PermissionFormValues & {
  id: string;
};
