import { useEffect } from 'react';

import { IssueProcess } from '@/features/issue-device/IssueProcess/IssueProcess';
import { useIssue } from '@/features/issue-device/model/useIssue';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { RootState } from '@/store/store';
import { BASE_STEPS } from '@/utils/constants/ui/titles';

import Loader from '../../shared/ui/loader/Loader';
import styles from './DeviceIssueForm.module.scss';

export const DeviceIssueForm = ({ issueId = null }) => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const state = useAppSelector((state: RootState) => state.issue);
  const actions = useIssue();

  useEffect(() => {
    return () => {
      // actions.handleFullReset();
    };
  }, []);

  if (!state.issueStep && !user) return <Loader size="sm" color="orange" />;

  return (
    <section className={styles.inner}>
      <h1 className={styles.title}>
        <span>{state.issueStep + 1}</span>
        {BASE_STEPS[state.issueStep].title}
      </h1>
      <IssueProcess actions={actions} state={state} />
    </section>
  );
};
