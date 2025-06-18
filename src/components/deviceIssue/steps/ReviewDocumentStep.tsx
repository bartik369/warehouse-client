import { useIssueContext } from "../../../features/issue/context/IssueContext";
import EquipmentList from "../../EquipmentItem/EquipmentList";
import styles from "./Steps.module.scss";

const ReviewDocumentStep = () => {
  const { state, actions } = useIssueContext();
//   if (state.deviceIssueData.devices.length > 0) {
//     console.log("start");
//   }
  return (
    <>
      <form>
      <div className={styles.input}>
        <input
          onChange={(e) => actions.handleDeviceChange(e.target.value)}
          type="text"
          value={state.deviceQuery}
        />
        <button type="button" onClick={() => actions.handleGetDevice(state.deviceQuery)}>ok</button>
      </div>
      </form>
      
      <EquipmentList />
    </>
  );
};

export default ReviewDocumentStep;
