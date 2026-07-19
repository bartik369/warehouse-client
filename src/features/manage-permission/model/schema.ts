import z from 'zod';

export const permissionSchema = z.object({
  name: z.string().min(1, 'Введите навание'),
  comment: z.string().optional(),
  disabled: z.boolean().optional(),
});

export type PermissionFormValues = z.infer<typeof permissionSchema>;
