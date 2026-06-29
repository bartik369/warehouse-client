import { Steps } from 'antd';

import { IssueState } from '@/features/issue-device/model/issueTypes';
import FinalizeIssueStep from '@/features/issue-device/ui/steps/FinalizeIssueStep';
import ReviewDocumentStep from '@/features/issue-device/ui/steps/ReviewDocumentStep';
import SelectUserStep from '@/features/issue-device/ui/steps/SelectUserStep';
import SelectWarehouseStep from '@/features/issue-device/ui/steps/SelectWarehouseStep';
import SignDocumentStep from '@/features/issue-device/ui/steps/SignDocumentStep';
import { BaseIssueQuery, ItemType } from '@/types/issue';
import { BASE_STEPS } from '@/utils/constants/ui/titles';

import styles from './IssueProcess.module.scss';

interface IssueProcessProps {
  actions: BaseIssueQuery;
  state: IssueState;
}

export const IssueProcess = ({ actions, state }: IssueProcessProps) => {
  const onChange = (value: number) => {
    if (value > state.issueStep) return;
    actions.handleSetStep(value);
  };

  const stepContent = [
    <SelectWarehouseStep
      warehouse={state.warehouse}
      warehouses={state.warehouses}
      userWarehouse={actions.handleGetWarehousesByUser}
      nextStep={actions.handleNextStep}
      setWarehouse={actions.handleSetWarehouse}
      fullReset={actions.handleFullReset}
    />,
    <SelectUserStep
      state={state}
      isSuccess={actions.isSuccess}
      isFetching={actions.isFetching}
      setUser={actions.handleSetUser}
      resetUser={actions.handleResetUser}
      nextStep={actions.handleNextStep}
      userChange={actions.handleUserChange}
      resetUserQuery={actions.handleResetUserQuery}
    />,
    <ReviewDocumentStep
      state={state}
      nextStep={actions.handleNextStep}
      setDevice={actions.handleSetDevice}
      deleteDevice={actions.handleDeleteDevice}
      resetDevices={actions.handleResetIssueDevices}
      getDevice={actions.handleGetDevice}
      changeDevice={actions.handleDeviceChange}
      resetDeviceQuery={actions.handleResetDeviceQuery}
    />,
    <SignDocumentStep
      state={state}
      isIssueLoading={actions.isIssueLoading}
      deleteDevice={actions.handleDeleteDevice}
      handleComplete={actions.handleCompleteProcess}
    />,
    <FinalizeIssueStep state={state} />,
  ];
  const getStepItems = (): ItemType[] => {
    return BASE_STEPS.map((item, index) => {
      let status: 'finish' | 'process' | 'wait' = 'wait';
      if (index < state.issueStep) {
        status = 'finish';
      } else if (index === state.issueStep) {
        status = 'process';
      }

      const isDisabled = state.issueStep < index;
      return {
        ...item,
        status: status,
        disabled: isDisabled,
      };
    });
  };

  return (
    <div className={styles.stepsContainer}>
      <div className={styles.stepsContent}>{stepContent[state.issueStep]}</div>
      <Steps
        className={styles.customSteps}
        type="navigation"
        size="default"
        current={state.issueStep}
        onChange={onChange}
        items={getStepItems()}
      />
    </div>
  );
};
