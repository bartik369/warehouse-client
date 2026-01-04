import { useEffect } from 'react';

import { useIssueContext } from '@/features/issue/context/IssueContext';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { RootState } from '@/store/store';

import Loader from '../ui/loader/Loader';
import StepsProcess from '../ui/steps/StepsProcess';
import styles from './DeviceIssueForm.module.scss';

const DeviceIssueForm = ({ issueId = null }) => {
  const { state, actions } = useIssueContext();
  const user = useAppSelector((state: RootState) => state.user.user);

  useEffect(() => {
    return () => {
      actions.handleFullReset();
    };
  }, []);

  if (!state.step && !user) return <Loader size="sm" color="green" />;
  const currentStep = state.step;

  return (
    <section className={styles.inner}>
      <h1 className={styles.title}>
        <span>{currentStep + 1}</span>
        {state.title}
      </h1>
      <StepsProcess />
    </section>
  );
};

export default DeviceIssueForm;
