import { Flex, Typography } from 'antd';

import { User } from '@/entities/ user/model/types';
import { IssueState } from '@/features/issue-device/model/issueTypes';
import { IssueActions, IssueDevice, IssueWarehouse } from '@/features/issue-device/model/useIssue';
import { DeviceAutocomplete } from '@/shared/ui/device-autocomplete/DeviceAutocomplete';
import { SECTION_TITLES } from '@/utils/constants/ui/titles';

import { StepLayout } from '../../layout/StepLayout';
import { DeviceList } from '../../user-selection/ui/DeviceList';
import styles from './SelectDeviceStep.module.scss';
import { IssueSummary } from './issue-summary/ IssueSummary';

interface ReviewDocumentStepProps {
  user: User | null;
  state: IssueState;
  device: IssueDevice;
  warehouse: IssueWarehouse;
  actions: IssueActions;
}
export const SelectDeviceStep = ({
  state,
  actions,
  device,
  user,
  warehouse,
}: ReviewDocumentStepProps) => {
  const isNextDisabled = state.assignedDevices.length === 0;

  const left = (
    <>
      <Typography.Title className={styles.title}>
        {SECTION_TITLES.availableDevices}
      </Typography.Title>
      <DeviceAutocomplete
        searched={device.status.wasSearched}
        loading={device.status.isLoading}
        value={device.data.value}
        options={device.data.options}
        onChange={device.actions.handleChange}
        onOptionSelect={device.actions.handleSelect}
        onClear={device.actions.handleReset}
      />
    </>
  );
  const center = <IssueSummary user={user} warehouse={warehouse.data.warehouse} />;
  const right = (
    <>
      <Typography.Title
        className={styles.title}
      >{`${SECTION_TITLES.selectedDevices} (${state.assignedDevices.length})`}</Typography.Title>
      <DeviceList
        devices={state.assignedDevices}
        onDelete={device.actions.handleDelete}
        onResetList={device.actions.handleResetList}
      />
    </>
  );

  return (
    <StepLayout
      left={left}
      center={center}
      right={right}
      currentStep={state.issueStep}
      disabledStep={isNextDisabled}
      leftWidth={550}
      onNext={actions.handleNextStep}
      onBack={actions.handleBackStep}
    />
  );
};
