import { useEffect } from 'react';

import { useAppSelector } from '@/hooks/redux/useRedux';
import { Spinner } from '@/shared/ui/spinner/Spinner';
import { RootState } from '@/store/store';

import { IssueProcess } from '../IssueProcess/IssueProcess';
import { useIssue } from '../model/useIssue';

export const ManageIssue = () => {
  // const issueState = useAppSelector((state: RootState) => state.issue);
  const {
    userController,
    deviceController,
    warehouseController,
    actions,
    data,
    status,
    issueState,
  } = useIssue();
  useEffect(() => {
    return () => {
      actions.handleFullReset();
    };
  }, []);

  if (!issueState.issueStep && !userController.data.currentUser) return <Spinner fontSize={34} />;
  // todo чекнуть что это\

  console.log(userController.data.currentUser);

  return (
    <IssueProcess
      deviceController={deviceController}
      userController={userController}
      warehouseController={warehouseController}
      actions={actions}
      data={data}
      status={status}
      issueState={issueState}
    />
  );
};
