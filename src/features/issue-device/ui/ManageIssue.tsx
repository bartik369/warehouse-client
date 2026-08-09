import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useAppDispatch } from '@/hooks/redux/useRedux';
import { Spinner } from '@/shared/ui/spinner/Spinner';
import { useGetIssueProcessByIdQuery } from '@/store/api/issueApi';
import {
  setIssueNumber,
  setIssueStep,
  setProcessId,
  setWarehouse,
} from '@/store/slices/issueSlice';
import { setUser } from '@/store/slices/userSlice';

import { IssueProcess } from '../IssueProcess/IssueProcess';
import { useIssue } from '../model/useIssue';

export const ManageIssue = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { data: process } = useGetIssueProcessByIdQuery(id!, {
    skip: !id,
  });

  useEffect(() => {
    if (!process) return;
    dispatch(setProcessId(process.id));
    dispatch(setIssueNumber(process.documentNo));
    dispatch(setUser(process.user));
    dispatch(setWarehouse(process.warehouse));
    dispatch(setIssueStep(2));
  }, [process, dispatch]);

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
