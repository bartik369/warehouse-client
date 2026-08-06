import { Typography } from 'antd';
import clsx from 'clsx';

import { Device } from '@/entities/device/model/types';

import styles from './DeviceAutocomplete.module.scss';
import { DEVICE_TYPES } from './constants';

interface DeviceAutocompleteItemProps {
  device: Device;
  disabled?: boolean;
}
export const DeviceAutocompleteItem = ({
  device,
  disabled = false,
}: DeviceAutocompleteItemProps) => {
  const isDeviceType = (value: string): value is keyof typeof DEVICE_TYPES => {
    return value in DEVICE_TYPES;
  };
  const Icon = isDeviceType(device.typeSlug) ? DEVICE_TYPES[device.typeSlug].icon : undefined;

  return (
    <div className={clsx(styles.content, disabled && styles.disabled)}>
      <span className={styles.icon}>{Icon && <Icon />}</span>
      <Typography.Text className={styles.tooltipName} ellipsis={{ tooltip: device.name }}>
        {device.name}
      </Typography.Text>
      <span className={styles.value}>{device.manufacturerName}</span>
      <Typography.Text className={styles.tooltipName} ellipsis={{ tooltip: device.serialNumber }}>
        {device.serialNumber}
      </Typography.Text>
      <span className={styles.value}>{device.inventoryNumber}</span>
    </div>
  );
};
