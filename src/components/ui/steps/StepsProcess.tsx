import { Steps } from 'antd';

import FinalizeIssueStep from '@/components/deviceIssue/steps/FinalizeIssueStep';
import ReviewDocumentStep from '@/components/deviceIssue/steps/ReviewDocumentStep';
import SelectUserStep from '@/components/deviceIssue/steps/SelectUserStep';
import SelectWarehouseStep from '@/components/deviceIssue/steps/SelectWarehouseStep';
import SignDocumentStep from '@/components/deviceIssue/steps/SignDocumentStep';
import { IssueState } from '@/features/issue/model/issueTypes';
import { BaseDeviceQuery } from '@/types/devices';
import { ItemType } from '@/types/issue';
import { BASE_STEPS } from '@/utils/constants/ui/titles';

import styles from './Steps.module.scss';

interface StepsProcessProps {
  actions: BaseDeviceQuery;
  state: IssueState;
}

const StepsProcess = ({ actions, state }: StepsProcessProps) => {
  const onChange = (value: number) => {
    if (value > state.issueStep) return;
    actions.handleSetStep(value);
  };

  const stepContent = [
    <SelectWarehouseStep
      actions={actions}
      warehouse={state.warehouse}
      warehouses={state.warehouses}
    />,
    <SelectUserStep actions={actions} state={state} />,
    <ReviewDocumentStep actions={actions} state={state} />,
    <SignDocumentStep actions={actions} state={state} />,
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

export default StepsProcess;
