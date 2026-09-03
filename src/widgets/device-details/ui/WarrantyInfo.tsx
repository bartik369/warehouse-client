import { Card, Flex, Typography } from 'antd';

import { DeviceDetails } from '@/entities/device/model/types';

import styles from './DeviceDetails.module.scss';

interface WarrantyInfoProps {
  device: DeviceDetails;
}

export const WarrantyInfo = ({ device }: WarrantyInfoProps) => {
  return (
    <Card>
      <Flex>
        <Typography.Title className={styles.title} level={2}>
          Гарантия
        </Typography.Title>
      </Flex>
    </Card>
  );
};
