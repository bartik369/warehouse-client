export const copyToClipboard = async (value: string | number | null): Promise<void> => {
  await navigator.clipboard.writeText(String(value));
};
