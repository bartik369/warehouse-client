import { IssueState } from '@/features/issue-device/model/issueTypes';
import { FinalizeIssueStep } from '@/features/issue-device/ui/steps/completion/ui/FinalizeIssueStep';
import { SelectDeviceStep } from '@/features/issue-device/ui/steps/device-selection/ui/SelectDeviceStep';
import { SignDocumentStep } from '@/features/issue-device/ui/steps/document-signing/ui/SignDocumentStep';
import { SelectUserStep } from '@/features/issue-device/ui/steps/user-selection/ui/SelectUserStep';
import { SelectWarehouseStep } from '@/features/issue-device/ui/steps/warehouse-selection/ui/SelectWarehouseStep';

import {
  IssueActions,
  IssueData,
  IssueDevice,
  IssueStatus,
  IssueUser,
  IssueWarehouse,
} from '../model/useIssue';
import { IssueHeader } from '../ui/issue-header/IssueHeader';
import styles from './IssueProcess.module.scss';

interface IssueProcessProps {
  device: IssueDevice;
  user: IssueUser;
  warehouse: IssueWarehouse;
  actions: IssueActions;
  data: IssueData;
  state: IssueState;
  status: IssueStatus;
}

export const IssueProcess = ({
  user,
  device,
  warehouse,
  state,
  actions,
  status,
}: IssueProcessProps) => {
  const currentStep = state.issueStep;
  const isAvailableReset = state.issueStep !== 0 && state.issueStep !== 4;

  const stepContent = [
    <SelectWarehouseStep
      warehouse={warehouse}
      actions={actions}
      currentStep={currentStep} // todo check
    />,
    <SelectUserStep user={user} state={state} actions={actions} />,
    <SelectDeviceStep
      warehouse={warehouse}
      user={user.data.selectedUser}
      state={state}
      device={device}
      actions={actions}
    />,
    <SignDocumentStep
      onDelete={device.actions.handleDelete}
      state={state}
      isIssueLoading={status.isIssueLoading}
      handleComplete={actions.handleCompleteProcess}
    />,
    <FinalizeIssueStep state={state} />,
  ];

  // todo скрыть кнопку отмены выдачи на послденем этапе
  return (
    <div className={styles.container}>
      <IssueHeader
        isAvailableReset={isAvailableReset}
        step={currentStep}
        onChange={actions.handleSetStep}
        onReset={actions.handleResetIssue}
      />
      <div className={styles.stepsContent}>{stepContent[state.issueStep]}</div>
    </div>
  );
};
