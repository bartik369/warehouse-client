import { useMemo } from 'react';

import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Steps } from 'antd';

import { IssueState } from '@/features/issue-device/model/issueTypes';
import { FinalizeIssueStep } from '@/features/issue-device/ui/steps/FinalizeIssueStep';
import { ReviewDocumentStep } from '@/features/issue-device/ui/steps/ReviewDocumentStep';
import { SelectUserStep } from '@/features/issue-device/ui/steps/SelectUserStep';
import { SelectWarehouseStep } from '@/features/issue-device/ui/steps/SelectWarehouseStep';
import { SignDocumentStep } from '@/features/issue-device/ui/steps/SignDocumentStep';
import { BaseIssueQuery } from '@/types/issue';

import { getStepItems } from '../model/getStepsItems';
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

  const stepsItems = useMemo(() => getStepItems(state.issueStep), [state.issueStep]);
  // todo скрыть кнопку отмены выдачи на послденем этапе
  return (
    <div className={styles.stepsContainer}>
      <div className={styles.header}>
        <Button
          icon={<CloseCircleOutlined />}
          onClick={actions.handleResetIssue}
          className={styles.cancelBtn}
          type="text"
        >
          Отменить выдачу
        </Button>
      </div>
      <div className={styles.stepsContent}>{stepContent[state.issueStep]}</div>
      <Steps
        className={styles.customSteps}
        type="navigation"
        size="default"
        current={state.issueStep}
        onChange={onChange}
        items={stepsItems}
      />
    </div>
  );
};
