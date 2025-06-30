export const useInputMask = () => {
  const formatPhone = (value: string, prevValue: string) => {
    let cleaned = value.replace(/\D/g, '');

    if (cleaned.startsWith('7') || cleaned.startsWith('8')) {
      cleaned = cleaned.slice(1);
    }

    if (cleaned.length === 0) return '+7';

    let formatted = '+7';
    if (cleaned.length >= 1) formatted += ` (${cleaned.substring(0, 3)}`;
    if (cleaned.length >= 4) formatted += `) ${cleaned.substring(3, 6)}`;
    if (cleaned.length >= 7) formatted += `-${cleaned.substring(6, 8)}`;
    if (cleaned.length >= 9) formatted += `-${cleaned.substring(8, 10)}`;

    if (prevValue.length > value.length) {
      while (
        formatted.endsWith(')') ||
        formatted.endsWith(' ') ||
        formatted.endsWith('-')
      ) {
        formatted = formatted.slice(0, -1);
      }
    }

    return formatted;
  };

  const changeFormatPhone = (phone: string) => {
    if (phone.trim().length === 0) return;
    return phone.replace(/[^\d+]/g, '');
  };

  return { formatPhone, changeFormatPhone };
};
