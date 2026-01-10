import { IssueState } from '@/features/issue/model/issueTypes';
import { BaseIssueQuery } from '@/types/issue';
import { baseDeviceLabelConfig } from '@/utils/data/menus';

import styles from './DeviceTable.module.scss';
import DeviceTableRow from './DeviceTableRow';

interface DeviceTableProps {
  showDeleteIcon?: boolean;
  state?: IssueState;
  deleteDevice: (id: string) => void;
}

const DeviceTable = ({ showDeleteIcon, state, deleteDevice }: DeviceTableProps) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {baseDeviceLabelConfig?.map((item) => (
            <th key={item.key}>{item.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {state?.assignedDevices?.map((device) => (
          <DeviceTableRow
            showDeleteIcon={showDeleteIcon}
            key={device.id}
            device={device}
            deleteDevice={() => deleteDevice(device.id)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default DeviceTable;
