import z from 'zod';

export const permissionRoleSchema = z.object({
  roleId: z.string(),
  roleName: z.string().min(1, 'Обязательное поле'),
  permissionIds: z.array(z.string()).min(1, 'Обязательное поле'),
  warehouseId: z.string().optional(),
  locationId: z.string().optional(),
  comment: z.string().optional(),
});

export type PermissionRoleFormValues = z.infer<typeof permissionRoleSchema>;
