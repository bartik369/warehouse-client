import { useEffect } from 'react';

import { useAppSelector } from '@/hooks/redux/useRedux';
import { Spinner } from '@/shared/ui/spinner/Spinner';
import { RootState } from '@/store/store';

import { IssueProcess } from '../IssueProcess/IssueProcess';
import { useIssue } from '../model/useIssue';

export const ManageIssue = () => {
  // const user = useAppSelector((state: RootState) => state.user.user);
  const state = useAppSelector((state: RootState) => state.issue);
  const { user, device, warehouse, actions, data, status } = useIssue();
  useEffect(() => {
    return () => {
      actions.handleFullReset();
    };
  }, []);

  if (!state.issueStep && !user) return <Spinner fontSize={34} />; // todo чекнуть что это

  return (
    <IssueProcess
      device={device}
      user={user}
      warehouse={warehouse}
      actions={actions}
      data={data}
      status={status}
      state={state}
    />
  );
};
