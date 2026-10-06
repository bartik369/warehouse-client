export function calculatePercentage(part: number, total: number) {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}
