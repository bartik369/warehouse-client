import { useEffect } from 'react';

import { skipToken } from '@reduxjs/toolkit/query';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch } from '@/hooks/redux/useRedux';
import { ROUTES } from '@/shared/config/routes/routes';
import { Spinner } from '@/shared/ui/spinner/Spinner';
import { useGetIssueProcessQuery } from '@/store/api/issueApi';
import {
  setIssueNumber,
  setIssueStep,
  setProcessId,
  setWarehouse,
} from '@/store/slices/issueSlice';
import { setUser } from '@/store/slices/userSlice';

import { IssueProcess } from '../IssueProcess/IssueProcess';
import { IssueProcessStatus } from '../model/types';
import { useIssue } from '../model/useIssue';

export const ManageIssue = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: process, isLoading } = useGetIssueProcessQuery(id ?? skipToken);

  useEffect(() => {
    if (!process) return;

    if (process.status === IssueProcessStatus.Completed) {
      navigate(ROUTES.ISSUE(process.id));
      return;
    }
    dispatch(setProcessId(process.id));
    dispatch(setIssueNumber(process.documentNo));
    dispatch(setUser(process.user));
    dispatch(setWarehouse(process.warehouse));
    dispatch(setIssueStep(2));
  }, [process, dispatch, navigate]);

  const {
    userController,
    deviceController,
    warehouseController,
    actions,
    data,
    status,
    issueState,
  } = useIssue();

  if (isLoading) {
    return <Spinner fontSize={34} />;
  }

  if (id && issueState.processId !== id) {
    return <Spinner fontSize={34} />;
  }

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
