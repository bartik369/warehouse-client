import { createApi } from '@reduxjs/toolkit/query/react';

import {
  CreateIssueProcessRequest,
  EquipmentIssuance,
  FinalizeIssueRequest,
  IssueProcessDetails,
  IssueProcessDto,
  IssueProcessListItem,
  SortedIssueProcessesRes,
} from '@/features/issue-device/model/types';
import { IssueProcessQueryParams } from '@/shared/types/api';

import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const issueApi = createApi({
  reducerPath: 'issueApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Issue'],
  endpoints: (build) => ({
    createIssueProcess: build.mutation<IssueProcessDto, CreateIssueProcessRequest>({
      query: (body) => ({
        url: `${import.meta.env.VITE_ISSUE_PROCESS}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Issue', id: 'LIST' }],
    }),
    getRecentIssues: build.query<IssueProcessListItem[], void>({
      query: () => ({
        url: import.meta.env.VITE_RECENT_ISSUES,
      }),
    }),
    getIssueByDevice: build.query<IssueProcessDetails, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_ISSUE_PROCESS_BY_DEVICE}${id}`,
      }),
    }),
    getIssueProcess: build.query<EquipmentIssuance, string>({
      query: (processid) => ({
        url: `${import.meta.env.VITE_ISSUE_PROCESS}${processid}`,
      }),
      providesTags: (_result, _error, processId) => [{ type: 'Issue', id: processId }],
    }),
    getIssueUnfinishedProcessesCount: build.query<number, void>({
      query: () => ({
        url: import.meta.env.VITE_ISSUE_UNFINISHED_COUNT,
      }),
    }),
    getIssueProcesses: build.query<SortedIssueProcessesRes, IssueProcessQueryParams>({
      query: (queryParams) => {
        const { ...params } = queryParams;
        const urlParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value == null || (Array.isArray(value) && value.length === 0)) {
            return;
          }
          if (Array.isArray(value)) {
            urlParams.append(key, value.join(','));
            return;
          }
          urlParams.append(key, String(value));
        });
        return {
          url: `${import.meta.env.VITE_ISSUE_PROCESSES}?${urlParams.toString()}`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: 'Issue' as const,
                id,
              })),
              { type: 'Issue', id: 'LIST' },
            ]
          : [{ type: 'Issue', id: 'LIST' }],
    }),
    deleteIssueProcess: build.mutation({
      query: (id) => ({
        url: `${import.meta.env.VITE_ISSUE_PROCESS}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Issue', id },
        { type: 'Issue', id: 'LIST' },
      ],
    }),
    downloadIssueFile: build.mutation<Blob, string>({
      query: (fileId: string) => ({
        url: `${import.meta.env.VITE_ISSUE_PROCESS}${fileId}/file`,
        method: 'GET',
        responseHandler: (response) => response.blob(),
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
      invalidatesTags: (_result, _error, { processId }) => [
        { type: 'Issue', id: processId },
        { type: 'Issue', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useFinalizeIssueProcessMutation,
  useCreateIssueProcessMutation,
  useGetIssueProcessesQuery,
  useLazyGetIssueProcessQuery,
  useGetIssueProcessQuery,
  useDownloadIssueFileMutation,
  useDeleteIssueProcessMutation,
  useGetIssueByDeviceQuery,
  useGetRecentIssuesQuery,
  useGetIssueUnfinishedProcessesCountQuery,
} = issueApi;
