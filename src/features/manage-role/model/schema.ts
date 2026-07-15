import z from 'zod';

export const roleSchema = z.object({
  name: z.string().min(1, 'Введите навание'),
  comment: z.string().optional(),
});

export type RoleFormValues = z.infer<typeof roleSchema>;
