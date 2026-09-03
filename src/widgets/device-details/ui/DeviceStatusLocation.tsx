import { Card, Flex, Typography } from 'antd';
import { FiUser } from 'react-icons/fi';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { LiaWarehouseSolid } from 'react-icons/lia';

import { DeviceDetails } from '@/entities/device/model/types';
import { CustomTag } from '@/shared/ui/custom-tag/CustomTag';

import styles from './DeviceDetails.module.scss';
import { UserInfo } from './user-info/UserInfo';

interface DeviceStatusLocationProps {
  device: DeviceDetails;
}
export const DeviceStatusLocation = ({ device }: DeviceStatusLocationProps) => {
  const isAssigned = device.isAssigned;
  return (
    <Card>
      <Flex vertical gap={10}>
        <Flex align="center" gap={5}>
          <IoMdInformationCircleOutline size={16} />
          <Typography.Title className={styles.title} level={2}>
            Состояние и расположение
          </Typography.Title>
        </Flex>
        <CustomTag
          title={isAssigned ? 'На руках у пользователя' : 'На складе'}
          variant={isAssigned ? 'warning' : 'success'}
          icon={isAssigned ? FiUser : LiaWarehouseSolid}
          iconSize={14}
          size="md"
        />
        {device.isAssigned ? (
          <UserInfo device={device} />
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
