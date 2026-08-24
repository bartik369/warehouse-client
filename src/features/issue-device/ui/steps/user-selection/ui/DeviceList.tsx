import { Button } from 'antd';
import { LuTrash2 } from 'react-icons/lu';

import { Device, FilteredDevicesFromBack } from '@/entities/device/model/types';

import { AssignedDevicesTable } from '../../../assigned-devices-table/AssignedDevicesTable';
import styles from './SelectUserStep.module.scss';

interface DeviceListProps {
  devices: FilteredDevicesFromBack[];
  onDelete: (id: string) => void;
  onResetList: () => void;
}
export const DeviceList = ({ devices, onDelete, onResetList }: DeviceListProps) => {
  return (
    <>
      <AssignedDevicesTable devices={devices} onDelete={onDelete} />
      {devices.length > 0 && (
        <Button className={styles.deleteBtn} onClick={onResetList}>
          <LuTrash2 size={16} />
          Очистить список
        </Button>
      )}
    </>
  );
};
