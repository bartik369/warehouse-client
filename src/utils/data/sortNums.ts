import { SortOrder } from 'antd/es/table/interface';

type Numbers = number | null | undefined;

export function sortNumbers(a: Numbers, b: Numbers, order?: SortOrder) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;

  const comparison = a - b;

  if (order === 'descend') return -comparison;
  return comparison;
}
