import { Card, Flex, Typography } from 'antd';

import { DeviceDetails } from '@/entities/device/model/types';

import styles from './DeviceDetails.module.scss';

interface FinancialInfoProps {
  device: DeviceDetails;
}

export const FinancialInfo = ({ device }: FinancialInfoProps) => {
  return (
    <Card>
      <Flex>
        <Typography.Title className={styles.title} level={2}>
          Финансовая информация
        </Typography.Title>
      </Flex>
    </Card>
  );
};
