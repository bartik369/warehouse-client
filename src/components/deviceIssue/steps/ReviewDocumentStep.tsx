import { useIssueContext } from "../../../features/issue/context/IssueContext";
import DeviceList from "../device/list/DeviceList";
import { BaseDeviceQuery } from "../../../types/devices";
import Search from "../search/Search";
import styles from "./Steps.module.scss";
import BtnAction from "../../ui/buttons/BtnAction";
import { BsCheck } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { reset } from "../../../utils/constants/constants";
import DeviceTable from "../../tables/device/DeviceTable";
import NoData from "../../ui/no-data/NoData";

interface ReviewDocumentStepProps {
  actions: BaseDeviceQuery;
}
const ReviewDocumentStep = ({ actions }: ReviewDocumentStepProps) => {
  const { state } = useIssueContext();
  return (
    <div className={styles.inner}>
      <form className={styles.form}>
        <Search
          placeholder="search devices"
          actions={{
            handleChange: actions.handleDeviceChange,
            handleReset: actions.handleResetDeviceQuery,
            handleSearch: actions.handleGetDevice,
          }}
          value={state.deviceQuery}
        />
        {(state.devicesLoaded && state.wasSearched) &&
          <div className={styles.result}>
            <DeviceList
              state={state}
              actions={actions}
            />
          </div>
        }
        </form>
        <>
          {state?.assignedDevices.length > 0 ? (
            <>
              <DeviceTable />
              <div className={styles.actions}>
                <BtnAction
                  icon={<GrFormClose />}
                  size="lg"
                  color="grey"
                  title={reset}
                  click={actions.handleResetIssueDevices}
                />
                <BtnAction
                  icon={<BsCheck />}
                  size="lg"
                  color="dark-green"
                  title={"next"}
                  click={actions.handleNextStep}
                />
              </div>
            </>
          ) : (
            <NoData />
          )}
        </>
    </div>
  );
};

export default ReviewDocumentStep;
