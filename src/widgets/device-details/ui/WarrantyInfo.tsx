import { Card, Empty, Flex, Typography } from 'antd';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { MdSupportAgent } from 'react-icons/md';
import { MdOutlineCancel } from 'react-icons/md';

import { DeviceDetails } from '@/entities/device/model/types';
import { CustomTag } from '@/shared/ui/custom-tag/CustomTag';

import { getWarrantyInfo } from '../model/constants';
import styles from './DeviceDetails.module.scss';

interface WarrantyInfoProps {
  device: DeviceDetails;
}

export const WarrantyInfo = ({ device }: WarrantyInfoProps) => {
  const warrantyInfo = getWarrantyInfo(device);
  const isExpiredWarranty = device.warranty?.isExpired;

  return (
    <Card className={styles.container}>
      <Flex vertical gap={10}>
        <Flex className={styles.titleContent}>
          <Flex className={styles.icon}>
            <MdSupportAgent size={19} />
          </Flex>
          <Typography.Title className={styles.title} level={2}>
            Гарантия
          </Typography.Title>
        </Flex>
        {device.warranty ? (
          <Flex vertical gap={10}>
            <CustomTag
              iconSize={11}
              icon={!isExpiredWarranty ? FaRegCircleCheck : MdOutlineCancel}
              title={!isExpiredWarranty ? 'Активна' : 'Неактивна'}
              variant={!isExpiredWarranty ? 'success' : 'error'}
            />
            <Flex vertical>
              {warrantyInfo.map(({ label, value }) => (
                <div key={label} className={styles.row}>
                  <span className={styles.label}>{label}</span>
                  <span className={styles.dots} />
                  <span className={styles.value}>{value ?? ''}</span>
                </div>
              ))}
            </Flex>
          </Flex>
        ) : (
          <Empty />
        )}
      </Flex>
    </Card>
  );
};
