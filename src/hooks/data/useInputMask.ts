export const useInputMask = () => {
  const formatPhone = (value: string, prevValue: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length === 0) return "+7";

    let formatted = "+7";
    if (cleaned.length > 1) formatted += ` (${cleaned.substring(1, 4)}`;
    if (cleaned.length >= 4) formatted += `) ${cleaned.substring(4, 7)}`;
    if (cleaned.length >= 7) formatted += `-${cleaned.substring(7, 9)}`;
    if (cleaned.length >= 10) formatted += `-${cleaned.substring(9, 11)}`;
    if (prevValue.length > value.length) {
      while (
        formatted.endsWith(")") ||
        formatted.endsWith(" ") ||
        formatted.endsWith("-")
      ) {
        formatted = formatted.slice(0, -1);
      }
    }
    return formatted;
  };
  const changeFormatPhone = (phone: string) => {
    if (phone.trim().length === 0) return
    return phone.replace(/[^\d+]/g, "");
  };

  return { formatPhone, changeFormatPhone };
};
