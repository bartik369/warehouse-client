export function formatMonth(value: string) {
  const [year, monthNumber] = value.split('-');
  const date = new Date(Number(year), Number(monthNumber) - 1);
  return new Intl.DateTimeFormat('ru-RU', {
    month: 'short',
  }).format(date);
}
