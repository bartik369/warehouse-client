import FinalizeIssueStep from '@/components/deviceIssue/steps/FinalizeIssueStep';
import ReviewDocumentStep from '@/components/deviceIssue/steps/ReviewDocumentStep';
import SelectUserStep from '@/components/deviceIssue/steps/SelectUserStep';
import SelectWarehouseStep from '@/components/deviceIssue/steps/SelectWarehouseStep';
import SignDocumentStep from '@/components/deviceIssue/steps/SignDocumentStep';
import { useIssueContext } from '@/features/issue/context/IssueContext';
import { ItemType } from '@/types/issue';
import { BASE_STEPS } from '@/utils/constants/ui/titles';
import { Steps } from 'antd';
import styles from './Steps.module.scss';

const StepsProcess = () => {
  const { state, actions, isSuccess, isFetching } = useIssueContext();

  const onChange = (value: number) => {
    if (value > state.step) return;
    actions.handleSetStep(value);
  };

  const stepContent = [
    <SelectWarehouseStep actions={actions} />,
    <SelectUserStep isSuccess={isSuccess} isFetching={isFetching} actions={actions} />,
    <ReviewDocumentStep actions={actions} />,
    <SignDocumentStep />,
    <FinalizeIssueStep />,
  ];
  const getStepItems = (): ItemType[] => {
    return BASE_STEPS.map((item, index) => {
      let status: 'finish' | 'process' | 'wait' = 'wait';
      if (index < state.step) {
        status = 'finish';
      } else if (index === state.step) {
        status = 'process';
      }

      const isDisabled = state.step < index;
      return {
        ...item,
        status: status,
        disabled: isDisabled,
      };
    });
  };

  return (
    <div className={styles.stepsContainer}>
      <div className={styles.stepsContent}>{stepContent[state.step]}</div>
      <Steps
        className={styles.customSteps}
        type="navigation"
        size="default"
        current={state.step}
        onChange={onChange}
        items={getStepItems()}
      />
    </div>
  );
};

export default StepsProcess;
