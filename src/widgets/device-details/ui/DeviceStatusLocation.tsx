import { Card, Flex, Typography } from 'antd';
import { CiLocationArrow1 } from 'react-icons/ci';
import { FiUser } from 'react-icons/fi';
import { LiaWarehouseSolid } from 'react-icons/lia';

import { DeviceDetails } from '@/entities/device/model/types';
import { CustomTag } from '@/shared/ui/custom-tag/CustomTag';

import styles from './DeviceDetails.module.scss';
import { UserInfo } from './user-info/UserInfo';
import { WarehouseInfo } from './warehouse-info/WarehouseInfo';

interface DeviceStatusLocationProps {
  device: DeviceDetails;
}
export const DeviceStatusLocation = ({ device }: DeviceStatusLocationProps) => {
  const isAssigned = device.isAssigned;
  return (
    <Card className={styles.container}>
      <Flex vertical gap={10}>
        <Flex className={styles.titleContent}>
          <Flex className={styles.icon}>
            <CiLocationArrow1 size={19} />
          </Flex>
          <Typography.Title className={styles.title} level={2}>
            Статус
          </Typography.Title>
          <CustomTag
            title={isAssigned ? 'На руках' : 'На складе'}
            variant={isAssigned ? 'warning' : 'success'}
            icon={isAssigned ? FiUser : LiaWarehouseSolid}
            iconSize={14}
            size="md"
          />
        </Flex>
        {device.isAssigned ? <UserInfo device={device} /> : <WarehouseInfo device={device} />}
      </Flex>
    </Card>
  );
};
