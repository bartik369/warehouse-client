import { isValidPhoneNumber } from 'react-phone-number-input';
import z from 'zod';

import { slugSchema } from '@/shared/lib/validation/slug';

export const contractorSchema = z.object({
  name: z.string().min(1, 'Введите навание'),
  slug: slugSchema,
  phoneNumber: z
    .string()
    .min(1, { error: 'Введите номер телефона' })
    .refine((value) => isValidPhoneNumber(value), {
      error: 'Введите корректный номер телефона',
    }),
  address: z.string().optional(),
});

export type ContractorFormValues = z.infer<typeof contractorSchema>;
