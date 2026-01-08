import { AiOutlineSignature } from 'react-icons/ai';
import { TbArrowBackUp } from 'react-icons/tb';

import Search from '@/components/deviceIssue/search/Search';
import BtnAction from '@/components/ui/buttons/BtnAction';
import { IssueState } from '@/features/issue/model/issueTypes';
import { BaseIssueQuery } from '@/types/issue';
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';
import { COLORS } from '@/utils/constants/ui/colors';
import { PLACEHOLDER_LABELS } from '@/utils/constants/ui/placeholders';

import DeviceTable from '../../tables/DeviceTable';
import NoData from '../../ui/no-data/NoData';
import DeviceList from '../device/list/DeviceList';
import styles from './Steps.module.scss';

interface ReviewDocumentStepProps {
  actions: BaseIssueQuery;
  state: IssueState;
}
const ReviewDocumentStep = ({ actions, state }: ReviewDocumentStepProps) => {
  return (
    <div className={styles.inner}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          actions.handleGetDevice();
        }}
      >
        <Search
          placeholder={PLACEHOLDER_LABELS.searchDevice}
          actions={{
            handleChange: actions.handleDeviceChange,
            handleReset: actions.handleResetDeviceQuery,
            handleSearch: actions.handleGetDevice,
          }}
          value={state.deviceQuery}
        />
        {state.devicesLoaded && state.wasSearched && (
          <div className={styles.result}>
            <DeviceList state={state} actions={actions} />
          </div>
        )}
      </form>
      <>
        {state.assignedDevices.length > 0 ? (
          <>
            <DeviceTable actions={actions} state={state} showDeleteIcon={true} />
            <div className={styles.actions}>
              <BtnAction
                icon={<TbArrowBackUp />}
                size="lg"
                color={COLORS.grey}
                title={BUTTON_LABELS.clean}
                click={actions.handleResetIssueDevices}
              />
              <BtnAction
                icon={<AiOutlineSignature />}
                size="lg"
                color={COLORS.darkGreen}
                title={BUTTON_LABELS.signature}
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
