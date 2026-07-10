import { z } from 'zod';

import { slugSchema } from '@/shared/lib/validation/slug';

export const manufacturerSchema = z.object({
  name: z.string().min(1, 'Введите навание'),
  slug: slugSchema,
  comment: z.string().optional(),
});

export type ManufacturerFormValues = z.infer<typeof manufacturerSchema>;
