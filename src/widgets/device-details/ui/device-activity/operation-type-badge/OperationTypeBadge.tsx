import { Flex } from 'antd';
import clsx from 'clsx';

import { DeviceProcessType } from '@/widgets/device-details/model/types';

import styles from './OperationTypeBadge.module.scss';
import { config } from './constants';

interface OperationTypeBadgeProps {
  type: DeviceProcessType;
}
export const OperationTypeBadge = ({ type }: OperationTypeBadgeProps) => {
  const { label, icon: Icon, style } = config[type];
  return (
    <Flex className={styles.container}>
      <div className={clsx(styles.icon, styles[style])}>
        <Icon />
      </div>
      <span>{label}</span>
    </Flex>
  );
};
