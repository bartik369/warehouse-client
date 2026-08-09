import { Flex, Typography } from 'antd';

import { User } from '@/entities/user/model/types';
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
  issueState: IssueState;
  deviceController: IssueDevice;
  warehouseController: IssueWarehouse;
  actions: IssueActions;
}
export const SelectDeviceStep = ({
  issueState,
  actions,
  deviceController,
  user,
  warehouseController,
}: ReviewDocumentStepProps) => {
  const isNextDisabled = issueState.assignedDevices.length === 0;

  const left = (
    <>
      <Typography.Title className={styles.title}>
        {SECTION_TITLES.availableDevices}
      </Typography.Title>
      <DeviceAutocomplete
        searched={deviceController.status.wasSearched}
        loading={deviceController.status.isLoading}
        value={deviceController.data.value}
        options={deviceController.data.options}
        onChange={deviceController.actions.handleChange}
        onOptionSelect={deviceController.actions.handleSelect}
        onClear={deviceController.actions.handleReset}
      />
    </>
  );
  const center = (
    <IssueSummary
      user={user}
      warehouse={warehouseController.data.currentWarehouse}
      location={warehouseController.data.selectedLocation}
    />
  );
  const right = (
    <>
      <Typography.Title
        className={styles.title}
      >{`${SECTION_TITLES.selectedDevices} (${issueState.assignedDevices.length})`}</Typography.Title>
      <DeviceList
        devices={issueState.assignedDevices}
        onDelete={deviceController.actions.handleDelete}
        onResetList={deviceController.actions.handleResetList}
      />
    </>
  );

  return (
    <StepLayout
      left={left}
      center={center}
      right={right}
      currentStep={issueState.issueStep}
      hideBack={true}
      disabledStep={isNextDisabled}
      leftWidth={550}
      onNext={actions.handleProceedToSigning}
      onBack={actions.handleBackStep}
    />
  );
};
