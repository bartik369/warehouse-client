import { AiOutlineSignature } from 'react-icons/ai';
import { TbArrowBackUp } from 'react-icons/tb';

import Search from '@/components/deviceIssue/search/Search';
import BtnAction from '@/components/ui/buttons/BtnAction';
import { IssueState } from '@/features/issue/model/issueTypes';
import { AssignedDevice, BaseIssueQuery } from '@/types/issue';
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';
import { COLORS } from '@/utils/constants/ui/colors';
import { PLACEHOLDER_LABELS } from '@/utils/constants/ui/placeholders';

import DeviceTable from '../../tables/DeviceTable';
import NoData from '../../ui/no-data/NoData';
import DeviceList from '../device/list/DeviceList';
import styles from './Steps.module.scss';

interface ReviewDocumentStepProps {
  nextStep: () => void;
  setDevice: (item: AssignedDevice) => void;
  deleteDevice: (id: string) => void;
  resetDevices: () => void;
  getDevice: () => void;
  changeDevice: (value: string) => void;
  resetDeviceQuery: () => void;
  state: IssueState;
}
const ReviewDocumentStep = ({
  state,
  nextStep,
  setDevice,
  deleteDevice,
  resetDevices,
  getDevice,
  changeDevice,
  resetDeviceQuery,
}: ReviewDocumentStepProps) => {
  return (
    <div className={styles.inner}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          getDevice();
        }}
      >
        <Search
          placeholder={PLACEHOLDER_LABELS.searchDevice}
          actions={{
            handleChange: changeDevice,
            handleReset: resetDeviceQuery,
            handleSearch: getDevice,
          }}
          value={state.deviceQuery}
        />
        {state.devicesLoaded && state.wasSearched && (
          <div className={styles.result}>
            <DeviceList state={state} setDevice={setDevice} />
          </div>
        )}
      </form>
      <>
        {state.assignedDevices?.length > 0 ? (
          <>
            <DeviceTable state={state} showDeleteIcon={true} deleteDevice={deleteDevice} />
            <div className={styles.actions}>
              <BtnAction
                icon={<TbArrowBackUp />}
                size="lg"
                color={COLORS.grey}
                title={BUTTON_LABELS.clean}
                click={resetDevices}
              />
              <BtnAction
                icon={<AiOutlineSignature />}
                size="lg"
                color={COLORS.darkGreen}
                title={BUTTON_LABELS.signature}
                click={nextStep}
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
