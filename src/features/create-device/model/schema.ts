import { z } from 'zod';

export const deviceSchema = z
  .object({
    name: z.string({ error: 'Поле обязательно к заполнению' }).min(2),
    typeId: z.string({ error: 'Поле обязательно к заполнению' }),
    manufacturerId: z.string({ error: 'Поле обязательно к заполнению' }),
    modelId: z.string({ error: 'Поле обязательно к заполнению' }),
    modelCode: z.string().optional(),
    inventoryNumber: z.string({ error: 'Поле обязательно к заполнению' }),
    serialNumber: z.string().optional(),
    weight: z.number().optional(),
    screenSize: z.number().optional(),
    memorySize: z.number().optional(),
    warehouseId: z.string({ error: 'Поле обязательно к заполнению' }),
    isFunctional: z.boolean({ error: 'Поле обязательно к заполнению' }),
    price_with_vat: z.number().optional(),
    price_without_vat: z.number().optional(),
    residual_price: z.number().optional(),
    startWarrantyDate: z.string().date().nullable().optional(),
    endWarrantyDate: z.string().date().nullable().optional(),
    warrantyNumber: z.string().optional(),
    providerId: z.string().optional(),
    comment: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const warrantyFields = [
      data.startWarrantyDate,
      data.endWarrantyDate,
      data.warrantyNumber,
      data.providerId,
    ];
    const hasWarrantyData = warrantyFields.some((value) => value != null && value !== '');
    if (!hasWarrantyData) return;
    if (!data.startWarrantyDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['startWarrantyDate'],
        message: 'Поле обязательно к заполнению',
      });
    }
    if (!data.endWarrantyDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['endWarrantyDate'],
        message: 'Поле обязательно к заполнению',
      });
    }
    if (!data.warrantyNumber) {
      ctx.addIssue({
        code: 'custom',
        path: ['warrantyNumber'],
        message: 'Поле обязательно к заполнению',
      });
    }
    if (!data.providerId) {
      ctx.addIssue({
        code: 'custom',
        path: ['providerId'],
        message: 'Поле обязательно к заполнению',
      });
    }
  });

export type DeviceFormValues = z.infer<typeof deviceSchema>;
