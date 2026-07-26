import z from 'zod';

export const accessSchema = z.object({
  userId: z.string().min(1, 'Укажите пользователя'),
  permissionRoleIds: z.array(z.string()).min(1, 'Выберите хотя бы одну роль'),
});

export type AccessFromValues = z.infer<typeof accessSchema>;
