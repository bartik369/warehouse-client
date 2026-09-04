import { Card, Flex, Typography } from 'antd';
import { PiCoinsThin } from 'react-icons/pi';

import { DeviceDetails } from '@/entities/device/model/types';

import { getPriceInfo } from '../model/constants';
import styles from './DeviceDetails.module.scss';

interface PriceInfoProps {
  device: DeviceDetails;
}

export const PriceInfo = ({ device }: PriceInfoProps) => {
  const priceInfo = getPriceInfo(device);
  return (
    <Card className={styles.container}>
      <Flex vertical gap={10}>
        <Flex className={styles.titleContent}>
          <Flex className={styles.icon}>
            <PiCoinsThin size={19} />
          </Flex>
          <Typography.Title className={styles.title} level={2}>
            Финансы
          </Typography.Title>
        </Flex>
        <Flex vertical>
          {priceInfo.map(({ label, value }) => (
            <div className={styles.row}>
              <span className={styles.label}>{label}</span>
              <span className={styles.dots} />
              <span className={styles.value}>{value ?? ''}</span>
            </div>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};
