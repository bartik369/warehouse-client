import { Card, Flex, Typography } from 'antd';

import { Device } from '@/entities/device/model/types';
import { DeviceListTable } from '@/features/issue-device/ui/device-list-table/DeviceListTable';

import styles from '../EquipmentIssuanceInfo.module.scss';

interface DeviceListProps {
  devices: Device[];
  loading: boolean;
}
export const DeviceList = ({ devices, loading }: DeviceListProps) => {
  return (
    <Card>
      <Typography.Title className={styles.title} level={2}>
        Выданыe устройства: {`(${devices.length})`}
      </Typography.Title>
      <DeviceListTable devices={devices} loading={loading} />
    </Card>
  );
};
