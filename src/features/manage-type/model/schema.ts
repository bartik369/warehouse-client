import { z } from 'zod';

import { slugSchema } from '@/shared/lib/validation/slug';

export const typeSchema = z.object({
  name: z.string().min(1, 'Введите навание'),
  slug: slugSchema,
});

export type TypeFormValues = z.infer<typeof typeSchema>;
