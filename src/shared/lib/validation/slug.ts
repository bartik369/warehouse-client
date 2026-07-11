import { z } from 'zod';

export const slugSchema = z
  .string()
  .min(1, 'Введите slug')
  .regex(/^[a-z0-9_-]+$/, 'Допустимы только строчные латинские буквы, цифры и дефис');
