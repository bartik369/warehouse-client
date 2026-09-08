import { z } from 'zod';

export const deviceSchema = z.object({
  name: z.string().min(2),
  typeId: z.string(),
  manufacturerId: z.string(),
  modelId: z.string().optional(),
  modelCode: z.string().optional(),
  inventoryNumber: z.string().optional(),
  serialNumber: z.string().optional(),
  weight: z.number().optional(),
  screeSize: z.number().optional(),
  memorySize: z.number().optional(),
  warehouseId: z.string(),
  isFunctional: z.boolean(),
  price_with_vat: z.number().optional(),
  price_without_vat: z.number().optional(),
  residual_price: z.number().optional(),
  startWarrantyDate: z.string().date().nullable().optional(),
  endWarrantyDate: z.string().date().nullable().optional(),
  warrantyNumber: z.string().optional(),
  providerId: z.string().optional(),
  comment: z.string().optional(),
});

export type DeviceFormValues = z.infer<typeof deviceSchema>;
