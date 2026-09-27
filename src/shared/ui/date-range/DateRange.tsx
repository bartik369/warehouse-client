import { DatePicker } from 'antd';

import styles from './DateRange.module.scss';

const { RangePicker } = DatePicker;
interface DateRangeProps {
  placeholder?: [string, string];
}
export const DateRange = ({ placeholder }: DateRangeProps) => {
  return <RangePicker className={styles.dateRange} placeholder={placeholder} />;
};
