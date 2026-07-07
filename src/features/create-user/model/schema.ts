import { z } from 'zod';

export const createUserSchema = z.object({
  firstNameRu: z.string().min(1),
  lastNameRu: z.string().min(1),
  firstNameEn: z.string().min(1),
  lastNameEn: z.string().min(1),
  userName: z.string().min(1),
  email: z.email(),
  workId: z.string().min(1),
  isActive: z.boolean(),
  department: z.string(),
  location: z.string(),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
