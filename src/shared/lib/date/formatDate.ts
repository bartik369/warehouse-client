type DateFormat = 'date' | 'datetime';

export const formatDate = (date?: Date | string | null, format: DateFormat = 'date') => {
  if (!date) return '—';

  const value = new Date(date);

  if (format === 'datetime') {
    return value.toLocaleString('ru-RU');
  }

  return value.toLocaleDateString('ru-RU');
};
