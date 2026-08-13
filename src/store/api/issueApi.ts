import { createApi } from '@reduxjs/toolkit/query/react';

import {
  CreateIssueProcessRequest,
  IssueProcessDto,
  IssueProcessListItem,
} from '@/features/issue-device/model/types';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const issueApi = createApi({
  reducerPath: 'issueApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (build) => ({
    getIssueProcessById: build.query<any, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_ISSUE_PROCESS}${id}`,
      }),
    }),
    createIssueProcess: build.mutation<IssueProcessDto, CreateIssueProcessRequest>({
      query: (body) => ({
        url: `${import.meta.env.VITE_ISSUE_PROCESS}`,
        method: 'POST',
        body,
      }),
    }),
    createIssue: build.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_ISSUE}`,
        method: 'POST',
        body,
      }),
    }),
    getIssueProcess: build.query<any, string>({
      // todo указать норм тип
      query: (processid) => ({
        url: `${import.meta.env.VITE_ISSUE_PROCESS}${processid}`,
      }),
    }),
    getIssueProcesses: build.query<IssueProcessListItem[], void>({
      query: () => ({
        url: `${import.meta.env.VITE_ISSUE_PROCESSES}`,
      }),
    }),
    finalizeIssueProcess: build.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_ISSUE_FINALIZE}`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetIssueProcessByIdQuery,
  useCreateIssueMutation,
  useFinalizeIssueProcessMutation,
  useCreateIssueProcessMutation,
  useGetIssueProcessesQuery,
  useLazyGetIssueProcessQuery,
} = issueApi;
