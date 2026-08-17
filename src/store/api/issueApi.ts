import { createApi } from '@reduxjs/toolkit/query/react';

import {
  CreateIssueProcessRequest,
  FinalizeIssueRequest,
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
    finalizeIssueProcess: build.mutation<void, FinalizeIssueRequest>({
      query: ({ processId, deviceIds, file }) => {
        const formData = new FormData();
        formData.append('processId', processId);
        deviceIds.forEach((item) => {
          formData.append('deviceIds', item);
        });
        formData.append('file', file);
        return {
          url: `${import.meta.env.VITE_ISSUE_FINALIZE}`,
          method: 'POST',
          body: formData,
        };
      },
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
