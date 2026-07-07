import { Entity } from '@/types/devices';

export const mapEntityToOptions = (items: Entity[]) => {
  return items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
};
