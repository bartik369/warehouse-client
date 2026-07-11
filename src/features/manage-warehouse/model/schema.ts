import { z } from 'zod';

import { slugSchema } from '@/shared/lib/validation/slug';

export const warehouseSchema = z.object({
  name: z.string().min(1, 'Введите навание'),
  slug: slugSchema,
  comment: z.string().optional(),
  locationId: z.string(),
});

export type WarehouseFormValues = z.infer<typeof warehouseSchema>;
