export const isValidPhone = (phone: string): boolean => {
    const regex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return regex.test(phone.trim());
};