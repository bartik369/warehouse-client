import { useIssueContext } from "../../../features/issue/context/IssueContext";
import DeviceList from "../device/list/DeviceList";
import { BaseDeviceQuery } from "../../../types/devices";
import Search from "../search/Search";
import styles from "./Steps.module.scss";
import BtnAction from "../../ui/buttons/BtnAction";
import NoData from "../../ui/no-data/NoData";
import { AiOutlineSignature } from "react-icons/ai";
import { TbArrowBackUp } from "react-icons/tb";
import DeviceTable from "../../tables/DeviceTable";
import { PLACEHOLDER_LABELS } from "../../../utils/constants/ui/placeholders";

interface ReviewDocumentStepProps {
  actions: BaseDeviceQuery;
}
const ReviewDocumentStep = ({ actions }: ReviewDocumentStepProps) => {
  const { state } = useIssueContext();
  return (
    <div className={styles.inner}>
      <form className={styles.form}>
        <Search
          placeholder={PLACEHOLDER_LABELS.searchDevice}
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
              <DeviceTable showDeleteIcon={true}/>
              <div className={styles.actions}>
                <BtnAction
                  icon={<TbArrowBackUp />}
                  size="lg"
                  color="grey"
                  title={'Очистить'}
                  click={actions.handleResetIssueDevices}
                />
                <BtnAction
                  icon={<AiOutlineSignature />}
                  size="lg"
                  color="dark-green"
                  title={"Подписать"}
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
