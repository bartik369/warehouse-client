import styles from "./DeviceTable.module.scss";
import DeviceTableRow from "./DeviceTableRow";
import { useIssueContext } from "../../features/issue/context/IssueContext";
import { DeviceLabel } from "../../types/devices";

const DeviceTable = () => {
  const { state } = useIssueContext();
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
          <DeviceTableRow key={device.id} device={device} />
        ))}
      </tbody>
    </table>
  );
};

export default DeviceTable;
