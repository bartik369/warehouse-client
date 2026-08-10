export const copyToClipboard = async (value: string | number): Promise<void> => {
  await navigator.clipboard.writeText(String(value));
};
