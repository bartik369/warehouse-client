import { useIssueContext } from "../../../features/issue/context/IssueContext";
import DeviceList from "../device/list/DeviceList";
import { BaseDeviceQuery } from "../../../types/devices";
import Search from "../search/Search";
import styles from "./Steps.module.scss";
import BtnAction from "../../ui/buttons/BtnAction";
import { BsCheck } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { reset  } from "../../../utils/constants/constants";
import DeviceTable from "../../tables/device/DeviceTable";

interface ReviewDocumentStepProps {
  isSuccess: boolean;
  isFetching: boolean;
  actions: BaseDeviceQuery;
}
const ReviewDocumentStep = ({ isSuccess, isFetching, actions}: ReviewDocumentStepProps) => {
  const { state} = useIssueContext();

console.log(state.assignedDevices)
console.log(state.deviceIssueData)
  return (
    <>
      <form>
        <Search
          placeholder="search devices"
          actions={{
            handleChange: actions.handleDeviceChange,
            handleReset: actions.handleResetDeviceQuery,
            handleSearch: actions.handleGetDevice
          }}
          value={state.deviceQuery}
        />
      </form>
      <DeviceList
       state={state}
       actions={actions}
       isFetching={isFetching}
       isSuccess={isSuccess}
      />
      {state.assignedDevices.length > 0 &&
      <DeviceTable />
      }
      {state?.assignedDevices.length > 0 && (
          <div className={styles.actions}>
            <BtnAction
              icon={<GrFormClose />}
              size="lg"
              color="grey"
              title={reset}
              click={actions.handleResetDeviceQuery}
            />
            <BtnAction
              icon={<BsCheck />}
              size="lg"
              color="dark-green"
              title={"next"}
              click={actions.handleNextStep}
            />
          </div>
      )}
    </>
  );
};

export default ReviewDocumentStep;
