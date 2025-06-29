import DeviceTableRow from "./DeviceTableRow";
import { useIssueContext } from "@/features/issue/context/IssueContext";
import { baseDeviceLabelConfig } from "@/utils/data/menus";
import styles from "./DeviceTable.module.scss";

interface DeviceTableProps {
  showDeleteIcon?: boolean;
}

const DeviceTable = ({ showDeleteIcon }: DeviceTableProps) => {
  const { state, actions } = useIssueContext();
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
