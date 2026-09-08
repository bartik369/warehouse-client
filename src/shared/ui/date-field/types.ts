import type { DatePickerProps } from 'antd';

export type DateFieldProps = Omit<DatePickerProps, 'placeholder'> & {
  label: string;
  error?: string;
};
