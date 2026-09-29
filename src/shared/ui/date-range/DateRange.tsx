import { DatePicker } from 'antd';
import clsx from 'clsx';

import styles from './DateRange.module.scss';

const { RangePicker } = DatePicker;
interface DateRangeProps {
  placeholder?: [string, string];
  className?: string;
  onChange: (value: [string, string]) => void;
}
export const DateRange = ({ placeholder, className, onChange }: DateRangeProps) => {
  return (
    <RangePicker
      className={clsx(styles.dateRange, className)}
      placeholder={placeholder}
      format="DD.MM.YYYY"
      onChange={(dates) => {
        onChange([dates?.[0]?.format('YYYY-MM-DD') ?? '', dates?.[1]?.format('YYYY-MM-DD') ?? '']);
      }}
    />
  );
};
