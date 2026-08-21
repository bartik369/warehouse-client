import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Введите email')
    .pipe(z.email({ error: 'Некорректный email' })),
  password: z.string().min(1, { error: 'Введите пароль' }).min(6, { error: 'Минимум 6 символов' }),
});
export type LoginFormValues = z.infer<typeof loginSchema>;
