import { DeviceLabel } from "../../../types/devices";
import styles from "./DeviceTable.module.scss";
import { useIssueContext } from "../../../features/issue/context/IssueContext";
import DeviceTableRow from "./DeviceTableRow";

const DeviceTable = () => {
  const { state, actions } = useIssueContext();
  const baseDeviceLabelConfig: DeviceLabel[] = [
    { key: "name", label: "Название" },
    { key: "modelName", label: "Модель" },
    { key: "typeName", label: "Тип" },
    { key: "manufacturerName", label: "Производитель" },
    { key: "inventoryNumber", label: "Инвентарный номер" },
    { key: "serialNumber", label: "Серийный номер" },
  ];
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
          <DeviceTableRow key={device.id} device={device} actions={actions} />
        ))}
      </tbody>
    </table>
  );
};

export default DeviceTable;
