import { Typography } from 'antd';
import clsx from 'clsx';

import { Device, FilteredDevicesFromBack } from '@/entities/device/model/types';

import styles from './DeviceAutocomplete.module.scss';
import { DEVICE_TYPES } from './constants';

interface DeviceAutocompleteItemProps {
  device: FilteredDevicesFromBack;
  disabled?: boolean;
}
export const DeviceAutocompleteItem = ({
  device,
  disabled = false,
}: DeviceAutocompleteItemProps) => {
  const isDeviceType = (value: string): value is keyof typeof DEVICE_TYPES => {
    return value in DEVICE_TYPES;
  };
  const typeSlug = device.model?.type?.slug;
  const Icon = isDeviceType(typeSlug) ? DEVICE_TYPES[typeSlug].icon : undefined;

  return (
    <div className={clsx(styles.content, disabled && styles.disabled)}>
      <span className={styles.icon}>{Icon && <Icon />}</span>
      <Typography.Text className={styles.tooltipName} ellipsis={{ tooltip: device.name }}>
        {device.name}
      </Typography.Text>
      <span className={styles.value}>{device.model.manufacturer.name}</span>
      <Typography.Text className={styles.tooltipName} ellipsis={{ tooltip: device.serialNumber }}>
        {device.serialNumber}
      </Typography.Text>
      <span className={styles.value}>{device.inventoryNumber}</span>
    </div>
  );
};
