export const formatNumToThousand = (value?: string | number | null) => {
  if (value == null || value === '') return '-';
  const num = Number(value);
  if (Number.isNaN(num)) return '-';
  return new Intl.NumberFormat('ru-RU').format(num);
};
