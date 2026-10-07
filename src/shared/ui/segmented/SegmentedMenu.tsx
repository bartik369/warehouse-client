import { Segmented, type SegmentedProps } from 'antd';
import clsx from 'clsx';

import { SizeVariant } from '@/shared/types/variants';

import styles from './SegmentedMenu.module.scss';

interface SegmentedMenuProps<T> {
  variant: SizeVariant;
  value: T;
  options: SegmentedProps<T>['options'];
  onChange: SegmentedProps<T>['onChange'];
}
export const SegmentedMenu = <T,>({
  variant = 'medium',
  options,
  onChange,
}: SegmentedMenuProps<T>) => {
  return (
    <Segmented
      className={clsx(styles.segmented, styles[variant])}
      options={options}
      onChange={onChange}
    />
  );
};
