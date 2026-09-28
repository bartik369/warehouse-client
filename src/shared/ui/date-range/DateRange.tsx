import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';

import styles from './DateRange.module.scss';

const { RangePicker } = DatePicker;
interface DateRangeProps {
  placeholder?: [string, string];
  onChange: (value: [string, string]) => void;
}
export const DateRange = ({ placeholder, onChange }: DateRangeProps) => {
  return (
    <RangePicker
      className={styles.dateRange}
      placeholder={placeholder}
      format="DD.MM.YYYY"
      onChange={(dates) => {
        onChange([dates?.[0]?.format('YYYY-MM-DD') ?? '', dates?.[1]?.format('YYYY-MM-DD') ?? '']);
      }}
    />
  );
};
