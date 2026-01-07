import { IssueState } from '@/features/issue/model/issueTypes';
import { BaseDeviceQuery } from '@/types/devices';
import { baseDeviceLabelConfig } from '@/utils/data/menus';

import styles from './DeviceTable.module.scss';
import DeviceTableRow from './DeviceTableRow';

interface DeviceTableProps {
  showDeleteIcon?: boolean;
  actions: BaseDeviceQuery;
  state: IssueState;
}

const DeviceTable = ({ showDeleteIcon, actions, state }: DeviceTableProps) => {
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
        {state.assignedDevices?.map((device) => (
          <DeviceTableRow
            showDeleteIcon={showDeleteIcon}
            key={device.id}
            device={device}
            actions={actions}
          />
        ))}
      </tbody>
    </table>
  );
};

export default DeviceTable;
