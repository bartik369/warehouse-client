import { Flex, Typography } from 'antd';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import { MdOutlineModeEdit } from 'react-icons/md';
import { RxCopy } from 'react-icons/rx';

import { DeviceDetails } from '@/entities/device/model/types';
import { copyToClipboard } from '@/shared/lib/clipboard/copyToClipboard';
import { ActionButton } from '@/shared/ui/action-button/ActionButton';
import { CustomTag } from '@/shared/ui/custom-tag/CustomTag';

import styles from './DeviceGeneralInfo.module.scss';

interface DeviceGeneralInfoProps {
  device: DeviceDetails;
}

export const DeviceGeneralInfo = ({ device }: DeviceGeneralInfoProps) => {
  const isFunctional = device.isFunctional;
  return (
    <Flex className={styles.container}>
      <Flex gap={10}>
        <Flex vertical gap={5}>
          <Typography.Title className={styles.name} level={2}>
            {device?.name}
          </Typography.Title>
          <span className={styles.label}>Инвентраный номер</span>
          <Flex align="center" gap={10}>
            <Flex gap={10} className={styles.badge}>
              <Typography.Title className={styles.inventoryNumber} level={1}>
                {device?.inventoryNumber}
              </Typography.Title>
            </Flex>
            <RxCopy
              className={styles.icon}
              onClick={() => copyToClipboard(device.inventoryNumber)}
            />
          </Flex>
        </Flex>
        <CustomTag
          variant={isFunctional ? 'success' : 'error'}
          icon={isFunctional ? IoIosCheckmarkCircleOutline : MdOutlineCancel}
          size="md"
          title={isFunctional ? 'Исправно' : 'Неисправно'}
          iconSize={15}
        />
      </Flex>
      <ActionButton title="Редактировать" variant="apply" icon={MdOutlineModeEdit} />
    </Flex>
  );
};
