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
  deviceController: IssueDevice;
  userController: IssueUser;
  warehouseController: IssueWarehouse;
  actions: IssueActions;
  data: IssueData;
  issueState: IssueState;
  status: IssueStatus;
}

export const IssueProcess = ({
  userController,
  deviceController,
  warehouseController,
  issueState,
  actions,
  status,
}: IssueProcessProps) => {
  const currentStep = issueState.issueStep;
  const isAvailableReset = issueState.issueStep !== 0 && issueState.issueStep !== 4;

  const stepContent = [
    <SelectWarehouseStep
      warehouseController={warehouseController}
      actions={actions}
      currentStep={currentStep} // todo check
    />,
    <SelectUserStep userController={userController} issueState={issueState} actions={actions} />,
    <SelectDeviceStep
      warehouseController={warehouseController}
      user={userController.data.currentUser}
      issueState={issueState}
      deviceController={deviceController}
      actions={actions}
    />,
    <SignDocumentStep
      actions={actions}
      onDelete={deviceController.actions.handleDelete}
      issueState={issueState}
      user={userController.data.currentUser}
      isIssueLoading={status.isIssueLoading}
      handleComplete={actions.handleCompleteProcess}
    />,
    <FinalizeIssueStep issueState={issueState} />,
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
      <div className={styles.stepsContent}>{stepContent[issueState.issueStep]}</div>
    </div>
  );
};
