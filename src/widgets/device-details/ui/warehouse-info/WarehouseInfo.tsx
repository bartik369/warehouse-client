import { Divider, Flex } from 'antd';

import { DeviceDetails } from '@/entities/device/model/types';

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
    </Flex>
  );
};
