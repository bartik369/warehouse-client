import { Empty } from 'antd';
import { AiOutlineSignature } from 'react-icons/ai';
import { TbArrowBackUp } from 'react-icons/tb';

import BtnAction from '@/components/ui/buttons/BtnAction';
import { IssueState } from '@/features/issue-device/model/issueTypes';
import { IssueDeviceList } from '@/features/issue-device/ui/DeviceSearchResults/DeviceSearchResults';
import Search from '@/shared/ui/search/Search';
import { AssignedDevice, BaseIssueQuery } from '@/types/issue';
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';
import { COLORS } from '@/utils/constants/ui/colors';
import { PLACEHOLDER_LABELS } from '@/utils/constants/ui/placeholders';

import NoData from '../../../../components/ui/no-data/NoData';
import { AssignedDevicesTable } from '../AssignedDevicesTable/AssignedDevicesTable';
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
export const ReviewDocumentStep = ({
  state,
  nextStep,
  setDevice,
  deleteDevice,
  resetDevices,
  getDevice,
  changeDevice,
  resetDeviceQuery,
}: ReviewDocumentStepProps) => {
  const hasAssignedDevices = state.assignedDevices?.length > 0;
  const shouldShowSearchResult = state.devicesLoaded && state.wasSearched;

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
        {shouldShowSearchResult && (
          <div className={styles.result}>
            <IssueDeviceList state={state} setDevice={setDevice} />
          </div>
        )}
      </form>
      {hasAssignedDevices ? (
        <>
          <AssignedDevicesTable devices={state.assignedDevices} deleteDevice={deleteDevice} />
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
              color={COLORS.orange}
              title={BUTTON_LABELS.signature}
              click={nextStep}
            />
          </div>
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};
