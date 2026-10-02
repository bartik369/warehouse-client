import z from 'zod';

import { USER_ROLES } from '@/entities/permission-role/model/types';

export const permissionRoleSchema = z.object({
  roleId: z.string(),
  roleName: z.enum(USER_ROLES, {
    error: 'Обязательное поле',
  }),
  permissionIds: z.array(z.string()).min(1, 'Обязательное поле'),
  warehouseId: z.string().optional(),
  locationId: z.string().optional(),
  comment: z.string().optional(),
});

export type PermissionRoleFormValues = z.infer<typeof permissionRoleSchema>;
