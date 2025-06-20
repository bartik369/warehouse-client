import { useIssueContext } from "../../../features/issue/context/IssueContext";
import DeviceList from "../device/list/DeviceList";
import AssignedList from "../device/assigned/AssignedList";
import styles from "./Steps.module.scss";
import { BaseDeviceQuery } from "../../../types/devices";

interface ReviewDocumentStepProps {
  isSuccess: boolean;
  isFetching: boolean;
  actions: BaseDeviceQuery;
}
const ReviewDocumentStep = ({ isSuccess, isFetching, actions}: ReviewDocumentStepProps) => {
  const { state} = useIssueContext();
  return (
    <>
      <form>
      <div className={styles.input}>
        <input
          onChange={(e) => actions.handleDeviceChange(e.target.value)}
          type="text"
          value={state.deviceQuery}
        />
        <button 
          type="button" 
          onClick={() => actions.handleGetDevice(state.deviceQuery)}>
          ok
        </button>
      </div>
      </form>
      {state.assignedDevices.length > 0}
      <DeviceList
       state={state}
       actions={actions}
       isFetching={isFetching}
       isSuccess={isSuccess}
      />
      <AssignedList />
    </>
  );
};

export default ReviewDocumentStep;
