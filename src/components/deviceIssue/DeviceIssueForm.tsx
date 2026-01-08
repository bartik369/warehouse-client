import { useEffect } from 'react';

import { useIssue } from '@/features/issue/model/useIssue';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { RootState } from '@/store/store';
import { BASE_STEPS } from '@/utils/constants/ui/titles';

import Loader from '../ui/loader/Loader';
import StepsProcess from '../ui/steps/StepsProcess';
import styles from './DeviceIssueForm.module.scss';

const DeviceIssueForm = ({ issueId = null }) => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const state = useAppSelector((state: RootState) => state.issue);
  const actions = useIssue();

  useEffect(() => {
    return () => {
      console.log('reload');
      // actions.handleFullReset();
    };
  }, []);

  if (!state.issueStep && !user) return <Loader size="sm" color="green" />;

  return (
    <section className={styles.inner}>
      <h1 className={styles.title}>
        <span>{state.issueStep + 1}</span>
        {BASE_STEPS[state.issueStep].title}
      </h1>
      <StepsProcess actions={actions} state={state} />
    </section>
  );
};

export default DeviceIssueForm;
