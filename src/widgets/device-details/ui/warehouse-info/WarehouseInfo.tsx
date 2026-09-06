import { Divider, Flex } from 'antd';
import { IoCalendarOutline } from 'react-icons/io5';

import { DeviceDetails } from '@/entities/device/model/types';
import { formatDate } from '@/shared/lib/date/formatDate';

import styles from './WarehouseInfo.module.scss';

interface WarehouseInfoProps {
  device: DeviceDetails;
}
export const WarehouseInfo = ({ device }: WarehouseInfoProps) => {
  return (
    <Flex className={styles.content}>
      <span className={styles.title}>Расположение</span>
      <span className={styles.value}>{device.warehouse?.name}</span>
      <Divider style={{ margin: '6px 0px' }} />
      <span className={styles.title}>Дата перемещения:</span>
      <Flex align="center" gap={5}>
        <IoCalendarOutline className={styles.valueIcon} />
        <span className={styles.value}>{formatDate(device?.updatedAt, 'datetime')}</span>
      </Flex>
    </Flex>
  );
};
