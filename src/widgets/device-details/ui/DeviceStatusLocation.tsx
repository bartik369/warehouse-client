import { Card, Flex, Typography } from 'antd';
import { FiUser } from 'react-icons/fi';
import { LiaWarehouseSolid } from 'react-icons/lia';

import { DeviceDetails } from '@/entities/device/model/types';
import { CustomTag } from '@/shared/ui/custom-tag/CustomTag';
import { useGetUserQuery } from '@/store/api/userApi';

import styles from './DeviceDetails.module.scss';

interface DeviceStatusLocationProps {
  device: DeviceDetails;
}
export const DeviceStatusLocation = ({ device }: DeviceStatusLocationProps) => {
  const { data: user } = useGetUserQuery(device.assignedUserId, {
    skip: !device.assignedUserId,
  });
  const isAssigned = device.isAssigned;
  return (
    <Card>
      <Flex vertical>
        <Typography.Title className={styles.title} level={2}>
          Состояние и расположение
        </Typography.Title>
        <CustomTag
          title={isAssigned ? 'На руках у пользователя' : 'На складе'}
          variant={isAssigned ? 'warning' : 'success'}
          icon={isAssigned ? FiUser : LiaWarehouseSolid}
          iconSize={14}
          size="md"
        />
        {device.isAssigned ? (
          <Flex vertical>
            <span className={styles.label}>Пользователь</span>
            <span className={styles.value}>{user?.email}</span>
          </Flex>
        ) : (
          <Flex vertical>
            <span className={styles.label}>Расположение</span>
            <span className={styles.value}>{device.warehouse?.name}</span>
          </Flex>
        )}
      </Flex>
    </Card>
  );
};
