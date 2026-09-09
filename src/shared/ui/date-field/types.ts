import type { DatePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';

export type DateFieldProps = Omit<
  DatePickerProps,
  'placeholder' | 'value' | 'onChange' | 'defaultValue'
> & {
  label: string;
  error?: string;
  value?: Dayjs | null;
  onChange?: (date: Dayjs | null) => void;
};
